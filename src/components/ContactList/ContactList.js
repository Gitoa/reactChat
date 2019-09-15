import React, {Component} from 'react';
import SingleContact from 'base/SingleContact/SingleContact';
import {connect} from 'react-redux';
import ContextMenu from 'base/ContextMenu/ContextMenu.js';
import * as Actions from 'store/Actions.js';
import style from './ContactList.scss';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.contexts = [];
  }

  render() {
    const {openChat, messages, contacts} = this.props;
    return(
        <ul className='contact-list'>
          {contacts.map((item, index) => {
            let chatId = item.type + '_' + item.id;
            console.log(chatId);
            let lastMessage = messages[chatId] ? messages[chatId].msgList.slice(-1)[0] : {};
            let unreadMsgCount = messages[chatId] ? messages[chatId].unreadMsgCount : 0;
            return (
              <li key={index}>
                <SingleContact chatId={chatId} avatar={item.avatar} time={item.time} name={item.name} lastMessage={lastMessage} unreadMsgCount={unreadMsgCount} clickCB={() => {openChat(item)}}></SingleContact>
              </li>
            )
          })}
        </ul>
    )
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.openChat(chat))
      dispatch(Actions.readAllMessage(chat.type + '_' + chat.id))
    }
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    messages: state.messages,
    contacts: state.contacts,
  }
}

export default connect(mapState, mapDispatch)(Contact);