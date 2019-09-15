import React, { Component } from 'react';
import {avatarColor} from 'common/js/config.js';
import styles from './UserCard.scss';

class UserCard extends Component {
  constructor() {
    super();
    this.closeCard = this.closeCard.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  closeCard() {
    this.props.closeCard();
  }

  deleteFriend() {
    this.props.deleteFriend();
  }

  addFriend() {
    this.props.addFriend();
  }

  openChat() {
    this.props.openChat(this.props.user);
  }

  render() {
    const {name, avatar, slogan, isFriend, id} = this.props.user;
    let currentAvatarColor = avatarColor[name.charCodeAt(0) % 7];
    return (
      <div className='user-card-wrapper'>
        <div className='x-icon' onClick={this.closeCard}>x</div>
        <div className='user-info'>
          <div className='avatar-wrapper'>
            <div className='avatar' style={{'backgroundColor': currentAvatarColor}}>{avatar ? <img src={avatar}/> : <span>{name[0].toUpperCase()}</span>}</div>
          </div>
          <div className='user-name'>
            <p>{name}</p>
          </div>
          <div className='user-slogan'>
            <p>{slogan}</p>
          </div>
          <div className='button-wrapper'>
            {isFriend ? <div className='delete-friend-button button' onClick={this.deleteFriend}>删除好友</div> : <div className='add-friend-button button' onClick={this.addFriend}>添加好友</div>}
            <div className='open-chat-button button' onClick={this.openChat}>私聊此人</div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard;