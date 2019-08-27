

export default class Chat{
  constructor({target}) {
    this.name = target.name;
    this.target = target;
    this.id = target.type + '_' + target.name;
  }
}