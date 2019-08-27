const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
var bodyParser = require('body-parser');
const sql = require('./mysql.js');
const io = require('socket.io')(server);
var { UserList, User } = require('./user.js');

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

var onlineList = new UserList();

//路由部分

app.get('/', (req, res) => {
  if (req.session.login) {
    io.on('connection', (socket) => {
      console.log(socket.id, req.session.userId);
      let newUser = new User(req.session.userId, req.session.id, socket);
      onlineList.insertUser(newUser);
      socket.on('disconnect', () => {
        onlineList.deleteUser(newUser.userId);
      })
    })
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.createReadStream('../build/index.html').pipe(res);
  } else {
    res.writeHead(302, {'Content-Type': 'text/html', 'location': '../sign'});
    res.end();
  }
})

app.get('/sign', (req, res) => {
  console.log(req.session, 'sign');
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
    let result = await sql.getUser(user);
    if (result.length === 0) {
      try {
        await sql.insertUser([user, password, 'NULL', 'NULL'])
        ack.code = 1;
        ack.msg = '注册成功';
      } catch (err) {
        ack.msg = err
      }
    } else {
      ack.msg = '用户名已存在';
    }
  } catch (err) {
    ack.msg = err;
  }
  console.log(ack);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(ack));
})

app.post('/signin', (req, res) => {
  let user = req.body.name;
  let password = req.body.password;
  let ack = {
    result: false,
    msg: ''
  };
  sql.getUser(user).then((data) => {
    if (data.length === 0) {
      ack.msg = '用户名不存在';
    } else {
      let tmp = data[0];
      console.log(tmp);
      if (tmp.pass === password) {
        ack.result = true;
        ack.msg = '登录成功';
        req.session.login = true;
        req.session.userId = tmp.id;
      } else {
        ack.msg = '密码错误';
      }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  }).catch((err) => {
    ack.msg = '服务器错误';
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ack));
  })
})



server.listen(3000, () => {
  console.log('listen on port 3000');
})