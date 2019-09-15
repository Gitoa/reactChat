import React, {Component} from 'react';
import Mask from 'base/Mask/Mask.js';
import style from './CreateGroup.scss';

class CreateGroup extends Component {
  constructor() {
    super();
    this.confirm = this.confirm.bind(this);
    this.nameRef = React.createRef();
    this.noticeRef = React.createRef();
  }

  confirm() {
    let name = this.nameRef.current.value.trim();
    if (name.length < 1) {
      console.log('群组名不应为空')
    } else {
      this.props.confirm({
        name,
        notice: this.noticeRef.current.value,
      })
    }
  }

  render() {
    return (
      <div className='create-group-wrapper'>
        <Mask cb={this.props.cancel}></Mask>
        <div className='window-wrapper'>
          <div className='tag-wrapper'>
            <p>创建群组</p>
            <p onClick={this.props.cancel}>X</p>
          </div>
          <form className='info-wrapper'>
            <label htmlFor='group-name'>群名</label><input id='group-name' type='text' placeholder='不超过12个字符' ref={this.nameRef}></input><br/>
            <label htmlFor='group-slogan'>群公告</label><input id='group-notice' type='text' placeholder='不超过100个字符' ref={this.noticeRef}></input>
          </form>
          <div className='button-wrapper'>
            <span className='confirm-button' onClick={() => {this.confirm()}}>确认</span>
            <span className='cancel-button' onClick={this.props.cancel}>取消</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateGroup;