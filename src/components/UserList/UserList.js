import React, {Component} from 'react';
import {getUserList} from 'api/UserList';
import SingleUser from 'base/SingleUser/SingleUser.js';
import style from './UserList.scss';
import * as Actions from 'store/Actions.js';
import {connect} from 'react-redux';

class GroupList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.userListData = getUserList();
  }

  render() {
    const {open_chat} = this.props;
    return (
      <ul className='user-list-wrapper'>
        {this.userListData.map((item, index) => {
          return (
            <li className='single-user-wrapper' key={index}>
              <SingleUser name={item.name} clickCB={() => {open_chat(item)}}></SingleUser>
            </li>
          )
        })}
      </ul>
    )
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    open_chat: (chat) => {
      dispatch(Actions.open_chat(chat))
    }
  }
}

export default connect(null, mapDispatch)(GroupList);