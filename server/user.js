class UserList {
  constructor(oldList) {
    this.list = oldList ? oldList : {}
  }
  findUser(id) {
    return this.list[id];
  }
  addUserSocket(userId, userSocket) {
    this.list[userId] || (this.list[userId] = new User());
    this.list[userId].insertSocket(userSocket);
  }
  deleteUserSocket(userId, s_id) {
    this.list[userId] && this.list[userId].deleteSocket(s_id);
    this.list[userId] && (this.list[userId].socketList.length > 0 || (this.list[userId] = null))
  }
  updateUser(id, user) {
    //同id，用user的信息和原user的信息进行合并
  }
}

class User {
  constructor() {
    this.socketList = [];
  }
  findSocket(s_id) {
    return this.socketList.find(item => item.sessionId === s_id);
  }
  insertSocket(userSocket) {
    let index = this.socketList.findIndex(item => item.sessionId === userSocket.sessionId);
    index === -1 ? this.socketList.push(userSocket) : this.socketList.splice(index, 1, userSocket);
  }
  deleteSocket(s_id) {
    let index = this.socketList.findIndex(item => item.sessionId === s_id);
    index > -1 && this.socketList.splice(index, 1);
  }
}

class UserSocket {
  constructor(userId, sessionId, socket) {
    this.userId = userId;
    this.socketId = sessionId;
    this.socket = socket;
  }
}

exports.UserList = UserList;
exports.User = User;
exports.UserSocket = UserSocket;