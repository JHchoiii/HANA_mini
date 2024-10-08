// src/components/dashboard/VideoConsultationPage.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Input,
  Text,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import SignalService from "../../SignalService";
import { FaVideo } from "react-icons/fa";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const VideoConsultationPage = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const dataChannelRef = useRef(null);
  const [dataChannelState, setDataChannelState] = useState("connecting");

  const pendingCandidates = useRef([]);
  const hasSetRemoteDescription = useRef(false);
  const isInitialized = useRef(false);

  const roomId = "test-room"; // Fixed room ID
  const isCaller = true; // Caller is false in the Dashboard

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    SignalService.connect(() => {
      SignalService.subscribe(roomId, (message) => {
        const data = JSON.parse(message.body);
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

      if (isCaller) {
        dataChannelRef.current = pcRef.current.createDataChannel("chat");
        setupDataChannel();
      } else {
        pcRef.current.ondatachannel = (event) => {
          dataChannelRef.current = event.channel;
          setupDataChannel();
        };
      }

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          stream
            .getTracks()
            .forEach((track) => pcRef.current.addTrack(track, stream));

          if (isCaller) createOffer();
        })
        .catch((err) => console.error("Error accessing media devices.", err));
    });

    return () => {
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
      SignalService.disconnect();
      isInitialized.current = false;
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
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        화상 상담
      </Text>

      <Flex mb={6}>
        <Box flex="1" bg="white" p={4} borderRadius="md" boxShadow="md">
          <Stat>
            <Flex align="center">
              <Box as={FaVideo} mr={4} />
              <Box>
                <StatLabel>Room ID</StatLabel>
                <StatNumber>{roomId}</StatNumber>
              </Box>
            </Flex>
          </Stat>
          <Flex mt={4} justify="space-between">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "48%", borderRadius: "8px", boxShadow: "md" }}
            />
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: "48%", borderRadius: "8px", boxShadow: "md" }}
            />
          </Flex>
        </Box>
      </Flex>

      <Box bg="white" p={4} borderRadius="md" boxShadow="md">
        <Text mb={2}>채팅</Text>
        <Box
          border="1px solid gray"
          borderRadius="md"
          height="150px"
          overflowY="scroll"
          p={2}
          mb={4}
        >
          {chatLog.map((msg, index) => (
            <Text key={index}>{msg}</Text>
          ))}
        </Box>
        <Flex>
          <Input
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={dataChannelState !== "open"}
            mr={2}
          />
          <Button
            onClick={handleSendMessage}
            isDisabled={dataChannelState !== "open"}
            colorScheme="teal"
          >
            전송
          </Button>
        </Flex>
        <Text mt={2}>
          <strong>Data Channel 상태:</strong> {dataChannelState}
        </Text>
      </Box>
    </Box>
  );
};

export default VideoConsultationPage;
