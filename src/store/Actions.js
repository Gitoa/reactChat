import * as ActionTypes from './ActionTypes';

export const open_chat = (chat) => {
  return {
    type: ActionTypes.OPEN_CHAT,
    chat: chat
  }
}

export const close_chat = (chat_id) => {
  return {
    type: ActionTypes.CLOSE_CHAT,
    id: chat_id
  }
}

export const change_chat = (new_chat_id) => {
  return {
    type: ActionTypes.CHANGE_CHAT,
    id: new_chat_id,
  }
}

export const load_message = (user_id) => {
  return {
    type: ActionTypes.LOAD_MESSAGE,
    admin_id: user_id,
  }
}

export const add_message = (msg) => {
  return {
    type: ActionTypes.ADD_MESSAGE,
    target_id: msg.msg_type + '_' + msg.target.id,
    msg
  }
}

export const update_message = (msg) => {
  return {
    type: ActionTypes.UPDATE_MESSAGE,
    target_id: msg.msg_type + '_' + msg.target.id,
    msg,
  }
}

export const delete_message = (msg) => {
  return {
    type: ActionTypes.DELETE_MESSAGE,
    target_id: msg.msg_type + '_' + msg.target.id,
    msg
  }
}

export const save_message = (msg) => {
  return {
    type: ActionTypes.SAVE_MESSAGE,
    target_id: msg.msg_type + '_' + msg.target.id,
  }
}

export const clear_message = (target_id) => {
  return {
    type: ActionTypes.CLEAR_MESSAGE,
    target_id,
  }
}