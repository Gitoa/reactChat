var mysql = require('mysql');

const config = require('./config.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
})


let query = (sql, value) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        reject(err);
      } else {
        connection.query(sql, value, (err, rows) => {
          if(err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}

let users =
    `create table if not exists users(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
      pass VARCHAR(100) NOT NULL COMMENT '密码',
      avatar VARCHAR(100) NOT NULL COMMENT '头像',
      signup_time TIMESTAMP NOT NULL COMMENT '注册时间',
      slogan VARCHAR(100) COMMENT '个性签名',
      PRIMARY KEY ( id )
    );`

let chat_groups = 
    `create table if not exists chat_groups(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '群组名',
      creator INT NOT NULL COMMENT '群主',
      avatar VARCHAR(100) NOT NULL COMMENT '头像',
      create_time TIMESTAMP NOT NULL COMMENT '创建时间',
      notice TEXT COMMENT '群公告',
      FOREIGN KEY (creator) REFERENCES users(id),
      PRIMARY KEY ( id )
    );`

let offline_msg = 
    `create table if not exists offline_msg(
      id INT NOT NULL AUTO_INCREMENT,
      send_time TIMESTAMP NOT NULL COMMENT '发送时间',
      sender_name VARCHAR(100) NOT NULL,
      sender_id INT NOT NULL COMMENT '发送用户ID',
      sender_avatar VARCHAR(100) NOT NULL COMMENT '发送人头像',
      receiver_id INT NOT NULL COMMENT '接收用户ID',
      group_id INT COMMENT '群消息ID（若是群消息）',
      group_name VARCHAR(100) NOT NULL COMMENT '群名称（若是群消息)',
      group_avatar VARCHAR(100) NOT NULL COMMENT '群头像（若是群消息)',
      msg_type VARCHAR(100) NOT NULL COMMENT '消息类型',
      msg_content TEXT COMMENT '文本消息内容',
      content_type VARCHAR(100) NOT NULL COMMENT '消息内容数据类型',
      msg_id VARCHAR(100) NOT NULL COMMENT '消息id',
      FOREIGN KEY(sender_id) REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(receiver_id) REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id )
    );`

let user2group = 
    `create table if not exists user2group(
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      group_id INT,
      join_time TIMESTAMP NOT NULL COMMENT '加入时间',
      FOREIGN KEY(user_id) REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(group_id) REFERENCES chat_groups(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY ( id ),
      UNIQUE (user_id, group_id)
    );`

let user2user = 
      `create table if not exists user2user(
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT,
        friend_id INT,
        add_time TIMESTAMP NOT NULL COMMENT '添加时间',
        FOREIGN KEY(user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
        FOREIGN KEY(friend_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
        PRIMARY KEY ( id ),
        UNIQUE (user_id, friend_id)
      );`

let createTable = (sql) => {
  return query(sql, [])
}

createTable(users).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(chat_groups).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(user2group).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(offline_msg).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(user2user).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

//注册一个全体用户的群聊组

exports.insertUser = (value) => {
  let _sql = "insert into users set name=?,pass=?,avatar=?,signup_time=?,slogan=?;";
  return query(_sql, value);
}

exports.deleteUser = (id) => {
  let _sql = `delete from users where id="${id}";`;
  return query(_sql);
}

exports.getUserByName = (name) => {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
}

exports.getUserById = (id) => {
  let _sql = `select * from users where id="${id}";`;
  return query(_sql);
}

exports.getUser = (id) => {
  let _sql = `select * from users where id="${id}";`;
  return query(_sql);
}

exports.getUserByKeyword = (keyword) => {
  let _sql = `SELECT id, name, avatar FROM USERS WHERE name LIKE "%${keyword}%";`;
  return query(_sql);
}

exports.addFriend = (userId, friendId, addTime) => {
  let _sql = `INSERT INTO user2user (user_id, friend_id, add_time) VALUES (${userId}, ${friendId}, ${addTime}), (${friendId}, ${userId}, ${addTime});`;
  return query(_sql);
}

exports.deleteFriend = (userId, targetId) => {
  let _sql = `DELETE FROM user2user WHERE (user_id="${userId}" AND friend_id="${targetId}") OR (user_id="${targetId}" AND friend_id="${userId}");`;
  return query(_sql);
}

exports.getUserFriends = (id) => {
  let _sql = `SELECT name, users.id, avatar, slogan FROM user2user, users WHERE user_id="${id}" AND users.id=user2user.friend_id;`;
  return query(_sql);
}

exports.createGroup = (value) => {
  let _sql = "insert into chat_groups set name=?,avatar=?,creator=?,create_time=?,notice=?;";
  return query(_sql, value);
}

exports.joinGroup = (value) => {
  let _sql = "insert into user2group set user_id=?,group_id=?,join_time=?;";
  return query(_sql, value);
}

exports.getGroupMember = (groupId) => {
  let _sql = `SELECT users.id, avatar, name FROM user2group, users WHERE group_id="${groupId}" AND users.id=user2group.user_id;`;
  return query(_sql);
}

exports.getGroupByKeyword = (keyword) => {
  let _sql = `SELECT id, name, avatar, notice FROM chat_groups WHERE name LIKE "%${keyword}%";`;
  return query(_sql);
}

exports.getUserGroups = (userId) => {
  let _sql = `SELECT chat_groups.id, name, avatar, notice FROM user2group, chat_groups WHERE user2group.user_id="${userId}" AND chat_groups.id=user2group.group_id;`;
  return query(_sql);
}

exports.quitGroup = (userId, groupId) => {
  let _sql = `delete from user2group where group_id="${groupId}" and user_id="${userId}"`;
  return query(_sql);
}

exports.insertOfflineMsg = (value) => {
  let _sql = `INSERT INTO offline_msg SET send_time=?,sender_id=?,sender_name=?,sender_avatar=?,receiver_id=?,msg_type=?,msg_content=?,content_type=?,group_id=?,group_name=?,group_avatar=?,msg_id=?;`
  return query(_sql, value);
}

exports.getOfflineMsg = (userId) => {
  let _sql = `select * from offline_msg where receiver_id="${userId}" ORDER BY send_time`;
  return query(_sql);
}

exports.clearOfflineMsg = (userId) => {
  let _sql = `DELETE FROM offline_msg WHERE receiver_id="${userId}";`;
  return query(_sql);
}
/*
let quitGroup = (user_id, group_id) => {
  let _sql = `delete from user2group where user_id="${user_id}"`
}
*/


