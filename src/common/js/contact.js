import { throwStatement } from "@babel/types";

/*export default class ContactClass{
  constructor({time, target}) {
    this.type = target.type;
    this.name = target.name;
    this.create_time = time;
    this.avatar = target.avatar;
    this.id = target.id;
    this.target = target;
  }
}*/

export default class ContactClass {
  constructor({target}) {
    this.name = target.name;
    this.target = target;
    //this.type = target.type
    this.id = `contact_to_${target.id}`;
  }
}