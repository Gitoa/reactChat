import React, {Component} from 'react';
import {getGroupList} from 'api/GroupList';
import SingleGroup from 'base/SingleGroup/SingleGroup.js';
import style from './GroupList.scss';
import * as Actions from '../../store/Actions';
import {connect} from 'react-redux';

class GroupList extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.groupListData = getGroupList();
  }

  render() {
    const {open_chat} = this.props;
    return (
      <ul className='group-list-wrapper'>
        {this.groupListData.map((item, index) => {
          return (
            <li className='single-group-wrapper' key={index}>
              <SingleGroup name={item.name} clickCB={() => {open_chat(item)}}></SingleGroup>
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
      dispatch(Actions.open_chat(chat));
    }
  }
}


export default connect(null, mapDispatch)(GroupList);