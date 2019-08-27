import * as ActionTypes from './ActionTypes';

export default (state, action) => {
  let chat, tmpList, index, currentChatId, id, new_state;
  switch (action.type) {
    case ActionTypes.OPEN_CHAT:
      chat = action.chat;
      tmpList = state.chatList.concat();
      index = tmpList.findIndex((item) => {
        return item.id === chat.id
      })
      index === -1 && tmpList.push(chat);
      currentChatId = chat.id;
      new_state = {
        chatList: tmpList,
        currentChatId,
      }
      return new_state;
    case ActionTypes.CLOSE_CHAT:
      id = action.id;
      tmpList = state.chatList.concat();
      currentChatId = state.currentChatId;
      index = tmpList.findIndex((item) => {
        return item.id === id
      })
      index > -1 && tmpList.splice(index, 1);
      console.log(index, currentChatId, id)
      if (currentChatId && currentChatId === id) {
        if (index < tmpList.length) {
          currentChatId = tmpList[index].id
        } else {
          currentChatId = tmpList[index-1] ? tmpList[index-1].id : -1
        }
      }
      new_state = {
        chatList: tmpList,
        currentChatId
      }
      return new_state;
    case ActionTypes.CHANGE_CHAT:
      new_state = {
        chatList: state.chatList.concat(),
        currentChatId: action.id
      }
      return new_state;
    default:
      return state === undefined ? null : state;
  }
}