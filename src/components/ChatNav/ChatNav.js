import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as Actions from 'store/Actions';
import styles from './ChatNav.scss';
import Tag from 'base/Tag/Tag.js';

/*let chats = [{path: 'room1', id: '233', name: 'room1'}, {path: 'room2', id: '2333', name: 'room1'}];
let tmp = [{path: 'room1', id: '233', name: 'room1'}, {path: 'room2', id: '2333', name: 'room1'}, {path: 'room3', id: '23333', name: 'room1'}, {path: 'room1', id: '233', name: 'room1'}, {path: 'room2', id: '2333', name: 'room1'}, {path: 'room3', id: '23333', name: 'room1'}, {path: 'room1', id: '233', name: 'room1'}, {path: 'room2', id: '2333', name: 'room1'}, {path: 'room3', id: '23333', name: 'room1'}, {path: 'room1', id: '233', name: 'room1'}, {path: 'room2', id: '2333', name: 'room1'}, {path: 'room3', id: '23333', name: 'room1'}];

class ChatList extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return(
      <div className='chat-nav'>
        {chats.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} activeStyle={{
              color: '#87ceeb'
            }}>
              <div className='chat-name'>
                {item.name}
              </div>
            </NavLink>
          )
        })}
      </div>
    )
  }
}

export default tChatList;
*/

function ChatNav ({chatList, currentChatId, closeChat, changeChat, currentChatType}) {
  return (<div className='chat-nav'>
    {chatList.map((item, index) => {
      let active = item.id===currentChatId && item.type===currentChatType
      return (
        <div className={active ? 'tag-wrapper active' : 'tag-wrapper'} key={`${item.type}_${item.id}`}>
          <Tag tagName={item.name} id={item.id} clickTag={()=>{changeChat(item.id, item.type)}} closeTag={()=>{closeChat(item.id)}} active={active}></Tag>
        </div>
      )
    })}
  </div>)
}

function mapState(state, ownProps) {
  return {
    chatList: state.chats.chatList,
    currentChatId: state.chats.currentChatId,
    currentChatType: state.chats.currentChatType,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    closeChat: (id) => {
      console.log('close tag');
      dispatch(Actions.closeChat(id))
    },
    changeChat: (id, type) => {
      console.log('changeChat:', id, ' ', type);
      dispatch(Actions.changeChat(id, type));
      dispatch(Actions.readAllMessage(type + '_' + id));
    }
  }
}

export default connect(mapState, mapDispatch)(ChatNav);