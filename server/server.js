const io = require('socket.io')(3001, {
  path: '/ws/chat',
  serveClient: false
});

io.on('connection', socket => {
  console.log('user connected', socket.handshake.query.user);

  io.emit('user connected', {
    userLoggedMsg: `${socket.handshake.query.user} se juntou ao chat!`
  });

});
