import React, {Component} from 'react';
import style from './ContextMenu.scss';

class ContextMenu extends Component {
  constructor() {
    super()
  }

  render() {
    let contexts = this.props.contexts || [];
    return (
      <div className='context-menu-wrapper'>
        <ul>
          {
            contexts.map(item => {
              return (
                <li className='context-menu-item' style={item.innerStyle} onClick={item.handler}>{item.text}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default ContextMenu;