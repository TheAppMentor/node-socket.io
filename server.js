'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
//const PORT = 8080;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));


    socket.on('switchOn', () => {
        console.log('Server : Switch On !!');
        io.emit('lightsOn', "App Turned the light on") 
    });

    socket.on('switchOff', () => {
        console.log('Server : Switch Off !!');
        io.emit('lightsOff', "App Turned the light off") 
    });
    
    socket.on('takePic', () => {
        console.log('Take Pic: Ask Iphone to take a pic...!!');
        io.emit('takePic', "Ask iphone to take a pic") 
    });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 5);
