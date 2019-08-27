var mysql = require('mysql');

const config = require('./config.js');

let pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'qq805252965',
  database: 'nodesql',
})

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
    `create table contacts(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '聊天框名称',
      c_type VARCHAR(100) NOT NULL COMMENT '聊天对象类型',
      c_id INT NOT NULL COMMENT '聊天对象id',
      PRIMARY KEY ( id )
    );`

    let groups = 
    `create table if not exists c_groups(
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL COMMENT '群名称',
      avator VARCHAR(100) NOT NULL COMMENT '头像',
      moment VARCHAR(100) NOT NULL COMMENT '创建时间',
      PRIMARY KEY ( id )
    );`

pool.getConnection(function(err, connection){
  if (err) {
    console.log(err);
  } else {
    console.log('connect successed');
    connection.query(groups, [], (err, rows) => {
      if(err) {
        console.log(err);
      } else {
        console.log(rows);
      }
      connection.release();
    })
  }
})