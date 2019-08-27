import React, {Component} from 'react';
import styles from './SingleUser.scss';

class SingleUser extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.avatarList = []
  }

  render() {
    const {clickCB} = this.props;
    return (
      <div className='single-user' onClick={clickCB}>
        <div className='avatar-wrapper'></div>
        <div className='name-wrapper'>
          {this.props.name}
        </div>
      </div>
    )
  }
}

export default SingleUser;