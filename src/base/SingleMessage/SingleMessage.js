import React, {Component} from 'react';
import styles from './SingleMessage.scss';

class SingleMessage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const message = this.props.msg;
    return (
      <div className='message-wrapper'>
        <div className='user-avatar'>
          {message.from_user.avatar ? <img src={message.from_user.avatar}/> : <span>{message.from_user.name[0].toUpperCase()}</span>}
        </div>
        <div className='message-info-wrapper'>
          <div className='message-info'>
            <span>{message.from_user.name}</span>
            <span>{message.create_time}</span>
          </div>
          <p className='message-content'>
            {message.content}
          </p>
        </div>
      </div>
    )
  }
}

export default SingleMessage;