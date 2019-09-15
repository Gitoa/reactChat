import React, {Component} from 'react';
import {avatarColor} from 'common/js/config';
import styles from './SingleUser.scss';

class SingleUser extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.avatarList = []
  }

  render() {
    const {clickCB, user} = this.props;
    let name = user.name;
    let currentAvatarColor = avatarColor[name.charCodeAt(0)%7]
    return (
      <div className='single-user' onClick={clickCB}>
        <div className='avatar-wrapper' style={{'backgroundColor': currentAvatarColor}}>
          {
            user.avatar ? <img src={user.avatar}/> : <span>{name[0].toUpperCase()}</span>
          }
        </div>
        <div className='name-wrapper'>
          {name}
        </div>
      </div>
    )
  }
}

export default SingleUser;