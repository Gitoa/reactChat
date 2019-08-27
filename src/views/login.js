import React, { Component } from 'react';

class Login extends Component {
  constructor(...args) {
    super(...args);
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  render() {
    return (
      <div id='main'>
        <form class='signin' action='/signin'>
          <input class='username' type='text' placeholder='your name' name='name'/>
          <input class='password' type='password' placeholder='your password' name='password'/>
          <div class='submit' onClick={this.signin}>submit</div>
        </form>
        <div class='signin'>NO ACCOUNT? SIGN UP</div>
        <form class='signup' action='/signup'>
          <input class='username' type='text' placeholder='your name' name='name'/>
          <input class='password' type='password' placeholder='your password' name='password'/>
          <input type='password' placeholder='repeat your password' class='repeatPassword' name='repeatPassword'/>
          <div class='submit' onClick={this.singup}>submit</div>
        </form>
        <div class='signup'>HAVE ACCOUNT? SIGN IN</div>
      </div>
    )
  }

  signin() {
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
          if (ack.result) {
            console.log('登录成功');
            //接下来进行页面跳转
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
}

export default Login;