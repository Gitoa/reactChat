import {userData} from './testData';

import UserClass from 'common/js/user';

export function getFriendList() {
  return userData.map((user) => {
    return new UserClass(user);
  });
}