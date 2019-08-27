import ContactClass from 'common/js/contact.js';
import GroupClass from 'common/js/group.js';
import UserClass from 'common/js/user.js';

let local_contact = [
  {
    name: 'zt234',
    id: `contact_from_tt123_to_zt234`,
    target: {
      id: 'zt234',
      type: 'user',
    }
  },
  {
    name: 'room1233',
    id:`contact_from_tt123_to_room1233`,
    target: {
      id: 'room1233',
      type: 'group',
    }
  }
]

export function getContact(admin_id) {
  //此处获得近期聊天人列表，该信息是保存在本地还是服务器（服务器只保存加入的群聊信息，个人好友（不提供该功能))

  //近期聊天记录和聊天人信息保存在本地LocalStorage

  //应该保存在redux中，之后实现

  //根据当前登录用户的id获得对应的最近联系人

  return local_contact;
}