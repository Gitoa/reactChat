import React, {Component} from 'react';
import {avatarColor} from 'common/js/config.js';
import {PropTypes} from 'prop-types';
import styles from './SingleGroup.scss';

class SingleGroup extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.avatarList = []
  }

  render() {
    const {clickCB, name} = this.props;
    const currentAvatarColor = avatarColor[name.charCodeAt(0) % 7];
    return (
      <div className='single-group' onClick={clickCB}>
        <div className='avatar-wrapper' style={{'backgroundColor': currentAvatarColor}}>
          {
            this.props.avatar ? <img src={this.props.avatar}></img> : <p>{name[0].toUpperCase()}</p>
          }
        </div>
        <div className='name-wrapper'>
          {name}
        </div>
      </div>
    )
  }
}

export default SingleGroup;