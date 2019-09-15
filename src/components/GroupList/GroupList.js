import React, {Component} from 'react';
import {getGroupList} from 'api/GroupList';
import SingleGroup from 'base/SingleGroup/SingleGroup.js';
import style from './GroupList.scss';
import * as Actions from '../../store/Actions';
import {connect} from 'react-redux';
import { statement } from '@babel/template';

class GroupList extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {openChat, groupList} = this.props;
    return (
      <ul className='group-list-wrapper'>
        {groupList.map((item, index) => {
          return (
            <li className='single-group-wrapper' key={index}>
              <SingleGroup name={item.name} clickCB={() => {openChat(item)}}></SingleGroup>
            </li>
          )
        })}
      </ul>
    )
  }
}

function mapState(state, ownProps) {
  return {
    groupList: state.groups,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.openChat(chat));
      dispatch(Actions.readAllMessage(chat.type + '_' + chat.id));
    }
  }
}


export default connect(mapState, mapDispatch)(GroupList);