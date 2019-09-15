import ContactClass from 'common/js/contact.js';
import GroupClass from 'common/js/group.js';
import UserClass from 'common/js/user.js';
import Store from 'store/Store.js';

let local_contact = [
  {
    name: 'sasuke',
    id: 2,
    avatar: '',
    slogan: 'naruto',
    type: 'private',
  },
  {
    name: 'global',
    id: 1,
    create_time: '',
    avatar: '',
    type: 'group',
  }
]

export function getLocalContact(adminId) {
  //此处获得近期聊天人列表，该信息是保存在本地还是服务器（服务器只保存加入的群聊信息，个人好友（不提供该功能))

  //近期聊天记录和聊天人信息保存在本地LocalStorage

  //应该保存在redux中，之后实现

  //根据当前登录用户的id获得对应的最近联系人
  let admin = Store.getState().admin;
  let id = (adminId || admin.id);
  let localSave = JSON.parse(localStorage.getItem(id));
  let contacts = [];
  if(localSave && localSave.contacts) {
    contacts = localSave.contacts;
  }
  return contacts;
}

export function saveLocalContact(adminId) {
  let state = Store.getState();
  let {contacts, admin} = state;
  let id = (adminId || admin.id)
  let localSave = {};
  let localData = JSON.parse(localStorage.getItem(id));
  localData && (localSave = localData);
  Object.assign(localSave, {contacts});
  localStorage.setItem(id, JSON.stringify(localSave));  
}