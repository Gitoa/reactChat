import React, {Component} from 'react';
import styles from './Tag.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.clickTag = this.clickTag.bind(this);
  }
  render() {
    const {tagName, id, active} = this.props;
    return (
      <div onClick={this.clickTag} className={`tag ${active ? 'active' : ''}`}>
        <span className='tag-name'>{tagName}</span>
        <span className='close-button' onClick={this.close}>x</span>
      </div>
    )
  }
  close(event) {
    event.stopPropagation();
    this.props.closeTag();
  }
  clickTag() {
    this.props.clickTag();
  }
}

export default Tag;