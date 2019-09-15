import Store from 'store/Store.js';

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

export function clearLocalContact(adminId) {
  let admin = Store.getState();
  let id = (adminId || admin.id);
  let localData = JSON.parse(localStorage.getItem(id));
  Object.assign(localData, []);
  localStorage.setItem(id, JSON.stringify(localData));
}

export function getLocalMsg(adminId) {
  let state = Store.getState();
  let admin = state.admin;
  let id = (adminId || admin.id);
  let localData = JSON.parse(localStorage.getItem(id));
  let localMsg = {};
  if(localData && localData.messages) {
    localMsg = localData.messages;
  }
  return localMsg;
}

export function saveLocalMsg(adminId) {
  let state = Store.getState();
  let admin = state.admin;
  let id = (adminId || admin.id);
  let messages = (state.messages || {});
  let localData = JSON.parse(localStorage.getItem(id));
  Object.assign(localData, {messages});
  localStorage.setItem(id, JSON.stringify(localData));
}

export function clearLocalMessage(adminId) {
  let admin = Store.getState().admin;
  let id = (adminId || admin.id);
  let localData = JSON.parse(localStorage.getItem(id));
  Object.assign(localData, {messages: {}});
  localStorage.setItem(id, JSON.stringify(localData));
}

export function clearLocalData(adminId) {
  let admin = Store.getState().admin;
  let id = (adminId || admin.id);
  localStorage.setItem(id, JSON.stringify({
    contacts: [],
    messages: {},
  }))
}