import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './Reducer.js';
import {loadMessage} from 'common/js/cache.js';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension():f=>f

const initValues = {
  admin: 
  {

  },
  friends: [

  ],
  groups: [

  ],
  contacts: [

  ],
  chats: {
    chatList: [/*{
      signup_time: '14:34',
      name: 'sasuke',
      avatar: '',
      id: 'sasuke',
      slogan: 'revenge',
      type: 'private',
    },
    {
      signup_time: '16:32',
      name: 'naruto',
      avatar: '',
      id: 'naruto',
      slogan: 'peace',
      type: 'private',
    }*/],
    currentChatId: -1,
    currentChatType: 'private',
  },
  messages: {},
}

const store = createStore(reducer, initValues, compose(reduxDevtools));

export default store;