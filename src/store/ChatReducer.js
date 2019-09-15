import * as ActionTypes from './ActionTypes';

export default (state, action) => {
  let chat, tmpList, index, currentChatId, id, newState, currentChatType;
  switch (action.type) {
    case ActionTypes.OPEN_CHAT:
      chat = action.chat;
      tmpList = state.chatList.concat();
      index = tmpList.findIndex((item) => {
        return item.id === chat.id && item.type === chat.type;
      })
      index === -1 && tmpList.push(chat);
      currentChatId = chat.id;
      currentChatType = chat.type;
      newState = {
        chatList: tmpList,
        currentChatId,
        currentChatType,
      }
      return newState;
    case ActionTypes.CLOSE_CHAT:
      id = action.id;
      tmpList = state.chatList.concat();
      currentChatId = state.currentChatId;
      index = tmpList.findIndex((item) => {
        return item.id === id
      })
      index > -1 && tmpList.splice(index, 1);
      console.log(index, currentChatId, id);
      if (currentChatId && currentChatId === id) {
        if (index < tmpList.length) {
          currentChatId = tmpList[index].id;
          currentChatType = tmpList[index].type;
        } else {
          [currentChatId, currentChatType] = tmpList[index-1] ? [tmpList[index-1].id, tmpList[index-1].type] : [-1, undefined];
        }
      }
      newState = {
        chatList: tmpList,
        currentChatId,
        currentChatType,
      }
      return newState;
    case ActionTypes.CHANGE_CHAT:
      newState = {
        chatList: state.chatList.concat(),
        currentChatId: action.id,
        currentChatType: action.chatType,
      }
      return newState;
    default:
      return state === undefined ? null : state;
  }
}