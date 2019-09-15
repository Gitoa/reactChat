import React, {useState, useEffect} from 'react';
import SingleContact from 'base/SingleContact/SingleContact.js';
import SingleUser from 'base/SingleUser/SingleUser.js';
import SingleGroup from 'base/SingleGroup/SingleGroup.js';
import {localSearch, onlineSearch} from 'api/search.js';
import {wrapPromise} from 'common/js/utils.js';
import * as Actions from 'store/Actions.js';
import {connect} from 'react-redux';
import style from './SearchResultList.scss';

function SearchResultList(props) {

  const [localSearchResult, setLocalSearchResult] = useState({contactResult:[], friendResult:[], groupResult:[]});
  const [onlineSearchResult, setOnlineSearchResult] = useState({userResult:[], groupResult:[]});
  const [showLocalUser, setShowLocalUser] = useState(true);
  const [showLocalGroup, setShowLocalGroup] = useState(true);

  useEffect(() => {
    let keyword = props.keyword;
    let localResult = localSearch(keyword);
    console.log(localResult);
    let onlineResult = onlineSearch(keyword);
    let wrappedPromise = wrapPromise(onlineResult);
    setLocalSearchResult(localResult);
    wrappedPromise.promise.then((data) => {
      console.log(data);
      let {userOfKeyword: userResult, groupOfKeyword: groupResult} = data;
      setOnlineSearchResult({userResult, groupResult});
    }).catch((err) => {
      console.log(err);
    })
    return function cancelSearch() {
      wrappedPromise.cancel()
    }
  }, [props.keyword, showLocalGroup, showLocalUser]);


  const emptyTemplate = (<p className='empty-wrapper'>暂无内容~</p>);

  return (
    <div className='search-result-wrapper'>
      <p className='tagName'>最近联系人</p>
      <div className='contact-result-wrapper'>
        {localSearchResult.contactResult.length > 0 ? 
          (<ul>
            {
              localSearchResult.contactResult.map((item, index) => {
                let chatId = item.type + '_' + item.id;
                console.log(chatId);
                return (
                  <li key={index}>
                    <SingleContact chatId={chatId} avatar={item.avatar} time={item.time} name={item.name} clickCB={() => {props.openChat(item)}}></SingleContact>
                  </li>
                )
              })
            }
          </ul>) : emptyTemplate 
        }
      </div>
      <p className='tagName'>{showLocalUser ? '本地好友' : '所有用户'}</p>
      <div className='friend-result-wrapper'>
        {
          showLocalUser ? <div className='local-friend-result'>
            {localSearchResult.friendResult.length > 0 ? 
              (<ul>
                {
                  localSearchResult.friendResult.map((item, index) => {
                    return (
                      <li key={index}>
                        <SingleUser user={item} clickCB={() => {props.openChat(item)}}></SingleUser>
                      </li>
                    )
                  })
                }
              </ul>) : emptyTemplate
            }
            <p className='toggle-wrapper' onClick={() => setShowLocalUser(false)}>在线查询结果</p>
          </div> : <div className='online-user-result'>
            {onlineSearchResult.userResult.length > 0 ? 
              (<ul>
                {
                  onlineSearchResult.userResult.map((item, index) => {
                    return (
                      <li key={index}>
                        <SingleUser user={item} clickCB={() => {props.showOnlineUserCard(Object.assign({type: 'private'}, item))}}></SingleUser>
                      </li>
                    )
                  })
                }
              </ul>) : emptyTemplate
            }
            <p className='toggle-wrapper' onClick={() => setShowLocalUser(true)}>本地查询结果</p>
          </div>
        }
      </div>
      <p className='tagName'>{showLocalGroup ? '我的群组' : '所有群组'}</p>
      <div className='group-result-wrapper'>
        {
          showLocalGroup ? <div className='local-group-result'>
            {localSearchResult.groupResult.length > 0 ? 
              (<ul>
                {
                  localSearchResult.groupResult.map((item, index) => {
                    return(
                      <li key={index}>
                        <SingleGroup name={item.name} clickCB={() => {props.openChat(item)}}></SingleGroup>
                      </li>
                    )
                  })
                }
              </ul>) : emptyTemplate
            }
            <p className='toggle-wrapper' onClick={() => setShowLocalGroup(false)}>在线查询结果</p>
          </div> : <div className='online-group-result'>
            {onlineSearchResult.groupResult.length > 0 ? 
              (<ul>
                {
                  onlineSearchResult.groupResult.map((item, index) => {
                    return (
                      <li key={index}>
                        <SingleGroup name={item.name} clickCB={() => {props.showOnlineGroupCard(Object.assign({type: 'group'}, item))}}></SingleGroup>
                      </li>
                    )
                  })
                }
              </ul>) : emptyTemplate
            }
            <p className='toggle-wrapper' onClick={() => setShowLocalGroup(true)}>本地查询结果</p>
          </div>
        }
      </div>
    </div>
  )
}

function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.openChat(chat))
      dispatch(Actions.readAllMessage(chat.type + '_' + chat.id))
    }
  }
}

export default connect(null, mapDispatch)(SearchResultList);