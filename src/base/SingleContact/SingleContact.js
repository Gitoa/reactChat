import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import styles from './SingleContact.scss';

const defaultAvatar = '../../common/image/default.jpg';

class SingleContact extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {clickCB} = this.props;
    return (
      <div className='single-contact' onClick={clickCB}>
        <div className='avatar-wrapper'>
        </div>
        <div className='content-wrapper'>
          <div className='info-wrapper'>
            <div className='info-name'>
              {this.props.name}
            </div>
            <div className='info-time'>
              {this.props.lastMessage.time}
            </div>
          </div>
          <div className='message-wrapper'>
            {this.props.lastMessage.content}
          </div>
        </div>
      </div>
    )
  }
}

SingleContact.propTypes = {
  lastMessage: PropTypes.object,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string
}

SingleContact.defaultProps = {
  imgUrl: defaultAvatar
}

export default SingleContact;