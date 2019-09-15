const {onlineList} = require('./store.js');
const sql = require('./mysql.js');

exports.sendMsg = function(msg) {
  switch(msg.msgType) {
    case 'private': 
      sendToPrivate(msg, msg.receiverId)
      break;
    case 'group':
      sendToGroup(msg, msg.receiverId)
      break;
  }
}

function sendToPrivate(msg, privateId) {
  let user = onlineList.findUser(privateId);
  console.log('id: ', privateId);
  if (user) {
    console.log('length: ', user.socketList.length);
    user.socketList.forEach(userSocket => {
      userSocket.socket.emit('msg', msg);
    })
  } else {
    console.log('offline msg')
    //加入缓存信息
    sql.insertOfflineMsg([formatDate(new Date()), msg.senderId, msg.senderName, msg.senderAvatar, privateId, msg.msgType, msg.msgContent, msg.contentType, msg.groupId, msg.groupName, msg.groupAvatar, msg.msgId]);
  }
}

function sendToGroup(msg, groupId) {
  let senderId = msg.senderId;
  console.log('group id: ', groupId);
  sql.getGroupMember(groupId).then((list) => {
    list.forEach((member => {
      senderId !== member.id && sendToPrivate(msg, member.id);
    }))
  })
}

exports.dealOpt = function(msg) {
  switch(msg.actionType) {
    case 'addFriend':
      return sql.addFriend(msg.userId, msg.targetId, formatDate(new Date()));
    case 'deleteFriend':
      return sql.deleteFriend(msg.userId, msg.targetId);
    case 'joinGroup':
      return sql.joinGroup([msg.userId, msg.groupId, formatDate(new Date())]);
    case 'quitGroup':
      return sql.quitGroup(msg.userId, msg.groupId);
    case 'createGroup':
      return new Promise((resolve, reject) => {
        sql.createGroup([msg.groupInfo.name, msg.groupInfo.avatar, msg.userId, formatDate(new Date()), msg.groupInfo.notice]).then(data => {
          let insertId = -1
          console.log(data);
          data && (insertId = data.insertId);
          if (insertId > -1) {
            sql.joinGroup([msg.userId, insertId, formatDate(new Date())]).then((data) => {
              resolve(insertId)
            }).catch(e => reject(e))
          } else {
            reject('insertId <= -1')
          }
        }).catch(e => reject(e));
      })
    default:
      return Promise.reject('无效操作');
  }
}

function formatDate(date) {
  let [y, m, d, h, min, s] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
  function toB(num) {
    return num < 10 ? '0' + num : '' + num;
  }
  return toB(y) + toB(m) + toB(d) + toB(h) + toB(min) + toB(s);
}

exports.formatDate = formatDate;

