export default class Message {
  constructor(fromUser, target, time, content, contentType) {
    this.senderName = fromUser.name;
    this.senderId = fromUser.id;
    this.senderAvatar = fromUser.avatar;
    this.receiverId = target.id;
    this.groupId = target.id;
    this.groupAvatar = target.avatar;
    this.groupName = target.name;
    this.sendTime = time;
    this.msgId = `message_from_${fromUser.id}_to_${target.type}_${target.id}_at_${time}`;
    this.status = {
      unread: true,
      send: 'sending'
    }
    this.msgContent = content;
    this.contentType = contentType;
    this.msgType = target.type;
  }
}