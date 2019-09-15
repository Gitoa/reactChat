export default class UserClass {
  constructor({signup_time, name, avatar, id, slogan}) {
    this.type = 'private';
    this.signup_time = signup_time;
    this.name = name;
    this.avatar = avatar;
    this.id = id;
    this.slogan = slogan;
  }

  sendMessage(message) {

  }
}