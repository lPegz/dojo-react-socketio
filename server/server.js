const io = require('socket.io')(3001, {
  path: '/ws/chat',
  serveClient: false
});

const loggedUsers = {};

io.on('connection', socket => {
  console.log('user connected', socket.handshake.query.user);

  loggedUsers[socket.handshake.query.user] = socket.handshake.query.user;
  console.log(loggedUsers);

  io.emit('user connected', {
    userLoggedMsg: `${socket.handshake.query.user} se juntou ao chat!`

  });

  io.emit('logged users', loggedUsers)

  socket.on('sendMessage', data => {
    console.log(data);
    io.emit('myMessage', data);
  });

});
