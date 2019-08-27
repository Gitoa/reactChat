import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './Reducer.js';
import {loadMessage} from 'common/js/cache.js';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension():f=>f

const initValues = {
  admin: 
  {
    id: 'naruto',
    name: 'naruto',
    create_time: '14:20',
    type: 'private',
    information: 'peace',
    avatar: '',
  },

  users: [

  ],
  groups: [

  ],
  contacts: [

  ],
  chats: {
    chatList: [{name: 'sasuke', target: {
      create_time: '14:34',
      name: 'sasuke',
      avatar: '',
      id: 'sasuke',
      information: 'revenge',
      type: 'private',
    }, id: 'private_sasuke'},
    {name: 'naruto', target: {
      create_time: '16:32',
      name: 'naruto',
      avatar: '',
      id: 'naruto',
      information: 'peace',
      type: 'private',
    }, id: 'private_naruto'}],
    currentChatId: 'private_sasuke',
  },
  messages: loadMessage('test1')
}

const store = createStore(reducer, initValues, compose(reduxDevtools));

export default store;