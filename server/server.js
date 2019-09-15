const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
var bodyParser = require('body-parser');
const sql = require('./mysql.js');
const io = require('socket.io')(server);
const { formatDate } = require('./utils');
var {UserSocket} = require('./user.js');
const { onlineList } = require('./store.js');
const {sendMsg, dealOpt} = require('./utils.js');
const history = require('connect-history-api-fallback');

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

//socket.io监听
io.on('connection', async (socket) => {
  console.log('new socket: ', socket.id);
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

//路由部分

app.get('/', (req, res) => {
  if (req.session.login) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('../build/index.html').pipe(res);
  } else {
    res.writeHead(302, {'Content-Type': 'text/html', 'location': '../sign'});
    res.end();
  }
})

app.get('/sign', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.createReadStream('../src/views/login.html').pipe(res);
})

app.post('/signup', async(req, res) => {
  let user = req.body.name;
  let password = req.body.password;
  let ack = {
    code: -1,
    msg: '',
  }
  try {
    let result = await sql.getUserByName(user);
    if (result.length === 0) {
      try {
        let {insertId} = await sql.insertUser([user, password, '', formatDate(new Date()), 'NULL']);
        ack.code = 1;
        ack.msg = '注册成功';
        //同时加入到全体注册用户的群聊中
        await sql.joinGroup([insertId, 1, formatDate(new Date())])
      } catch (err) {
        ack.msg = err
      }
    } else {
      ack.msg = '用户名已存在';
    }
  } catch (err) {
    ack.msg = err;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(ack));
})

app.post('/signin', async(req, res) => {
  let user = req.body.name;
  let password = req.body.password;
  let ack = {
    result: false,
    msg: ''
  };
  sql.getUserByName(user).then(async(data) => {
    if (data.length === 0) {
      ack.msg = '用户名不存在';
    } else {
      let tmp = data[0];
      if (tmp.pass === password) {
        ack.result = true;
        ack.msg = '登录成功';
        ack.admin = {
          name: user,
          id: tmp.id,
          avatar: tmp.avatar,
          time: tmp.signup_time,
          slogn: tmp.slogan,
          type: 'private',
        }
        let groups = await sql.getUserGroups(tmp.id);
        let friends = await sql.getUserFriends(tmp.id);
        ack.groups = groups;
        ack.friends = friends;
        console.log('ack: ', JSON.stringify(ack));
        req.session.login = true;
        req.session.userId = tmp.id;
        res.setHeader('set-cookie', `userId=${tmp.id}`)
      } else {
        ack.msg = '密码错误';
      }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  }).catch((err) => {
    ack.msg = '服务器错误';
    ack.result = false;
    console.log(err)
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  })
})

app.get('/group_info/:g_id', async(req, res) => {
  let members = await sql.getGroupMember(req.params.g_id);
  res.json(members);
})

app.get('/init_info', async(req, res) => {
  let userId = req.query['user_id'];
  let ack = {};
  await sql.getUserById(userId).then(data => {
    let tmp = data[0];
    console.log(JSON.stringify(tmp));
    ack.admin = {
      name: tmp.name,
      id: tmp.id,
      avatar: tmp.avatar,
      time: tmp.signup_time,
      slogn: tmp.slogan,
      type: 'private',
    }
  })
  let groups = await sql.getUserGroups(userId);
  let friends = await sql.getUserFriends(userId);
  ack.groups = groups;
  ack.friends = friends;
  res.json(ack);
})

app.get('/logout', async(req, res) => {
  let userId = req.query['user_id'];
  console.log('user id: ', userId);
  req.session.login = false;
  res.setHeader('set-cookie', '');
  res.json({msg: "logout successed"});
  //还需要从socket列表中删除吗？确保页面在登出后进行一次页面跳转，就能完成socket关闭？
})

app.get('/search', async(req, res) => {
  let keyword = req.query['keyword'];
  let userOfKeyword = await sql.getUserByKeyword(keyword);
  let groupOfKeyword = await sql.getGroupByKeyword(keyword);
  console.log({
    userOfKeyword,
    groupOfKeyword
  })
  res.json({
    userOfKeyword,
    groupOfKeyword,
  })
})

server.listen(3030, () => {
  console.log('listen on port 3030');
})