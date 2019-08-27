export function loadMessage(user_id) {
  //根据用户id返回本地保存的所有聊天记录
  return {
    private_sasuke: [{
      from_user: {name: 'natuto', id: 'naruto'}, target: {}, id: 'from_naruto_to_sasuke_at_2019', status: '', create_time: '', content: '', content_type: '', msg_type: ''
    }, 
    {
      from_user: {name: 'naruto', id: 'naruto'}, target: {}, id: 'from_naruto_to_sasuke_at_2020', status: '', create_time: '', content: '', content_type: '', msg_type: ''
    }],
    private_naruto: [{
      from_user: {name: 'natuto', id: 'naruto'}, target: {}, id: 'from_naruto_to_naruto_at_2019', status: '', create_time: '', content: '', content_type: '', msg_type: ''
    }]
  }
}