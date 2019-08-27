//加入的群聊信息应该保存在服务器，每次从服务器拉取

//先用测试数据测试

import {teamData} from './testData';

import GroupClass from 'common/js/group';

import UserClass from 'common/js/user';

export function getGroupList() {
  let data = teamData;
  return data.map((item) => {
    return new GroupClass({...item, members: item.members.map((user) => {
      return new UserClass(user);
    })})
  })
}