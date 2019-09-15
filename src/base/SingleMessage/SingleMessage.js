import React, {Component} from 'react';
import {avatarColor} from 'common/js/config.js';
import styles from './SingleMessage.scss';

class SingleMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let message = this.props.msg, sender = this.props.sender;
    const senderName = message.senderName;
    const currentAvatarColor = avatarColor[senderName.charCodeAt(0) % 7];
    return (
      <div className={`message-wrapper from-${sender}`}>
        <div className='message-info'>
          <div className='avatar-wrapper' style={{'backgroundColor': currentAvatarColor}}>
            {message.senderAvatar ? <img src={message.senderAvatar}/> : <span>{senderName[0].toUpperCase()}</span>}
          </div>
          <p className='sender-name'>{senderName}</p>
          <p className='send-time'></p>
        </div>
        <p className='message-content'>
          {message.msgContent}
        </p>
      </div>
    )
  }
}

export default SingleMessage;