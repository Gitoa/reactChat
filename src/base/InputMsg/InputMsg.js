import React, {Component} from 'react';
import styles from './InputMsg.scss';

class InputMsg extends Component {
  constructor(props) {
    super(props);
    this.msg = 'default';
    this.changeMsg = this.changeMsg.bind(this);
  }

  changeMsg(event) {
    this.msg = event.target.value
  }

  render() {
    const {sendMsg} = this.props;
    return (
      <div className='input-msg-wrapper'>
        <div className='input-box-wrapper'><input type='text' placeholder='请输入～' onChange={this.changeMsg}/></div>
        <div className='submit-button' onClick={()=>{sendMsg(this.msg)}}>发送</div>
      </div>
    )
  }
}

export default InputMsg;