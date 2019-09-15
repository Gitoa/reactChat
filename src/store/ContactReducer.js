import * as ActionTypes from './ActionTypes';
import cloneDeep from 'lodash/cloneDeep';

export default (state, action) => {
  let newState = cloneDeep(state), contact = [], index = -1;

  switch(action.type) {
    case ActionTypes.ADD_CONTACT:
      contact = action.contact;
      index = newState.findIndex(item => {
        return item.type === contact.type && item.id === contact.id
      })
      index > -1 && newState.splice(index, 1);
      newState.unshift(contact);
      return newState;
    case ActionTypes.SET_CONTACT_LIST:
      let contactList = action.contactList;
      return contactList;
    case ActionTypes.DELETE_CONTACT:
      let chatId = action.chatId;
      index = newState.findIndex(item => {
        return `${item.type}_${item.id}` === chatId
      })
      index > -1 && newState.splice(index, 1);
      return newState;
    case ActionTypes.CLEAR_CONTACT:
      return [];
    default:
      return state === undefined ? null : state;
  }
}