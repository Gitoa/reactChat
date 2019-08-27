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
      name VARCHAR(100) NOT NULL COMMENT '用户名',
      pass VARCHAR(100) NOT NULL COMMENT '密码',
      avator VARCHAR(100) NOT NULL COMMENT '头像',
      moment VARCHAR(100) NOT NULL COMMENT '注册时间',
      PRIMARY KEY ( id )
    );`

let contacts = 
    `create table if not exists contacts(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '聊天框名称',
      type VARCHAR(100) NOT NULL COMMENT '聊天对象类型',
      cid INT NOT NULL COMMENT '聊天对象id',
      PRIMARY KEY ( id )
    );`

let groups = 
    `create table if not exists chat_groups(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '群组名',
      avator VARCHAR(100) NOT NULL COMMENT '头像',
      moment VARCHAR(100) NOT NULL COMMENT '创建时间',
      PRIMARY KEY ( id )
    );`

let user2group = 
    `create table if not exists user2group(
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT,
      group_id INT,
      FOREIGN KEY(user_id) REFERENCES users(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      FOREIGN KEY(group_id) REFERENCES chat_groups(id)
      ON UPDATE CASCADE
      ON DELETE CASCADE,
      PRIMARY KEY (id)
    );`

let createTable = (sql) => {
  return query(sql, [])
}

createTable(users).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(contacts).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(groups).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

createTable(user2group).then((data) => {
  console.log(data);
}).catch((err) => {console.log(err)});

exports.insertUser = (value) => {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;";
  return query(_sql, value);
}

exports.deleteUser = (name) => {
  let _sql = `delete from users where name="${name}";`;
  return query(_sql);
}

exports.findUser = (name) => {
  let _sql = `select * from users where name="${name}";`;
  return query(_sql);
}

exports.findGroupMember = (group_id) => {
  let _sql = `select * from user2group where group_id="${group_id}";`;
  return query(_sql);
}

exports.getUserGroups = (user_id) => {
  let _sql = `select * from user2group where user_id="${use_id}";`;
  return query(_sql);
}

/*
let quitGroup = (user_id, group_id) => {
  let _sql = `delete from user2group where user_id="${user_id}"`
}
*/


