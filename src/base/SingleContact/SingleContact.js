import React, {Component} from 'react';
import Mask from 'base/Mask/Mask.js';
import {PropTypes} from 'prop-types';
import style from './SingleContact.scss';
import * as Actions from 'store/Actions.js';
import {connect} from 'react-redux';
import {avatarColor} from 'common/js/config';

const defaultAvatar = '../../common/image/default.jpg';

class SingleContact extends Component {
  constructor(props) {
    super(props);
    this.showContext = this.showContext.bind(this);
    this.closeContextMenu = this.closeContextMenu.bind(this);
    this.state = {
      display: 'none',
    }
  }

  showContext(ev) {
    this.setState({display: 'block'});
    ev.preventDefault();
  }

  closeContextMenu() {
    this.setState({display: 'none'});
  }

  render() {
    const {clickCB, avatar, name, time, unreadMsgCount, chatId} = this.props;
    let currentAvatarColor = avatarColor[name.charCodeAt(0) % 7];
    return (
      <div className='single-contact' onClick={clickCB} onContextMenu={this.showContext}>
        <div className='avatar-wrapper' style={{'backgroundColor': currentAvatarColor}}>
          {
           unreadMsgCount > 0 ? <p className='unread-mark'>{unreadMsgCount}</p> : null
          }
          {
            avatar ? <img src={avatar}/> : <span>{name[0].toUpperCase()}</span>
          }
        </div>
        <div className='content-wrapper'>
          <div className='info-wrapper'>
            <p className='info-name'>
              {this.props.name}
            </p>
            <p className='info-time'>
              {time}
            </p>
          </div>
          <div className='message-wrapper'>
            {this.props.lastMessage ? this.props.lastMessage.msgContent : null}
          </div>
        </div>
        {
          this.state.display === 'block' ? <Mask cb={this.closeContextMenu} zIndex={99} opacity={0}></Mask> : null
        }
        <div className='context-menu-wrapper' style={{display:this.state.display}}>
          <p onClick={() => {this.props.deleteContact(chatId)}}>删除</p>
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

function mapDispatch(dispatch, ownProps) {
  return {
    deleteContact: (chatId) => {
      dispatch(Actions.deleteContact(chatId))
    }
  }
}

export default connect(null, mapDispatch)(SingleContact);