import { io } from 'socket.io-client';
import { store } from '../store';
import { addNotification } from '../store/slices/notificationSlice';
import { addMessage } from '../store/slices/messageSlice';

let socket = null;

export const initSocket = (token) => {
  if (!token) return;

  socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('notification', (notification) => {
    store.dispatch(addNotification(notification));
  });

  socket.on('message', (message) => {
    store.dispatch(addMessage(message));
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinRoom = (roomId) => {
  if (socket) {
    socket.emit('join', roomId);
  }
};

export const leaveRoom = (roomId) => {
  if (socket) {
    socket.emit('leave', roomId);
  }
};

export const sendSocketMessage = (conversationId, message) => {
  if (socket) {
    socket.emit('sendMessage', { conversationId, message });
  }
};

export default socket;
