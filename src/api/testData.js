//手动输出测试数据。。。

var contactData = [
  {members: [], name: 'team1', time: '2019-06-30', messages: [{
    time: '2019-06-29', from: 'admin1', content: 'hello', status: 'unread'
  },{
    time: '2019-06-30', from: 'admin2', content: 'world', status: 'unread'
  }], avatar: '', type: 'team', id: 'test2'},
  {members: [], name: 'person1', time: '2019-06-18', messages: [{
    time: '2019-06-29', from: 'person1', content: 'nihao', status: 'unread'
  },{
    time: '2019-06-30', from: 'person2', content: 'shijie', status: 'unread'
  }], avatar: '', type: 'personal', id: 'test1'},
]

var teamData = [
  {
    members: [], name: 'team1', time: '2019-06-20', messages: [], avatar: '', id: 'test3'
  },
  {
    members: [], name: 'team2', time: '2019-06-11', messages: [], avatar: '', id: 'test4'
  }
]

var userData = [
  {
    name: 'tt', signup_time: '2019-08-20', avatar: '', id: 'user1'
  }
]

export {contactData, teamData, userData}