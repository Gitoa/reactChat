import React from 'react';
import UserNav from 'components/UserNav/UserNav.js';
import Group from 'components/Group/Group.js';
import ChatRoom from 'components/ChatRoom/ChatRoom.js';
import {BrowserRouter as Router} from 'react-router-dom';
import 'common/js/socket.js';
import styles from './App.scss';

function App() {
  return (
    <div className='layout-wrapper'>
      <Router>
      <div className='layout-left-wrapper'>
        <div className='userNav-wrapper'>
          <UserNav></UserNav>
        </div>
        <div className='group-wrapper'>
          <Group></Group>
        </div>
      </div>
      </Router>
      <Router>
      <div className='layout-right-wrapper'>
        <div className='chat-room-wrapper'>
          <ChatRoom></ChatRoom>
        </div>
      </div>
      </Router>
    </div>
  );
}

export default App;
