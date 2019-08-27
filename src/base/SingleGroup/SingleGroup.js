import React, {Component} from 'react';
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
    const {clickCB} = this.props;
    return (
      <div className='single-group' onClick={clickCB}>
        <div className='avatar-wrapper'>
          
        </div>
        <div className='name-wrapper'>
          {this.props.name}
        </div>
      </div>
    )
  }
}

export default SingleGroup;