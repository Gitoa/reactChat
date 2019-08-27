import * as ActionTypes from './ActionTypes.js';
import {loadMessage} from 'common/js/cache.js';
import cloneDeep from 'lodash/cloneDeep';

export default (state, action) => {
  let new_state = cloneDeep(state);
  let message_list = [], index = -1;
  switch (action.type) {
    case ActionTypes.LOAD_MESSAGE:
      new_state = loadMessage(action.admin_id);
      return new_state;
    case ActionTypes.ADD_MESSAGE:
      new_state[action.target_id] || (new_state[action.target_id] = []);
      new_state[action.target_id].push(action.msg);
      return new_state;
    case ActionTypes.DELETE_MESSAGE:
      message_list = new_state[action.target_id];
      index = message_list.findIndex(item => item.id === action.msg.id);
      message_list.splice(index, 1);
      return new_state;
    case ActionTypes.UPDATE_MESSAGE:
      message_list = new_state[action.target_id];
      index = message_list.findIndex(item => item.id === action.msg.id);
      message_list.splice(index, 1, action.msg);
      return new_state;
    case ActionTypes.CLEAR_MESSAGE:
      new_state[action.target_id] = [];
      return new_state;
    default:
      return state === undefined ? null : state;
  }
}