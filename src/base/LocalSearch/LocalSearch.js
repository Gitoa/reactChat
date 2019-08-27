import React, {Component} from 'react';
import style from './LocalSearch.scss';

class LocalSearch extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='local-search'>
        <div className='iconfont search-icon'>
          <i className='icon-search' />
        </div>
        <input className='search-box' placeholder='搜索用户/群'></input>
        <div className='iconfont add-icon'>
          <i className='icon-plus'/>
        </div>
      </div>
    )
  }
}

export default LocalSearch;