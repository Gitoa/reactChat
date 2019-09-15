import * as ActionTypes from './ActionTypes.js';
import cloneDeep from 'lodash/cloneDeep';

export default (state, action) => {
  let newState = cloneDeep(state);
  let messageList = [], index = -1, msg=null;
  switch (action.type) {
    case ActionTypes.SET_MESSAGE_LIST:
      messageList = action.msgList;
      return messageList;
    case ActionTypes.ADD_MESSAGE:
      newState[action.chatId] || (newState[action.chatId] = {
        msgList:[], lastMsg: null, unreadMsgCount: 0, msgIndex: 0,
      });
      msg = action.msg;
      if (msg.status.unread) {
        if (newState[action.chatId].unreadMsgCount === 0) {
          newState[action.chatId].firstUnreadIndex = newState[action.chatId].msgList.length;
        }
        newState[action.chatId].unreadMsgCount++;
      } 
      newState[action.chatId].msgList.push(msg);
      return newState;
    case ActionTypes.DELETE_MESSAGE:
      messageList = newState[action.chatId].msgList;
      index = messageList.findIndex(item => item.id === action.msg.id);
      index > -1 && messageList[index].status.unread ? newState[action.chatId].unreadMsgCount -- : newState[action.chatId].firstUnreadIndex--;
      messageList.splice(index, 1);
      return newState;
    case ActionTypes.UPDATE_MESSAGE:
      msg = action.msg;
      messageList = newState[action.chatId].msgList;
      index = messageList.findIndex(item => item.msgId === msg.msgId);
      index > -1 && !msg.status.unread && messageList[index].status.unread && newState[action.chatId].unreadMsgCount --;
      messageList.splice(index, 1, action.msg);
      return newState;
    case ActionTypes.CLEAR_MESSAGE:
      newState[action.chatId] = {
        msgList: [],
        lastMsg: null,
        unreadMsgCount: 0,
        msgIndex: -1,
      };
      return newState;
    case ActionTypes.READ_ALL_MESSAGE:
      if (!newState[action.chatId]) {
        newState[action.chatId] = {
          msgList: [],
          firstUnreadIndex: -1,
          unreadMsgCount: 0,
          lastMsg: null,
        }
        return newState;
      }
      let tmp = newState[action.chatId];
      let firstUnreadIndex = tmp.firstUnreadIndex, msgList = tmp.msgList;
      console.log(tmp)
      for (let i = msgList.length - 1; i >=0 && i >= firstUnreadIndex; i--) {
        msgList[i].status.unread = false;
      }
      tmp.firstUnreadIndex = msgList.length;
      tmp.unreadMsgCount = 0;
      return newState;
    case ActionTypes.CLEAR_ALL_MESSAGE:
      return {}
    default:
      return state === undefined ? null : state;
  }
}