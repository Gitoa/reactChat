import React, {Component} from 'react';
import navUser from 'common/js/nav_user.js';
import {NavLink} from 'react-router-dom';
import styles from './UserNav.scss';

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
                  <i className={item.icon}/>
                </div>
              </NavLink>
            )
          })}
        </div>
        <div className='setting iconfont'>
          <i className='icon-setting'/>
        </div>
      </div>
    )
  }
}

export default UserNav;