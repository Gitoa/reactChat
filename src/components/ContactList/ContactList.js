import React, {Component} from 'react';
import SingleContact from 'base/SingleContact/SingleContact';
import {connect} from 'react-redux';
import ContactClass from 'common/js/contact.js';
import {getContact} from 'api/ContactList';
import * as Actions from 'store/Actions.js';
import style from './ContactList.scss';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.contactList = getContact(props.admin.id);
  }

  render() {
    const {openChat, messages} = this.props;
    return(
      <ul className='contact-list'>
        {this.contactList.map((item, index) => {
          return (
            <li key={index}>
              <SingleContact avatar={item.avatar} time={item.time} name={item.name} lastMessage={messages[item.id] ? messages[item.id].slice(-1)[0] : {}} clickCB={() => {openChat(item)}}></SingleContact>
            </li>
          )
        })}
      </ul>
    )
  }
}

function mapDispatch(dispatch, ownProps) {
  return {
    openChat: (chat) => {
      dispatch(Actions.open_chat(chat))
    }
  }
}

function mapState(state, ownProps) {
  return {
    admin: state.admin,
    messages: state.messages,
  }
}

export default connect(mapState, mapDispatch)(Contact);