import React, {Component} from 'react';
import {connect} from 'react-redux';
import SingleMessage from 'base/SingleMessage/SingleMessage.js';
import InputMsg from 'base/InputMsg/InputMsg.js';
import Message from 'common/js/message.js';
import * as Actions from 'store/Actions.js';
import style from './Chat.scss';
import socketContainer from 'common/js/initSocket.js';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
  }

  sendMsg(message) {
    let chat = this.props.chat;
    let msg = new Message(this.props.admin, chat, +new Date(), message, 'string')
    console.log('send msg');
    this.props.addMessage(Object.assign({}, msg, {status: {unread: false, send: 'sending'}}), msg.msgType + '_' + msg.receiverId);
    this.props.addContact(chat);
    socketContainer.socket.emit('msg', msg, (data) => {
      this.props.updateMessage(Object.assign(msg, {status: {unread: false, send: 'sended'}}), msg.msgType + '_' + msg.receiverId);
    })
  }

  render() {
    const {messages, admin, chat, groups} = this.props;
    let showInput = false, group = null;
    if (chat.type === 'private') {
      showInput = true;
    } else if (chat.type === 'group'){
      let index = groups.findIndex(item => item.id === chat.id);
      showInput = index > -1;
      group = {
        name: chat.name,
        id: chat.id,
        avatar: chat.avatar,
        type: 'group',
      }
    }
    return (
      <div className='chat-page'>
        <ul className='chat-content'>
          {messages.map((item) => {
            return (<li key={item.msgId} className='message-wrapper'><SingleMessage msg={item} sender={item.senderId===admin.id ? 'me' : 'others'}></SingleMessage></li>)
          })}
        </ul>
        <div className='input-wrapper'>
          {
          showInput ? <InputMsg sendMsg={this.sendMsg}></InputMsg> : <div className='noInput' onClick={() => {this.joinGroup(group)}}>加入私聊</div>
          }
        </div>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    messages: (state.messages[`${ownProps.chat.type}_${ownProps.chat.id}`] && state.messages[`${ownProps.chat.type}_${ownProps.chat.id}`].msgList) || [],
    groups: state.groups,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    addMessage: (msg, chatId) => {
      dispatch(Actions.addMessage(msg, chatId))
    },
    updateMessage: (msg, chatId) => {
      dispatch(Actions.updateMessage(msg, chatId));
    },
    addContact: (contact) => {
      dispatch(Actions.addContact(contact));
    },
  }
}

export default connect(mapState, mapDispatch)(Chat);