import * as ActionTypes from '../../store/ActionTypes';
import * as Actions from '../../store/Actions';
import Store from '../../store/Store.js';
import socketContainer from './initSocket.js';

export function getUserFriends(userId) {
  socketContainer.socket.emit('get', {
    code: 1,
    actionType: 'getUserFriends',
    userId
  })
}

export function getUserGroups(userId) {
  socketContainer.socket.emit('get', {
    code: 1,
    actionType: 'getUserGroups',
    userId,
  })
}

export function deleteFriend(userId, targetId) {
  return new Promise((resolve, reject) => {
    socketContainer.socket.emit('opt', {
      code: 1,
      actionType: 'deleteFriend',
      userId,
      targetId,
    }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  });
}

export function addFriend(userId, targetId) {
  return new Promise((resolve, reject) => {
    socketContainer.socket.emit('opt', {
      code: 1,
      actionType: 'addFriend',
      userId,
      targetId,
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

export function quitGroup(userId, groupId) {
  return new Promise((resolve, reject) => {
    socketContainer.socket.emit('opt', {
      code: 1,
      actionType: 'quitGroup',
      userId,
      groupId,
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}

export function joinGroup(userId, groupId) {
  return new Promise((resolve, reject) => {
    socketContainer.socket.emit('opt', {
      code: 1,
      actionType: 'joinGroup',
      userId,
      groupId,
    }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve()
      }
    })
  });
}

export function createGroup(userId, groupInfo) {
  return new Promise((resolve, reject) => {
    socketContainer.socket.emit('opt', {
      code: 1,
      actionType: 'createGroup',
      userId,
      groupInfo,
    }, (err, groupId) => {
      if (err) {
        reject(err);
      } else {
        resolve(Object.assign(groupInfo, {id: groupId, type: 'group'}));
      }
    })
  });
}
