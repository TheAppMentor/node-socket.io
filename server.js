'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

io.on('switchOn', (socket) => {
  console.log('Server : Switch On !!');
   io.emit('lightsOn') 
});

io.on('switchOff', (socket) => {
  console.log('Server : Switch Off !!');
   io.emit('lightsOff') 
});
 

//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
