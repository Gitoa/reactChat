import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Zone from 'components/ZoneList/ZoneList';
import Contact from 'components/ContactList/ContactList';
import GroupList from 'components/GroupList/GroupList';
import UserList from 'components/UserList/UserList';

const Routes = () => (
  <div className='group-route-wrapper'>
    <Route path='/contact' component={Contact}></Route>
    <Route path='/group' component={GroupList}></Route>
    <Route path='/recommend' component={Zone}></Route>
    <Route path='/user' component={UserList}></Route>
  </div>
);

export default Routes;