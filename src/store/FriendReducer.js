import * as ActionTypes from './ActionTypes';

export default (state, action) => {
  switch(action.type) {
    case ActionTypes.SET_FRIEND_LIST:
      return action.friendList;
    case ActionTypes.DELETE_FRIEND:
      return state.filter(item => {
        return item.id !== action.id
      })
    case ActionTypes.ADD_FRIEND:
      return [].concat(state, action.user);
    default:
      return state === undefined ? null : state;
  }
}