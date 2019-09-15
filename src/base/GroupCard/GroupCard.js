import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import style from './GroupCard.scss';

function GroupCard(props) {

  const {avatar, name, notice, id} = props.group;

  let isJoined = props.groups.findIndex(item => item.id === id) > -1;

  return (
    <div className='group-card-wrapper'>
      <div className='x-icon' onClick={props.closeCard}>x</div>
      <div className='group-info'>
        <div className='avatar-wrapper'>
          {avatar ? <img src={avatar}/> : <span>{name[0].toUpperCase()}</span>}
        </div>
        <p className='group-name'>{name}</p>
        <p className='group-notice'>{notice}</p>
        <div className='button-wrapper'>
          {!isJoined ? <p className='join-group-button button' onClick={props.joinGroup}>加入群聊</p> : (<div>
          <p className='quit-group-button button' onClick={props.quitGroup}>退出群聊</p>
          <p className='open-group-chat-button button' onClick={props.openChat}>进入群聊</p>
          </div>)}
        </div>
      </div>
    </div>
  )
}

function mapState(state, ownProps) {
  return {
    groups: state.groups
  }
}

export default connect(mapState)(GroupCard);