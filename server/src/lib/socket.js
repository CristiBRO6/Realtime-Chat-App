const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.ALLOWEDORIGIN.split(','), 
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

const getReceiverSocketId = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;

    socket.join('globalChat');
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on('typing', ( receiverId ) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) io.to(receiverSocketId).emit('typing');
  });

  socket.on('stopTyping', ( receiverId ) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) io.to(receiverSocketId).emit('stopTyping');
  });

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
