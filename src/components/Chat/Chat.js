import React, {Component} from 'react';
import {connect} from 'react-redux';
import SingleMessage from 'base/SingleMessage/SingleMessage.js';
import InputMsg from 'base/InputMsg/InputMsg.js';
import Message from 'common/js/message.js';
import style from './Chat.scss';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.sendMsg = this.sendMsg.bind(this);
  }

  sendMsg(message) {
    let msg = new Message(this.props.admin, this.props.chat.target, +new Date(), message, 'string')
    
    socket.emit('msg', msg)
  }

  render() {
    const {messages, admin} = this.props;
    return (
      <div className='chat-page'>
        <ul className='chat-content'>
          {messages.map((item) => {
            return (<li className='message' className={`${item.from_user.id===admin.id ? 'from-me' : 'from-others'}`} key={item.id}><SingleMessage msg={item} ></SingleMessage></li>)
          })}
        </ul>
        <div className='input-wrapper'>
          <InputMsg sendMsg={this.sendMsg}></InputMsg>
        </div>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    messages: state.messages[ownProps.chat.id] || []
  }
}

export default connect(mapState)(Chat);