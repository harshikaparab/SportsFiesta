import { io } from 'socket.io-client';

const socket = io('https://sports-fiesta-api.vercel.app/');

export const subscribeToScores = (callback) => {
  socket.on('scoreUpdate', callback);
};

export const unsubscribeFromScores = (callback) => {
  socket.off('scoreUpdate', callback);
};
