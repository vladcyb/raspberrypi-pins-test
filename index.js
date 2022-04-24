const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Gpio = require('pigpio').Gpio;


const pins = {}

for (let i = 2; i < 28; i++) {
  pins[i] = new Gpio(i.toString(), 'out')
}

Object.values(pins).forEach((pin) => {
  pin.digitalWrite(0)
})


io.on('connection', (socket) => {
  console.log('connected')

  Object.entries(pins).forEach((pin) => {
    if (pin[1].digitalRead()) {
      socket.emit('on', pin[0])
    }
  })

  socket.on('toggle', (pinNumber) => {
    const pin = pins[pinNumber]
    if (!pin.digitalRead()) {
      pin.digitalWrite(1)
      socket.emit('on', pinNumber)
      socket.broadcast.emit('on', pinNumber)
    } else {
      pin.digitalWrite(0)
      socket.emit('off', pinNumber)
      socket.broadcast.emit('off', pinNumber)
    }
  })
});

process.on('SIGINT', () => {
  Object.values(pins).forEach((pin) => {
    pin.digitalWrite(0)
  })
    process.exit()
});


app.use('/', express.static(__dirname + '/public'));

server.listen(3000)
