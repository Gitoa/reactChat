import React, {Component} from 'react';
import navUser from 'common/js/nav_user.js';
import {NavLink} from 'react-router-dom';
import styles from './UserNav.scss';
import {connect} from 'react-redux';

class UserNav extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className='user-nav'>
        <div className='my-info'>
          <div className='avatar'></div>
        </div>
        <div className='nav'>
          {navUser.map((item, index) => {
            return (
              <NavLink to={item.path} key={item.type} activeStyle={{
                color: '#87ceeb'
              }}>
                <div className='iconfont'>
                  {
                    item.icon === 'icon-comment' && this.props.unreadMsgCount > 0 ? <div className='red-dot'></div> : null
                  }
                  <i className={item.icon}/>
                </div>
              </NavLink>
            )
          })}
        </div>
        <div className='setting iconfont'>
          <NavLink to='/setting' activeStyle={{color: '#87ceeb'}}><i className='icon-setting'/></NavLink>
        </div>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  let count = 0;
  state.contacts.forEach(item => {
    let msgs = state.messages[item.type + '_' + item.id];
    msgs && msgs.unreadMsgCount && (count += msgs.unreadMsgCount);
  });
  return {
    unreadMsgCount: count,
  }
}

export default connect(mapState)(UserNav);