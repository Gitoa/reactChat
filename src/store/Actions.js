import * as ActionTypes from './ActionTypes';

export const initStore = (localStore) => {
  return {
    type: ActionTypes.INIT_STORE,
    localStore,
  }
}

export const openChat = (chat) => {
  return {
    type: ActionTypes.OPEN_CHAT,
    chat: chat
  }
}

export const closeChat = (chatId) => {
  return {
    type: ActionTypes.CLOSE_CHAT,
    id: chatId
  }
}

export const changeChat = (newChatId, newChatType) => {
  console.log()
  return {
    type: ActionTypes.CHANGE_CHAT,
    id: newChatId,
    chatType: newChatType,
  }
}

export const setMessageList = (msgList) => {
  return {
    type: ActionTypes.SET_MESSAGE_LIST,
    msgList
  }
}

export const addMessage = (msg, chatId) => {
  return {
    type: ActionTypes.ADD_MESSAGE,
    chatId,
    msg
  }
}

export const updateMessage = (msg, chatId) => {
  return {
    type: ActionTypes.UPDATE_MESSAGE,
    chatId,
    msg,
  }
}

export const deleteMessage = (msg, chatId) => {
  return {
    type: ActionTypes.DELETE_MESSAGE,
    chatId,
    msg
  }
}

export const saveMessage = (msg) => {
  return {
    type: ActionTypes.SAVE_MESSAGE,
    targetId: msg.msgType + '_' + msg.target.id,
  }
}

export const clearMessage = (chatId) => {
  return {
    type: ActionTypes.CLEAR_MESSAGE,
    chatId,
  }
}

export const clearAllMessage = () => {
  return {
    type: ActionTypes.CLEAR_ALL_MESSAGE,
  }
}

export const readAllMessage = (chatId) => {
  return {
    type: ActionTypes.READ_ALL_MESSAGE,
    chatId,
  }
}

export const setAdmin = (admin) => {
  return {
    type: ActionTypes.SET_ADMIN,
    admin
  }
}

export const setFriendList = (friendList) => {
  return {
    type: ActionTypes.SET_FRIEND_LIST,
    friendList,
  }
}

export const deleteFriend = (id) => {
  return {
    type: ActionTypes.DELETE_FRIEND,
    id,
  }
}

export const addFriend = (user) => {
  return {
    type: ActionTypes.ADD_FRIEND,
    user,
  }
}

export const setGroupList = (groupList) => {
  return {
    type: ActionTypes.SET_GROUP_LIST,
    groupList,
  }
}

export const setContactList = (contactList) => {
  return {
    type: ActionTypes.SET_CONTACT_LIST,
    contactList,
  }
}

export const addContact = (contact) => {
  return {
    type: ActionTypes.ADD_CONTACT,
    contact,
  }
}

export const deleteContact = (chatId) => {
  return {
    type: ActionTypes.DELETE_CONTACT,
    chatId,
  }
}

export const clearContact = () => {
  return {
    type: ActionTypes.CLEAR_CONTACT,
  }
}

export const joinGroup = (group) => {
  return {
    type: ActionTypes.JOIN_GROUP,
    group,
  }
}

export const quitGroup = (groupId) => {
  return {
    type: ActionTypes.QUIT_GROUP,
    groupId,
  }
}