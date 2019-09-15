import * as ActionTypes from './ActionTypes';
import cloneDeep from 'lodash/cloneDeep';

export default (state, action) => {
  let newState = cloneDeep(state), index = -1;
  switch(action.type) {
    case ActionTypes.SET_GROUP_LIST:
      return action.groupList
    case ActionTypes.JOIN_GROUP:
      let group = action.group;
      index = newState.findIndex(item => {
        return item.id === group.id
      })
      index > -1 && newState.splice(index, 1);
      newState.push(group);
      return newState;
    case ActionTypes.QUIT_GROUP:
      let groupId = action.groupId;
      index = newState.findIndex(item => {
        return item.id === groupId;
      })
      index > -1 && newState.splice(index, 1);
      return newState;
    default:
      return state === undefined ? null : state;
  }
}