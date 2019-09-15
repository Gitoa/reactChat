import React, { Component } from 'react';
import SingleUser from 'base/SingleUser/SingleUser.js';
import styles from './GroupInfo.scss';

class GroupInfo extends Component {
  constructor() {
    super();
    this.state = {
      memberList: []
    }
  }

  componentWillMount() {
    let that = this;
    fetch("/group_info/" + this.props.groupId).then(response => {
      if (response.ok || response.status===304) {
        response.json().then(data => {
          console.log(data)
          that.setState({memberList: data})
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }

  render () {
    const {showMemberCard} = this.props;
    return (
      <div className='group-info-wrapper'>
        <div className='notice-wrapper'>
          <p className='notice-title'>群公告</p>
          <p className='notice-content'>
            {this.notice ? this.notice : '暂无群公告～'}
          </p>
        </div>
        <ul className='members'>
          {
            this.state.memberList.map(item => {
              return (
                <li key={item.id}><SingleUser user={item} clickCB={() => {showMemberCard(item.id, item.avatar, item.name, item.slogan)}}></SingleUser></li>
              )
            })
          }
        </ul>
        <p className='quit-group' onClick={this.props.quitGroup}>退出群聊</p>
      </div>
    )
  }
}

export default GroupInfo;