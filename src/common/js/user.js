export default class UserClass {
  constructor({time, name, avatar, id, information}) {
    this.type = 'private';
    this.create_time = time;
    this.name = name;
    this.avatar = avatar;
    this.id = id;
    this.information = information;
  }

  sendMessage(message) {

  }
}