import * as ActionTypes from './ActionTypes';

export default (state, action) => {
  switch(action.type) {
    case ActionTypes.SET_ADMIN:
      return action.admin;
    default:
      return state === undefined ? null : state;
  }
}