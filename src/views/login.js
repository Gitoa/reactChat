import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as Actions from '../store/Actions.js';
import config from 'common/js/config.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  signin() {
    let {initAdmin, initFriendList, initGroupList, history} = this.props;
    const URL = config.serverURL;
    let name = document.querySelector('.signin .username').value;
    let password = document.querySelector('.signin .password').value;
    if (name.trim() === '') {
      console.log('用户名为空');
      return;
    }
    //发送表单
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
          //根据返回信息判断登录是否成功
          let ack = JSON.parse(xhr.responseText);
          console.log(ack)
          if (ack.result) {
            console.log('登录成功');
            initAdmin(ack.admin);
            initFriendList(ack.friends.map(item => Object.assign(item, {type: 'private'})));
            initGroupList(ack.groups.map(item => Object.assign(item, {type: 'group'})));
            socket.emit('disconnect');
            /*socket = io.connect('http://localhost:3031');
            socket.on('connect_confirm', function (data) {
              console.log(data);
              socket.emit('config_init', { userId: ack.admin.id });
            });*/
            //接下来进行页面跳转
            history.push('/');
          } else {
            console.log('登录失败:', ack.msg);
          }
          //页面跳转
        }
      }
    }
    xhr.open('post', '/signin', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name,
      password,
    }))
  }

  signup() {
    const URL = config.serverURL;
    let user = document.querySelector('.signup .username').value;
    if (user.trim() === '') {
      console.log('用户名为空');
      return
    }
    //对密码判断，长度，两次输入是否一致
    let password = document.querySelector('.signup .password').value;
    let repeatPassword = document.querySelector('.signup .repeatPassword').value;
    if (password.length < 5 || password.length > 20) {
      console.log('密码长度问题');
      return
    }
    if (password !== repeatPassword) {
      console.log('两次输入不一致');
      return
    }
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          //根据后台返回结果判断
          console.log(xhr.responseText);
        }
      }
    }
    xhr.open('post', '/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name: user,
      password,
    }))
  }

  render() {
    return (
      <div id='main'>
        <p>SIGN IN</p>
        <form className='signin'>
          <input className='username' type='text' placeholder='your name' name='name'/>
          <input className='password' type='password' placeholder='your password' name='password'/>
          <div className='submit' onClick={this.signin}>submit</div>
        </form>
        <div className='signin'>NO ACCOUNT? SIGN UP</div>
        <p>SIGN UP</p>
        <form className='signup'>
          <input className='username' type='text' placeholder='your name' name='name'/>
          <input className='password' type='password' placeholder='your password' name='password'/>
          <input type='password' placeholder='repeat your password' className='repeatPassword' name='repeatPassword'/>
          <div className='submit' onClick={this.signup}>submit</div>
        </form>
        <div className='signup'>HAVE ACCOUNT? SIGN IN</div>
      </div>
    )
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    initAdmin: (admin) => {
      console.log('setAdmin :', admin);
      dispatch(Actions.setAdmin(admin));
    },
    initFriendList: (friendList) => {
      dispatch(Actions.setFriendList(friendList));
    },
    initGroupList: (groupList) => {
      dispatch(Actions.setGroupList(groupList));
    }
  }
}

export default connect(null, mapDispatch)(Login);