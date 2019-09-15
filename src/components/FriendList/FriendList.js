import React, {Component} from 'react';
import {getFriendList} from 'api/UserList';
import SingleUser from 'base/SingleUser/SingleUser.js';
import style from './FriendList.scss';
import * as Actions from 'store/Actions.js';
import {connect} from 'react-redux';

class GroupList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.friendListData = getFriendList();
  }

  render() {
    const {openChat, friendList} = this.props;
    return (
      <ul className='friend-list-wrapper'>
        {friendList.map((item, index) => {
          return (
            <li className='single-friend-wrapper' key={index}>
              <SingleUser user={item} clickCB={() => {openChat(item)}}></SingleUser>
            </li>
          )
        })}
      </ul>
    )
  }
}

function mapState(state, ownProps) {
  return {
    friendList: state.friends,
  }
}
function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.openChat(chat))
      dispatch(Actions.readAllMessage(chat.type + '_' + chat.id))
    }
  }
}

export default connect(mapState, mapDispatch)(GroupList);