// src/components/VideoConsultationComponent.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  Heading,
  IconButton,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import SignalService from "../SignalService";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoConsultationComponent = ({ onClose }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const dataChannelRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [dataChannelState, setDataChannelState] = useState("connecting");
  const [connected, setConnected] = useState(false);

  const roomId = "test-room"; // Fixed room ID
  const isCaller = false; // Caller is false in the widget

  const pendingCandidates = useRef([]);
  const hasSetRemoteDescription = useRef(false);

  useEffect(() => {
    // 시그널링 서버 연결 및 WebRTC 설정
    SignalService.connect(() => {
      console.log("Connected to signaling server");
      SignalService.subscribe(roomId, (message) => {
        const data = JSON.parse(message.body);
        console.log("Received signaling message:", data);
        handleSignalingData(data);
      });

      pcRef.current = new RTCPeerConnection(configuration);

      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          SignalService.send(roomId, {
            type: "candidate",
            roomId: roomId,
            sender: isCaller ? "caller" : "callee",
            data: JSON.stringify(event.candidate),
          });
        }
      };

      pcRef.current.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // 데이터 채널 설정
      if (isCaller) {
        dataChannelRef.current = pcRef.current.createDataChannel("chat");
        setupDataChannel();
      } else {
        pcRef.current.ondatachannel = (event) => {
          dataChannelRef.current = event.channel;
          setupDataChannel();
        };
      }

      // 미디어 스트림 획득
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          stream
            .getTracks()
            .forEach((track) => pcRef.current.addTrack(track, stream));

          if (isCaller) {
            createOffer();
          }
        })
        .catch((err) => {
          console.error("Error accessing media devices.", err);
        });

      pcRef.current.oniceconnectionstatechange = () => {
        if (pcRef.current.iceConnectionState === "connected") {
          setConnected(true);
        }
      };
    });

    return () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
      SignalService.disconnect();
    };
  }, [roomId]);

  const handleSignalingData = (data) => {
    switch (data.type) {
      case "offer":
        handleOffer(data);
        break;
      case "answer":
        handleAnswer(data);
        break;
      case "candidate":
        handleCandidate(data);
        break;
      default:
        console.warn("Unknown signaling message type:", data.type);
    }
  };

  const handleOffer = (data) => {
    if (hasSetRemoteDescription.current) return;
    const offerDesc = new RTCSessionDescription(JSON.parse(data.data));
    pcRef.current
      .setRemoteDescription(offerDesc)
      .then(() => {
        return pcRef.current.createAnswer();
      })
      .then((answerDesc) => {
        return pcRef.current.setLocalDescription(answerDesc);
      })
      .then(() => {
        SignalService.send(roomId, {
          type: "answer",
          roomId: roomId,
          sender: "callee",
          data: JSON.stringify(pcRef.current.localDescription),
        });
        hasSetRemoteDescription.current = true;
      });
  };

  const handleAnswer = (data) => {
    if (hasSetRemoteDescription.current) return;
    const answerDesc = new RTCSessionDescription(JSON.parse(data.data));
    pcRef.current.setRemoteDescription(answerDesc);
    hasSetRemoteDescription.current = true;
  };

  const handleCandidate = (data) => {
    const iceCandidate = new RTCIceCandidate(JSON.parse(data.data));
    pcRef.current.addIceCandidate(iceCandidate);
  };

  const createOffer = () => {
    pcRef.current
      .createOffer()
      .then((offer) => {
        return pcRef.current.setLocalDescription(offer);
      })
      .then(() => {
        SignalService.send(roomId, {
          type: "offer",
          roomId: roomId,
          sender: "caller",
          data: JSON.stringify(pcRef.current.localDescription),
        });
      });
  };

  const setupDataChannel = () => {
    const dataChannel = dataChannelRef.current;

    dataChannel.onopen = () => {
      setDataChannelState("open");
    };

    dataChannel.onclose = () => {
      setDataChannelState("closed");
    };

    dataChannel.onerror = (error) => {
      console.error("Data Channel Error:", error);
    };

    dataChannel.onmessage = (event) => {
      setChatLog((prev) => [...prev, `상대방: ${event.data}`]);
    };
  };

  const handleSendMessage = () => {
    if (
      dataChannelRef.current &&
      dataChannelRef.current.readyState === "open"
    ) {
      dataChannelRef.current.send(message);
      setChatLog((prev) => [...prev, `나: ${message}`]);
      setMessage("");
    } else {
      console.warn("Data channel is not open");
    }
  };

  return (
    <Box
      position="fixed"
      bottom="16px"
      right="16px"
      width="600px"
      height="700px"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      zIndex={9999}
    >
      {/* 헤더 */}
      <HStack
        bg="#54d2c4"
        color="white"
        p={4}
        borderTopRadius="md"
        justifyContent="space-between"
      >
        <Heading size="md" marginLeft="20px">
          화상 상담
        </Heading>
        <IconButton
          aria-label="close video"
          icon={<MdClose />}
          onClick={onClose}
          variant="ghost"
          color="white"
        />
      </HStack>

      {/* 비디오 영역 */}
      <Box flex="1" p={4} display="flex">
        <Box flex="1" mr={2}>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", height: "100%" }}
          />
          <Text textAlign="center">나</Text>
        </Box>
        <Box flex="1" ml={2}>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          />
          <Text textAlign="center">상담사</Text>
        </Box>
      </Box>

      {/* 채팅 영역 */}
      <Box p={4} marginTop="20px" borderTopWidth="1px">
        <Text>채팅</Text>
        <Box
          border="1px solid gray"
          height="100px"
          overflowY="scroll"
          padding="5px"
          marginBottom="10px"
          className="flex"
        >
          {chatLog.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Box>
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={dataChannelState !== "open"}
          placeholder="메시지를 입력하세요..."
          style={{ marginBottom: "10px", width: "85%", marginRight: "10px" }}
        />
        <Button
          onClick={handleSendMessage}
          disabled={dataChannelState !== "open"}
          background="#54d2c4"
          color="white"
        >
          전송
        </Button>
      </Box>

      {/* 상태 표시 */}
      <Box p={4} borderTopWidth="1px" textAlign="center">
        {connected ? (
          <Text color="green.500">연결되었습니다.</Text>
        ) : (
          <Text color="red.500">연결 대기 중...</Text>
        )}
      </Box>
    </Box>
  );
};

export default VideoConsultationComponent;
