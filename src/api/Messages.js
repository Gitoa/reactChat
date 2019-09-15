import Store from 'store/Store.js';

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