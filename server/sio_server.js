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
const {sendMsg, dealOpt} = require('./utils.js');
var count = 0;

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
io.on('connection', async(socket) => {
  console.log(socket.id);
  socket.emit('connect_confirm', {'msg': 'welcome'});
  socket.on('config_init', async(config) => {
    console.log(config);
    let userId = config.userId;
    if (userId !== -1) {
      let fakedSessionId = count ++;
      let newUserSocket = new UserSocket(userId, fakedSessionId, socket);
      onlineList.addUserSocket(userId, newUserSocket);
      socket.on('disconnect', () => {
        console.log('delete user: ', newUserSocket.userId, ' socket: ', newUserSocket.sessionId);
        onlineList.deleteUserSocket(userId, newUserSocket.sessionId);
      })
      socket.on('logout', () => {
        console.log('delete user: ', newUserSocket.userId, ' socket: ', newUserSocket.sessionId);
        onlineList.deleteUserSocket(userId, newUserSocket.sessionId);
      })
    }
  })

  socket.on('getOfflineMsg', async (userId, cb) => {
    let offlineMsg = await sql.getOfflineMsg(userId);
    cb(offlineMsg);
    //在读取完离线消息后应该从后台删除
  })

  socket.on('clearOfflineMsg', async(userId, cb) => {
    await sql.clearOfflineMsg(userId);
    cb('clear');
  })
  socket.on('msg', (msg, cb) => {
    console.log(msg);
    sendMsg(msg);
    cb(1);
  })

  socket.on('opt', (msg, cb) => {
    try {
      console.log(msg);
      dealOpt(msg).then((groupId) => {
        cb(null, groupId)
      }).catch((e) => {
        console.log('1', e);
        cb(e);
      })
    } catch(err) {
      console.log('2', err);
      cb(err)
    }
  })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnect')
  })
})

server.listen(3031, () => {
  console.log('listen on port 3031');
})