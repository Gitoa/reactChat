import React from 'react';
import UserNav from 'components/UserNav/UserNav.js';
import Group from 'components/Group/Group.js';
import ChatRoom from 'components/ChatRoom/ChatRoom.js';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Login from './views/login';
import App2 from './App2.js';
import 'common/js/socket.js';
import styles from './App.scss';

function App() {
  return (
    <div>
      <App2></App2>
    </div>
  );
}

export default App;
