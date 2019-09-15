import Store from 'store/Store.js';

function localSearch(keyword) {
  console.log(keyword);
  let {contacts, friends, groups} = Store.getState();
  let contactResult = contacts.filter((item) => {
    return (item.name.indexOf(keyword) > -1);
  })
  let friendResult = friends.filter((item) => {
    return (item.name.indexOf(keyword) > -1);
  })
  let groupResult = groups.filter((item) => {
    return (item.name.indexOf(keyword) > -1);
  })
  
  return {
    contactResult,
    friendResult,
    groupResult,
  }
}

function onlineSearch(keyword) {
  const URL = "/search?keyword=" + encodeURIComponent(keyword);
  return new Promise((resolve, reject) => {
    fetch(URL).then(response => {
      if (response.ok || response.status === 304) {
        response.json().then(data => {
          resolve(data);
        }).catch(err => reject(err))
      }
      else {
        throw new Error('Network response was not ok');
      }
    }).catch(err => reject(err))
  })
}

export {localSearch, onlineSearch}