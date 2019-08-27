import React, {Component} from 'react';
import LocalSearch from 'base/LocalSearch/LocalSearch';
//import Routes from 'router/Routes.js';
import styles from './Group.scss';
import {Route} from 'react-router-dom';
import Zone from 'components/ZoneList/ZoneList';
import ContactList from 'components/ContactList/ContactList';
import GroupList from 'components/GroupList/GroupList';
import UserList from 'components/UserList/UserList';

class Group extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='group'>
        <div className='local-search-wrapper'>
          <LocalSearch></LocalSearch>
        </div>
        <div className='list-wrapper'>
            <Route path='/contact' component={ContactList}></Route>
            <Route path='/group' component={GroupList}></Route>
            <Route path='/recommend' component={Zone}></Route>
            <Route path='/user' component={UserList}></Route>
        </div>       
      </div>
    )
  }
}

export default Group;