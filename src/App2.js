import React, {Component} from 'react';
import UserNav from 'components/UserNav/UserNav.js';
import Group from 'components/Group/Group.js';
import ChatRoom from 'components/ChatRoom/ChatRoom.js';
import {BrowserRouter as Router} from 'react-router-dom';
import styles from './App.scss';
import {connect} from 'react-redux';
import {getUserFriends, getUserGroups} from 'common/js/socket.js';
import socketContainer, {initSocket} from 'common/js/initSocket.js';
import * as Actions from 'store/Actions.js';
import * as ActionTypes from 'store/ActionTypes.js';
import {cloneToCamelCase} from 'common/js/utils.js';
import {getLocalContact, saveLocalContact, getLocalMsg, saveLocalMsg} from 'common/js/cache';
import Prompt from 'base/Prompt/Prompt';

class App2 extends Component{
  constructor(props) {
    super(props);
    /*
    let adminId = props.admin.id;
    let friendList = getUserFriends(adminId);
    this.props.initFriendList(friendList);
    let groupList = getUserGroups(adminId);
    this.props.initGroupList(groupList);
    */
  }
  componentWillMount() {
    console.log('will mount');
    const {addContact, addMsg} = this.props;
    let userId = -1;
    let cookieSplit = document.cookie.split(';');
    let index = cookieSplit.findIndex(item => {
      return (item.split('=')[0].trim() === 'userId');
    })
    index > -1 && (userId = cookieSplit[index].split('=')[1].trim());
    console.log(userId);
    if (userId === -1) {
      window.location.href = '/sign';
      return;
    }
    console.log('socket create');
    socketContainer.socket = io.connect('http://gitoa.top:3050');
    let socket = socketContainer.socket;
    socket.on('connect_confirm', function (data) {
      console.log(data);
    });
    socket.emit('config_init', { userId: Number(userId) });
    initSocket(socket);
    let {initAdmin, initFriendList, initGroupList, initMessageList, initContactList} = this.props;
    initContactList(getLocalContact(userId));
    initMessageList(getLocalMsg(userId));
    fetch("/init_info?user_id="+userId).then(response => {
      if (response.ok || response.status === 304) {
        return response.json()
      }
      throw new Error('Network response was not ok');
    }).then(ack => {
      initAdmin(ack.admin);
      initFriendList(ack.friends.map(item => Object.assign(item, {type: 'private'})));
      initGroupList(ack.groups.map(item => Object.assign(item, {type: 'group'})));
      console.log(ack);
    }).catch(err => console.log(err));
    socket.emit('getOfflineMsg', userId, (data) => {
      console.log(data);
      socket.emit('clearOfflineMsg', userId, (msg) => {
        console.log(msg);
      });
      let newContactList = [];
      data.forEach(msg => {
        let data = cloneToCamelCase(msg);
        Object.assign(data, {status: {unread: true, send: 'sended'}});
        let chatId = data.msgType === 'private' ? 'private_' + data.senderId : 'group_' + data.groupId;
        addMsg(data, chatId);
        if (data.msgType === 'private') {
          let contact = {
            type: 'private', id: data.senderId, avatar: data.senderAvatar, name: data.senderName,
          }
          let index = newContactList.findIndex(item => item.id === contact.id);
          index > -1 && newContactList.splice(index, 1);
          newContactList.unshift(contact);
        } else {
          let contact = {
            type: 'group', id: data.groupId, avatar: data.groupAvatar, name: data.groupName,
          }
          let index = newContactList.findIndex(item => item.id === contact.id);
          index > -1 && newContactList.splice(index, 1);
          newContactList.push(contact);
        }
      })
      newContactList.forEach(contact => {
        addContact(contact);
      })
    })

    window.onbeforeunload = function(e) {
      saveLocalContact(userId);
      saveLocalMsg(userId);
    }
  }

  render() {
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
        <Prompt></Prompt>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    initAdmin: (admin) => {
      dispatch(Actions.setAdmin(admin));
    },
    initFriendList: (list) => {
      dispatch(Actions.setFriendList(list));
    },
    initGroupList: (list) => {
      dispatch(Actions.setGroupList(list));
    },
    initMessageList: (list) => {
      dispatch(Actions.setMessageList(list))
    },
    initContactList: (list) => {
      dispatch(Actions.setContactList(list));
    },
    addMsg: (msg, chatId) => {
      dispatch(Actions.addMessage(msg, chatId));
    },
    addContact: (contact) => {
      dispatch(Actions.addContact(contact));
    },
  }
}

export default connect(mapState, mapDispatch)(App2);
