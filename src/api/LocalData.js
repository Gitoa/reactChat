import Store from 'store/Store.js';

export function getLocalData(adminId) {
  let admin = Store.getState().admin;
  let id = (adminId || admin.id);
  let localData = localStorage.getItem(id);
  return localData;
}

export function saveLocalData(adminId) {
  let state = Store.getState();
  let admin = state.admin;
  let id = (adminId || admin.id);
  let localData = localStorage.getItem(id);
  localData || (localData = {});
  Object.assign(localData, state);
  localStorage.setItem(id, localData);
}

export function clearLocalData(adminId) {
  let id = (adminId || Store.getState().admin.id);
  localStorage.removeItem(id);
}