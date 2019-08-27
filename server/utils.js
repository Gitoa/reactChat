var {onlineList} = require('./store.js');

exports.sendMsg = function(msg) {
  switch(msg.msg_type) {
    case 'private': 
      send_to_private(msg, msg.target.id)
      break;
    case 'group':
      send_to_group(msg, msg.target.id)
  }
}

function send_to_private(msg, private_id) {
  let user = onlineList.findUser(private_id);
  console.log(private_id);
  if (user) {
    console.log(user.socketList.length);
    user.socketList.forEach(userSocket => {
      userSocket.socket.emit('msg', msg);
    })
  } else {
    console.log('offline msg')
    //加入缓存信息
  }
}

function send_to_group(msg, group_id) {
  let memberList = []
  memberList.forEach((member) => {
    send_to_private(msg, member.id)
  })
}