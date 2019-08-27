export default class Message {
  constructor(from_user, target, time, content, content_type) {
    this.from_user = from_user;
    this.target = target;
    this.create_time = time;
    this.id = `message_from_${from_user.id}_to_${target.id}_at_${time}`;
    this.status = {
      unread: true,
      send: 'sending'
    }
    this.content = content;
    this.content_type = content_type;
    this.msg_type = target.type;
  }
}