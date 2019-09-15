import React, {Component} from 'react';
import LocalSearch from 'base/LocalSearch/LocalSearch';
//import Routes from 'router/Routes.js';
import styles from './Group.scss';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Zone from 'components/ZoneList/ZoneList';
import ContactList from 'components/ContactList/ContactList';
import GroupList from 'components/GroupList/GroupList';
import FriendList from 'components/FriendList/FriendList';
import Setting from 'components/Setting/Setting';
import CreateGroup from 'base/CreateGroup/CreateGroup.js';
import SearchResultList from 'components/SearchResultList/SearchResultList.js';
import Mask from 'base/Mask/Mask.js';
import UserCard from 'base/UserCard/UserCard.js';
import GroupCard from 'base/GroupCard/GroupCard.js';
import {deleteFriend, addFriend, quitGroup, joinGroup, createGroup} from 'common/js/socket.js';
import * as Actions from 'store/Actions.js';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createGroup: false,
      keyword: null,
      userInfo: null,
      groupInfo: null,
    }
    this.cancelShowCreate = this.cancelShowCreate.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.showGroupCreate = this.showGroupCreate.bind(this);
    this.changeKeyword = this.changeKeyword.bind(this);
    this.showUserCard = this.showUserCard.bind(this);
    this.closeUserCard = this.closeUserCard.bind(this);
    this.showGroupCard = this.showGroupCard.bind(this);
    this.closeGroupCard = this.closeGroupCard.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.quitGroup = this.quitGroup.bind(this);
    this.openPrivateChat = this.openPrivateChat.bind(this);
    this.openGroupChat = this.openGroupChat.bind(this);
  }

  showUserCard(user) {
    let isFriend = this.props.friends.findIndex(item => item.id === user.id) > -1;
    Object.assign(user, {isFriend});
    this.setState({userInfo: user});
  }

  closeUserCard() {
    this.setState({userInfo: null});
  }

  showGroupCard(group) {
    let isJoined = this.props.groups.findIndex(item => item.id === group.id) > -1;
    Object.assign(group, {isJoined});
    this.setState({groupInfo: group});
  }

  closeGroupCard() {
    this.setState({groupInfo: null});
  }

  addFriend(userId, targetId) {
    let id = userId || this.props.admin.id;
    if (id === targetId) {
      console.log('无法添加自身为好友');
      return
    }
    addFriend(id, targetId).then(() => {
      let newUserInfo = Object.assign({}, this.state.userInfo, {isFriend: true});
      this.setState({userInfo: newUserInfo});
      this.props.addFriend(this.state.userInfo);
    }).catch(e => console.log('add failed: ', e));
  }

  deleteFriend(userId, targetId) {
    let id = userId || this.props.amdin.id;
    deleteFriend(id, targetId).then(() => {
      this.props.deleteFriend(targetId);
      let newUserInfo = Object.assign({}, this.state.userInfo, {isFriend: false});
      this.setState({userInfo: newUserInfo});
    }).catch(e => console.log('delete failed: ', e));
  }

  joinGroup(userId, targetId) {
    let id = userId || this.props.amdin.id;
    joinGroup(id, targetId).then(() => {
      this.props.joinGroup(Object.assign({}, this.state.groupInfo, {type: 'group', isJoined: 'true'}));
    }).catch(e => console.log('join failed: ', e));
  }

  quitGroup(userId, targetId) {
    let id = userId || this.props.admin.id;
    quitGroup(id, targetId).then(() => {
      this.props.quitGroup(targetId);
    }).catch(e => console.log('quit failed: ', e));
  }

  openPrivateChat(chat) {
    this.props.openChat(chat);
    this.closeUserCard();
  }

  openGroupChat(chat) {
    this.props.openChat(chat);
    this.closeGroupCard();
  }

  cancelShowCreate() {
    this.setState({
      createGroup: false,
    })
  }

  createGroup(group) {
    createGroup(this.props.admin.id, group).then((groupInfo) => {
      this.props.joinGroup(groupInfo);
      this.cancelShowCreate();
    }).catch(e => console.log('create group failed: ', e))
  }

  showGroupCreate() {
    this.setState({
      createGroup: true,
    })
  }
  
  changeKeyword(keyword) {
    console.log(keyword, + new Date());
    this.setState({keyword});
    if(keyword) {
      this.props.history.location.pathname !== '/search' && this.props.history.push('/search');
    } else {
      this.props.history.goBack();
    }
  }

  render() {
    const {userInfo, groupInfo} = this.state;
    const {admin} = this.props;
    return (
      <div className='group'>
        <div className='local-search-wrapper'>
          <LocalSearch add={this.showGroupCreate} changeKeyword={this.changeKeyword}></LocalSearch>
        </div>
        <div className='list-wrapper'>
            <Route path='/contact' component={ContactList}></Route>
            <Route path='/group' component={GroupList}></Route>
            <Route path='/recommend' component={Zone}></Route>
            <Route path='/friend' component={FriendList}></Route>
            <Route path='/search' render={() => (<SearchResultList keyword={this.state.keyword} showOnlineUserCard={this.showUserCard} showOnlineGroupCard={this.showGroupCard}></SearchResultList>)}></Route>
            <Route path='/setting' component={Setting}></Route>
        </div>
        {
          this.state.createGroup ? <CreateGroup cancel={this.cancelShowCreate} confirm={this.createGroup}></CreateGroup> : null
        }
        {
          userInfo ? 
          <div> 
            <Mask cb={this.closeUserCard} zIndex={999}></Mask>
            <UserCard user={userInfo} closeCard={this.closeUserCard} openChat={this.openPrivateChat} deleteFriend={() => {this.deleteFriend(admin.id, userInfo.id)}} addFriend={() => {this.addFriend(admin.id, userInfo.id)}}></UserCard>
          </div> : null
        }
        {
          groupInfo ? 
          <div>
            <Mask cb={this.closeGroupCard} zIndex={999}></Mask>
            <GroupCard group={groupInfo} openChat={() => (this.openGroupChat(groupInfo))} closeCard={this.closeGroupCard} joinGroup={() => {this.joinGroup(admin.id, groupInfo.id)}} quitGroup={() => {this.quitGroup(admin.id, groupInfo.id)}}></GroupCard>
          </div> : null
        }
      </div>
    )
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    friends: state.friends,
    groups: state.groups,
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
    joinGroup: (group) => {
      dispatch(Actions.joinGroup(group));
    },
    quitGroup: (groupId) => {
      dispatch(Actions.quitGroup(groupId));
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(Group));