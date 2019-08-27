import * as ActionTypes from '../../store/ActionTypes';
import * as Actions from '../../store/Actions';
import Store from '../../store/Store.js';

socket.on('msg', function(data) {
  console.log(data);
  Store.dispatch(Actions.add_message(data))
})
