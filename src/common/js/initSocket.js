import * as Actions from '../../store/Actions';
import Store from '../../store/Store.js';

export default {socket: {}};

export function initSocket(s) {
  s.on('msg', function(data) {
    console.log(data);
    let state = Store.getState();
    if (data.senderId === state.admin.id) {
      return;
    }
    let chatId = '';
    let contact = null;
    if (data.msgType === 'private') {
      chatId = 'private_' + data.senderId;
      contact = {
        type: 'private', id: data.senderId, avatar: data.senderAvatar, name: data.senderName, 
      }
      if (state.chats.currentChatType === 'private' && state.chats.currentChatId === data.senderId) {
        Object.assign(data, {status: {unread: false, send: 'sended'}})
      }
    } else {
      chatId = 'group_' + data.groupId;
      contact = {
        type: 'group', id: data.groupId, avatar: data.groupAvatar, name: data.groupName, 
      }
      if (state.chats.currentChatType === 'group' && state.chats.currentChatId === data.groupId) {
        Object.assign(data, {status: {unread: false, send: 'sended'}})
      }
    }
    Store.dispatch(Actions.addContact(contact))
    Store.dispatch(Actions.addMessage(data, chatId))
  })
}