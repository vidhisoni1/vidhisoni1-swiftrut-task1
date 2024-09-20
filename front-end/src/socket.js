import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:5000"; // Use your backend URL here

const socket = io(SOCKET_URL, { transports: ['websocket'] });

export default socket;
