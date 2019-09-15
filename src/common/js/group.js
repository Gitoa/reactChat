export default class GroupClass {
  constructor({name, create_time, id, members, avatar}) {
    this.type = 'group';
    this.name = name;
    this.create_time = create_time;
    this.id = id;
    this.members = members;
    this.avatar = avatar;
  }

  sendMessages(message) { //群消息的分发由后台完成（前台完成，可能存在退群消息前端未即时接收更新，导致已退群人员接收消息）
    
  }
}