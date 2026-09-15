import { io } from "socket.io-client";

let socketInstance = null;

export const getSocket = () => {
  if (!socketInstance) {
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";
    socketInstance = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      transports: ["websocket", "polling"],
    });
  }
  return socketInstance;
};
