import React, {Component} from 'react';
import ChatNav from 'components/ChatNav/ChatNav.js';
import Chat from 'components/Chat/Chat.js';
import style from './ChatRoom.scss';
import {connect} from 'react-redux';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {ChatList, currentChatId} = this.props;
    return (
      <div className='chat-rooms'>
        <div className='chat-rooms-header'>
          <div className='chat-nav-wrapper'>
            <ChatNav></ChatNav>
          </div>
          <div className='operator-wrapper'>
          </div>
        </div>
        <div className='single-room-wrapper'>
          {ChatList.map((item) => {
            return (<div key={item.id} className={`chat-page-wrapper ${item.id === currentChatId ? 'chatting' : 'hang-on'}`}><Chat chat={item}></Chat></div>)
          })}
        </div>
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    ChatList: state.chats.chatList,
    currentChatId: state.chats.currentChatId,
  }
}
export default connect(mapState)(ChatRoom);