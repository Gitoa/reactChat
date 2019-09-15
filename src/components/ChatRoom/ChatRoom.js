import React, {Component} from 'react';
import ChatNav from 'components/ChatNav/ChatNav.js';
import Chat from 'components/Chat/Chat.js';
import style from './ChatRoom.scss';
import {connect} from 'react-redux';
import Mask from 'base/Mask/Mask.js';
import UserCard from 'base/UserCard/UserCard.js';
import GroupInfo from 'components/GroupInfo/GroupInfo';
import * as Actions from 'store/Actions.js';
import {deleteFriend, addFriend, quitGroup, joinGroup} from 'common/js/socket.js';
import eventEmitter from 'common/js/events.js';
import { deleteMessage } from '../../store/Actions';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserCard: false,
      showGroupInfo: false,
      groupInfo: {
        name: '',
        id: '',
        notice: '',
        avatar: '',
        creator: '',
        memberList: [],
        type: 'group',
      },
      userInfo: {
        name: 'x',
        id: '',
        slogan: '',
        isFriend: false,
        avatar: '',
        type: 'private',
      }
    }
    this.closeUserCard = this.closeUserCard.bind(this);
    this.closeGroupInfo = this.closeGroupInfo.bind(this);
    this.quitGroup = this.quitGroup.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.showUserCard = this.showUserCard.bind(this);
    this.openGroupMemeberChat = this.openGroupMemeberChat.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  closeUserCard() {
    this.setState(Object.assign(this.state, {showUserCard: false}));
    console.log('close user card');
  }

  closeGroupInfo() {
    this.setState(Object.assign(this.state, {showGroupInfo: false}));
  }

  quitGroup() {
    let userId = this.props.admin.id;
    let groupId = this.state.groupInfo.id;
    quitGroup(userId, groupId).then(() => {
      console.log('退出成功');
      this.closeGroupInfo();
      this.props.quitGroup(groupId);
    }).catch(e => {
      console.log('退出失败: ', e);
    })
  }

  joinGroup(group) {
    let userId = this.props.admin.id;
    joinGroup(userId, group.id).then(() => {
      console.log('加入成功');
      this.props.joinGroup(group);
    }).catch(e => {
      console.log('加入失败');
    })
  }

  showInfo() {
    const user = this.props.currentChat;
    this.props.currentChatType === 'private' ? this.showUserCard(user.id, user.avatar, user.name, user.slogan) :
    this.setState(Object.assign(this.state, {showGroupInfo: true}))
  }

  showUserCard (id, avatar='', name='', slogan='', type='private') {
    let isFriend = this.props.friends.findIndex(item => item.id === id) > -1;
    let userInfo = {
      id,
      avatar,
      name,
      slogan,
      isFriend,
      type,
    }
    fetch("/userInfo/" + id).then(response => {
      if (response.ok || response.status === 304) {
        response.json().then(data => {
          let userInfo = Object.assign(data, {isFriend});
          this.setState(Object.assign(this.state, {userInfo, showUserCard: true}));
        })
      } else {
        console.log('here');
        this.setState(Object.assign(this.state, {userInfo, showUserCard: true}));
      }
    }).catch(e => {
      console.log(e);
      this.setState(Object.assign(this.state, {userInfo, showUserCard: true}));
    })
  }

  openGroupMemeberChat(chat) {
    this.closeGroupInfo();
    this.closeUserCard();
    this.props.openChat(chat);
  }

  addFriend(userId, targetId) {
    console.log('try add');
    if (userId === targetId) {
      eventEmitter.emit('error', '无法添加自身为好友');
      console.log('无法添加自身为好友');
      return;
    }
    addFriend(userId, targetId).then(() => {
      let newUserInfo = Object.assign({}, this.state.userInfo, {isFriend: true});
      this.setState(Object.assign(this.state, {userInfo: newUserInfo}));
      this.props.addFriend(this.state.userInfo);
      console.log('add succeed')
    }).catch(e => console.log('add failed', e));
  }

  deleteFriend(userId, targetId) {
    console.log('try delete');
    deleteFriend(userId, targetId).then(() => {
      this.props.deleteFriend(targetId);
      let newUserInfo = Object.assign({}, this.state.userInfo, {isFriend: false});
      this.setState(Object.assign(this.state, {userInfo: newUserInfo}));
    }).catch(e => console.log('delete failed', e))
  }

  render() {
    const {chatList, currentChatId, currentChatType, admin} = this.props;
    const {userInfo} = this.state;
    return (
      <div className='chat-rooms'>
        <div className='chat-rooms-header'>
          <div className='chat-nav-wrapper'>
            <ChatNav></ChatNav>
          </div>
          <div className='operator-wrapper'>
            {chatList.length > 0 ? (<div className='iconfont icon' onClick={this.showInfo}>
              <i className={currentChatType === 'private' ? 'icon-user' : 'icon-group'}></i>
            </div>) : null}
          </div>
        </div>
        <div className='single-room-wrapper'>
          {chatList.map((item) => {
            return (<div key={`${item.type}_${item.id}`} className={`chat-page-wrapper ${item.id === currentChatId && item.type === currentChatType ? 'chatting' : 'hang-on'}`}><Chat chat={item} joinGroup={this.joinGroup}></Chat></div>)
          })}
        </div>
        <div className={`userCard ${this.state.showUserCard ? '' : 'hide'}`}>
          <Mask cb={this.closeUserCard} zIndex={999}></Mask>
          <UserCard user={this.state.userInfo} closeCard={this.closeUserCard} openChat={this.openGroupMemeberChat} deleteFriend={() => {this.deleteFriend(admin.id, userInfo.id)}} addFriend={() => {this.addFriend(admin.id, userInfo.id)}}></UserCard>
        </div>
        {
          this.state.showGroupInfo ? <Mask cb={this.closeGroupInfo} opacity={0} zIndex={99}></Mask> : null
        }
        {
          this.state.showGroupInfo ? <GroupInfo groupId={this.props.currentChatId} showMemberCard={this.showUserCard} quitGroup={this.quitGroup}></GroupInfo> : null
        }
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    friends: state.friends,
    chatList: state.chats.chatList,
    currentChatId: state.chats.currentChatId,
    currentChatType: state.chats.currentChatType,
    currentChat: state.chats.chatList.find(chat => {
      return chat.type === state.chats.currentChatType && chat.id === state.chats.currentChatId
    })
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.openChat(chat));
      dispatch(Actions.readAllMessage(chat.type + '_' + chat.id));
    },
    deleteFriend: (id) => {
      dispatch(Actions.deleteFriend(id));
    },
    addFriend: (user) => {
      dispatch(Actions.addFriend(user));
    },
    quitGroup: (groupId) => {
      dispatch(Actions.quitGroup(groupId));
    },
    joinGroup: (group) => {
      dispatch(Actions.joinGroup(group));
    }
  }
}
export default connect(mapState, mapDispatch)(ChatRoom);