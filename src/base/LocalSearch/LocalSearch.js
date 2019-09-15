import React, {Component} from 'react';
import {localSerch, onlineSearch} from 'api/search.js';
import {debounce} from 'common/js/utils.js';
import style from './LocalSearch.scss';

class LocalSearch extends Component {
  constructor() {
    super();
    this.searchInput = React.createRef();
    this.changeKeyword = debounce(this.changeKeyword, 100).bind(this);
  }

  changeKeyword() {
    let keyword = this.searchInput.current.value;
    this.props.changeKeyword(keyword);
  }

  render() {
    return (
      <div className='local-search'>
        <div className='iconfont search-icon'>
          <i className='icon-search' />
        </div>
        <input className='search-box' placeholder='搜索用户/群' onChange={this.changeKeyword} ref={this.searchInput}></input>
        <div className='iconfont add-icon' onClick={this.props.add}>
          <i className='icon-plus'/>
        </div>
      </div>
    )
  }
}

export default LocalSearch;