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

function ChatNav ({chatList, currentChatId, closeChat, changeChat}) {
  return (<div className='chat-nav'>
    {chatList.map((item, index) => {
      return (
        <div className='tag-wrapper' key={item.id}>
          <Tag tagName={item.name} id={item.id} clickTag={()=>{changeChat(item.id)}} closeTag={()=>{closeChat(item.id)}} active={item.id===currentChatId}></Tag>
        </div>
      )
    })}
  </div>)
}

function mapState(state, ownProps) {
  return {
    chatList: state.chats.chatList,
    currentChatId: state.chats.currentChatId,
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    closeChat: (id) => {
      console.log('close tag');
      dispatch(Actions.close_chat(id))
    },
    changeChat: (id) => {
      console.log('change_chat:', id)
      dispatch(Actions.change_chat(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ChatNav);