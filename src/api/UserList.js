import {userData} from './testData';

import UserClass from 'common/js/user';

export function getUserList() {
  return userData.map((user) => {
    return new UserClass(user);
  });
}