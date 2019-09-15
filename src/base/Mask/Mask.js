import React, { Component } from 'react';
import styles from './Mask.scss';

class Mask extends Component {
  constructor(props) {
    super(props);
    this.cb = this.cb.bind(this);
  }

  cb() {
    this.props.cb();
  }

  render() {
    return (
      <div className='mask' onClick={this.cb} style={{backgroundColor: this.props.bgColor, opacity: this.props.opacity, zIndex: this.props.zIndex}}>
      </div>
    )
  }
}

export default Mask;