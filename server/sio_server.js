const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const sql = require('./mysql.js');
const io = require('socket.io')(server);
var { UserList, User, UserSocket} = require('./user.js');
const { onlineList } = require('./store.js');
const {sendMsg} = require('./utils.js');


app.use('/static', express.static('../build/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    httpOnly: false,
  }
}))

//路由部分
io.on('connection', (socket) => {
  socket.emit('connect_confirm', {'msg': 'welcome'});
  socket.on('config_init', (config) => {
    console.log(config);
    let userId = config.userId;
    let newUserSocket = new UserSocket(userId, userId, socket);
    onlineList.addUserSocket(userId, newUserSocket);
    socket.on('disconnect', () => {
      console.log('delete user: ', newUserSocket.userId, ' socket: ', newUserSocket.socketId);
      onlineList.deleteUserSocket(userId, newUserSocket.socketId);
    })
    socket.removeAllListeners('config_init');
  })
  socket.on('msg', (msg) => {
    console.log(msg);
    sendMsg(msg);
  })
  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect')
  })
})

server.listen(3000, () => {
  console.log('listen on port 3000');
})