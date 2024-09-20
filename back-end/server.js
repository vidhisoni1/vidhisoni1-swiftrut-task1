const express = require('express');
const http = require('http'); // Import Node's http module
const { Server } = require('socket.io'); // Import Socket.io
const cors = require('cors');

// Your existing imports and configurations...

const app = express();
app.use(cors()); // Ensure CORS is enabled for cross-origin requests

const server = http.createServer(app); // Create an HTTP server

// Initialize a new instance of Socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Change this to the frontend's URL in production
    methods: ["GET", "POST"],
  },
});

// Listen for connection events from clients
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for task updates
  socket.on('updateTask', (taskData) => {
    // Emit to all clients that a task has been updated
    io.emit('taskUpdated', taskData);
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Existing routes and middleware...

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
