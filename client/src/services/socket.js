import { io } from 'socket.io-client';

const socket = io('https://sportsfiesta-kkwa.onrender.com');

export const subscribeToScores = (callback) => {
  socket.on('scoreUpdate', callback);
};

export const unsubscribeFromScores = (callback) => {
  socket.off('scoreUpdate', callback);
};
