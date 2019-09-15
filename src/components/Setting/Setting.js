import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from 'store/Actions.js';
import style from './Setting.scss';
import {clearLocalData} from 'common/js/cache.js';
import socketContainer from 'common/js/initSocket.js';

class Setting extends Component {
  constructor() {
    super();
    this.clearData = this.clearData.bind(this);
    this.logout = this.logout.bind(this);
  }
  
  clearData() {
    this.props.clearAllMessage();
    this.props.clearContact();
    clearLocalData(this.props.admin.id)
  }

  logout(id) {
    fetch("/logout?user_id=" + id).then(response => {
      if (response.ok || response.status === 304) {
        return response.json()
      }
      throw new Error('Network reponse was not ok');
    }).then(ack => {
      socketContainer.socket.emit('logout');
      window.location.href = "/sign";
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    const admin = this.props.admin;
    return (
      <div className='setting-wrapper'>
        <div className='info-wrapper'>
          <div className='avatar-wrapper'>
            {
              admin.avatar ? <img src={admin.avatar} alt='个人头像'></img> : <p>{admin.name ? admin.name[0].toUpperCase() : '?'}</p>
            }
          </div>
          <p className='name'>{admin.name}</p>
          <p className='signup-time'>{admin.time}</p>
          <p className='slogan'>{`个性签名:${admin.slogan ? admin.slogan : "无"}`}</p>
        </div>

        <p className='clear-button' onClick={this.clearData}>清除记录</p>
        <p className='logout-button' onClick={() => {this.logout(admin.id)}}>退出登录</p>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    clearAllMessage: () => {
      dispatch(Actions.clearAllMessage());
    },
    clearContact: () => {
      dispatch(Actions.clearContact());
    }
  }
}

export default connect(mapState, mapDispatch)(Setting);