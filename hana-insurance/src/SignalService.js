// // src/SignalService.js
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리

// class SignalService {
//   constructor() {
//     this.stompClient = null;
//     this.messageQueue = [];
//     this.clientId = uuidv4(); // 고유 클라이언트 ID 생성
//     this.connected = false;
//     this.subscriptions = {};
//   }

//   connect(onConnect) {
//     if (this.connected) {
//       onConnect();
//       return;
//     }

//     const socket = new SockJS("http://localhost:8080/signal");
//     this.stompClient = new Client({
//       webSocketFactory: () => socket,
//       reconnectDelay: 5000,
//       onConnect: () => {
//         console.log("STOMP Client Connected");
//         this.connected = true;
//         // 큐에 저장된 메시지 모두 전송
//         this.messageQueue.forEach(({ roomId, message }) => {
//           this.send(roomId, message, false); // 재큐잉 방지
//         });
//         this.messageQueue = [];
//         onConnect();
//       },
//       onStompError: (frame) => {
//         console.error("Broker reported error: " + frame.headers["message"]);
//         console.error("Additional details: " + frame.body);
//       },
//     });
//     this.stompClient.activate();
//   }

//   subscribe(roomId, callback) {
//     if (!this.stompClient || !this.connected) {
//       console.error("STOMP client is not connected. Cannot subscribe.");
//       return;
//     }

//     if (this.subscriptions[roomId]) {
//       this.subscriptions[roomId].callback = callback;
//       return;
//     }

//     const subscription = this.stompClient.subscribe(
//       `/topic/signal/${roomId}`,
//       (message) => {
//         const data = JSON.parse(message.body);
//         if (data.clientId === this.clientId) {
//           return;
//         }
//         if (this.subscriptions[roomId]) {
//           this.subscriptions[roomId].callback(message);
//         }
//       }
//     );

//     this.subscriptions[roomId] = {
//       subscription: subscription,
//       callback: callback,
//     };
//   }

//   send(roomId, message, bufferIfNotConnected = true) {
//     const messageWithClientId = { ...message, clientId: this.clientId };
//     if (this.stompClient && this.connected) {
//       this.stompClient.publish({
//         destination: `/app/signal`,
//         body: JSON.stringify(messageWithClientId),
//       });
//     } else if (bufferIfNotConnected) {
//       console.error("STOMP client is not connected. Buffering message.");
//       this.messageQueue.push({ roomId, message });
//     } else {
//       console.error("STOMP client is not connected. Cannot send message.");
//     }
//   }

//   disconnect() {
//     if (this.stompClient) {
//       this.stompClient.deactivate();
//       this.stompClient = null;
//       this.messageQueue = [];
//       this.connected = false;
//       this.subscriptions = {};
//     }
//   }
// }

// export default SignalService; // 클래스로 내보냄

// src/SignalService.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { v4 as uuidv4 } from "uuid"; // UUID 생성 라이브러리

class SignalService {
  constructor() {
    this.stompClient = null;
    this.messageQueue = [];
    this.clientId = uuidv4(); // 고유 클라이언트 ID 생성
  }

  connect(onConnect) {
    const socket = new SockJS("http://localhost:8080/signal");
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("STOMP Client Connected");
        // 큐에 저장된 메시지 모두 전송
        this.messageQueue.forEach(({ roomId, message }) => {
          this.send(roomId, message, false); // 재큐잉 방지
        });
        this.messageQueue = [];
        onConnect();
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });
    this.stompClient.activate();
  }

  subscribe(roomId, callback) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(`/topic/signal/${roomId}`, (message) => {
        const data = JSON.parse(message.body);
        // 자신의 메시지는 무시
        if (data.clientId === this.clientId) {
          return;
        }
        callback(message);
      });
    } else {
      console.error("STOMP client is not connected. Cannot subscribe.");
    }
  }

  send(roomId, message, bufferIfNotConnected = true) {
    const messageWithClientId = { ...message, clientId: this.clientId };
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/signal`,
        body: JSON.stringify(messageWithClientId),
      });
    } else if (bufferIfNotConnected) {
      console.error("STOMP client is not connected. Buffering message.");
      this.messageQueue.push({ roomId, message });
    } else {
      console.error("STOMP client is not connected. Cannot send message.");
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      this.messageQueue = [];
    }
  }
}

export default new SignalService();
