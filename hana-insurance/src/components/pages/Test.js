import React, { useEffect, useRef, useState } from "react";
import SignalService from "../../SignalService";
import { useLocation } from "react-router-dom";

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

function Test({ roomId }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const dataChannelRef = useRef(null);
  const location = useLocation();
  const [dataChannelState, setDataChannelState] = useState("connecting");

  const pendingCandidates = useRef([]);
  const hasSetRemoteDescription = useRef(false); // Answer를 한번만 처리하기 위한 플래그
  const isInitialized = useRef(false); // 초기화 방지

  // URL 쿼리 파라미터에서 caller 여부 확인
  const query = new URLSearchParams(location.search);
  const isCallerFlag = query.get("caller") === "true";

  // isCaller 함수 정의
  const isCaller = () => {
    return isCallerFlag; // 호출자 여부를 반환
  };

  console.log("Is caller:", isCaller());

  useEffect(() => {
    if (isInitialized.current) {
      return; // 이미 초기화된 경우 실행하지 않음
    }
    isInitialized.current = true;

    // 시그널링 서버 연결 먼저
    SignalService.connect(() => {
      console.log("Connected to signaling server");
      SignalService.subscribe(roomId, (message) => {
        const data = JSON.parse(message.body);
        console.log("Received signaling message:", data);
        handleSignalingData(data);
      });

      // RTCPeerConnection 생성
      pcRef.current = new RTCPeerConnection(configuration);

      // ICE 후보 처리
      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("Sending ICE candidate");
          SignalService.send(roomId, {
            type: "candidate",
            roomId: roomId,
            sender: isCaller() ? "caller" : "callee", // sender 정보를 추가
            data: JSON.stringify(event.candidate),
          });
        }
      };

      // 원격 스트림 처리
      pcRef.current.ontrack = (event) => {
        console.log("Received remote stream");
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // ICE 연결 상태 변경 이벤트
      pcRef.current.oniceconnectionstatechange = () => {
        console.log("ICE Connection State:", pcRef.current.iceConnectionState);
      };

      // 피어 연결 상태 변경 이벤트
      pcRef.current.onconnectionstatechange = () => {
        console.log("Peer Connection State:", pcRef.current.connectionState);
      };

      // 데이터 채널 설정
      if (isCaller()) {
        console.log("Creating data channel as caller");
        dataChannelRef.current = pcRef.current.createDataChannel("chat");
        setupDataChannel();
      } else {
        pcRef.current.ondatachannel = (event) => {
          console.log("Received data channel as callee");
          dataChannelRef.current = event.channel;
          setupDataChannel();
        };
      }

      // 미디어 스트림 획득 전 지원 여부 확인
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            console.log("Obtained local media stream");
            localVideoRef.current.srcObject = stream;
            stream
              .getTracks()
              .forEach((track) => pcRef.current.addTrack(track, stream));

            if (isCaller()) {
              console.log("Caller creating offer");
              createOffer();
            }
          })
          .catch((err) => {
            console.error("Error accessing media devices.", err);
          });
      } else {
        console.error("이 브라우저에서는 getUserMedia를 지원하지 않습니다.");
        // 사용자에게 알림 또는 대체 기능 제공
      }
    });

    return () => {
      console.log("Closing RTCPeerConnection");
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
        if (hasSetRemoteDescription.current) {
          console.warn("Already handled an offer. Ignoring duplicate offer.");
          return;
        }
        console.log("Handling offer");
        const offerDesc = new RTCSessionDescription(JSON.parse(data.data));
        pcRef.current
          .setRemoteDescription(offerDesc)
          .then(() => {
            console.log("Set remote description with offer");
            return pcRef.current.createAnswer();
          })
          .then((answerDesc) => {
            console.log("Created answer:", answerDesc.sdp);
            return pcRef.current.setLocalDescription(answerDesc);
          })
          .then(() => {
            console.log("Sending answer");
            SignalService.send(roomId, {
              type: "answer",
              roomId: roomId,
              sender: "callee", // sender 정보를 추가
              data: JSON.stringify(pcRef.current.localDescription),
            });
            // 대기 중인 ICE 후보 추가
            pendingCandidates.current.forEach((candidate) => {
              pcRef.current
                .addIceCandidate(candidate)
                .catch((err) =>
                  console.error("Error adding received ice candidate", err)
                );
            });
            pendingCandidates.current = [];
            hasSetRemoteDescription.current = true; // 플래그 설정
          })
          .catch((err) => console.error("Error handling offer:", err));
        break;

      case "answer":
        if (hasSetRemoteDescription.current) {
          console.warn("Already handled an answer. Ignoring duplicate answer.");
          return;
        }
        console.log("Handling answer");
        const answerDesc = new RTCSessionDescription(JSON.parse(data.data));
        if (pcRef.current.signalingState === "have-local-offer") {
          pcRef.current
            .setRemoteDescription(answerDesc)
            .then(() => {
              console.log("Set remote description with answer");
              // 대기 중인 ICE 후보 추가
              pendingCandidates.current.forEach((candidate) => {
                pcRef.current
                  .addIceCandidate(candidate)
                  .catch((err) =>
                    console.error("Error adding received ice candidate", err)
                  );
              });
              pendingCandidates.current = [];
              hasSetRemoteDescription.current = true; // 플래그 설정
            })
            .catch((err) =>
              console.error("Error setting remote description:", err)
            );
        } else {
          console.error(
            "Answer received in invalid state:",
            pcRef.current.signalingState
          );
        }
        break;

      case "candidate":
        console.log("Handling ICE candidate");
        const iceCandidate = new RTCIceCandidate(JSON.parse(data.data));
        if (
          pcRef.current.remoteDescription &&
          (pcRef.current.remoteDescription.type === "offer" ||
            pcRef.current.remoteDescription.type === "answer")
        ) {
          pcRef.current
            .addIceCandidate(iceCandidate)
            .then(() => console.log("Added ICE candidate"))
            .catch((err) =>
              console.error("Error adding received ice candidate", err)
            );
        } else {
          console.log(
            "Remote description not set yet, buffering ICE candidate"
          );
          pendingCandidates.current.push(iceCandidate);
        }
        break;

      default:
        console.warn("Unknown signaling message type:", data.type);
    }
  };

  const createOffer = () => {
    pcRef.current
      .createOffer()
      .then((offer) => {
        console.log("Created offer:", offer.sdp);
        return pcRef.current.setLocalDescription(offer);
      })
      .then(() => {
        console.log("Sending offer");
        SignalService.send(roomId, {
          type: "offer",
          roomId: roomId,
          sender: "caller", // sender 정보를 추가
          data: JSON.stringify(pcRef.current.localDescription),
        });
      })
      .catch((err) => console.error("Error creating offer:", err));
  };

  const setupDataChannel = () => {
    const dataChannel = dataChannelRef.current;

    dataChannel.onopen = () => {
      console.log("Data channel is open");
      setDataChannelState("open");
    };

    dataChannel.onclose = () => {
      console.log("Data channel is closed");
      setDataChannelState("closed");
    };

    dataChannel.onerror = (error) => {
      console.error("Data Channel Error:", error);
    };

    dataChannel.onmessage = (event) => {
      console.log("Received message via data channel:", event.data);
      setChatLog((prev) => [...prev, `상대방: ${event.data}`]);
    };
  };

  const handleSendMessage = () => {
    if (
      dataChannelRef.current &&
      dataChannelRef.current.readyState === "open"
    ) {
      console.log("Sending message:", message);
      dataChannelRef.current.send(message);
      setChatLog((prev) => [...prev, `나: ${message}`]);
      setMessage("");
    } else {
      console.warn("Data channel is not open");
    }
  };

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      {/* 비디오 요소 */}
      <div style={{ display: "flex", gap: "10px" }}>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{ width: "300px", border: "1px solid black" }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{ width: "300px", border: "1px solid black" }}
        />
      </div>
      {/* 채팅 인터페이스 */}
      <div style={{ marginTop: "20px" }}>
        <h3>채팅</h3>
        <div
          style={{
            border: "1px solid gray",
            height: "100px",
            overflowY: "scroll",
            padding: "5px",
            marginBottom: "10px",
          }}
        >
          {chatLog.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={dataChannelState !== "open"}
          style={{
            width: "200px",
            marginRight: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={dataChannelState !== "open"}
          style={{
            padding: "5px 10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#54d2c4",
            color: "#fff",
            cursor: dataChannelState === "open" ? "pointer" : "not-allowed",
          }}
        >
          전송
        </button>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <strong>Data Channel 상태:</strong> {dataChannelState}
        </div>
      </div>
    </div>
  );
}

export default Test;
