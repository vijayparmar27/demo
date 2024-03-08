const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});

let messages = []; // Array to store chat messages

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send existing messages to the new client
  socket.emit('messages', messages);

  // Handle chat message from client
  socket.on('chat message', (msg) => {
    messages.push(msg);
    io.emit('chat message', msg); // Broadcast to all clients
  });
});
