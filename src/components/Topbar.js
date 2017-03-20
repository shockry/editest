import React, { Component } from 'react';
import filtersIcon from '../icons/filtersIcon.svg';
import effectsIcon from '../icons/effectsIcon.svg';
import UploadButton from './UploadButton';
import DownloadButton from './DownloadButton';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <UploadButton canvas={this.props.canvas}/>
        <div className="middle navbar-container">
          <div className="menu-item menu-item-active">
            <img src={effectsIcon} alt="effects"></img>
            <span>Effects</span>
          </div>
          <div className="menu-item menu-item-disabled">
            <img src={filtersIcon} alt="effects"></img>
            <span>Filters</span>
          </div>
        </div>

        <DownloadButton canvas={this.props.canvas}/>
      </div>
    );
  }

}

export default Topbar;
