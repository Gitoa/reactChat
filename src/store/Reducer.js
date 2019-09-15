import { combineReducers } from 'redux';
import * as ActionTypes from './ActionTypes.js';
import chatReducer from './ChatReducer.js';
import friendReducer from './FriendReducer.js';
import contactReducer from './ContactReducer.js';
import groupReducer from './GroupReducer.js';
import adminReducer from './AdminReducer.js';
import messageReducer from './MessageReducer.js';

const reducer = combineReducers({
  admin: adminReducer,
  chats: chatReducer,
  friends: friendReducer,
  contacts: contactReducer,
  groups: groupReducer,
  admin: adminReducer,
  messages: messageReducer,
});

export default reducer;