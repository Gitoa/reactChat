import React, {Component} from 'react';
import styles from './InputMsg.scss';

class InputMsg extends Component {
  constructor(props) {
    super(props);
    this.msg = 'default';
    this.inputNode = null;
    this.changeMsg = this.changeMsg.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.refInput = this.refInput.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
  }

  changeMsg(event) {
    this.msg = event.target.value
  }

  sendMsg() {
    this.props.sendMsg(this.msg);
    this.inputNode.value = '';
  }

  refInput(node) {
    this.inputNode = node;
  }

  keyUpHandler(e) {
    if(e.keyCode === 13) {
      this.sendMsg()
    }
  }

  render() {
    return (
      <div className='input-msg-wrapper'>
        <div className='input-box-wrapper'><input type='text' placeholder='请输入～' onChange={this.changeMsg} ref={this.refInput} onKeyUp={this.keyUpHandler}/></div>
        <div className='submit-button' onClick={this.sendMsg}>发送</div>
      </div>
    )
  }
}

export default InputMsg;