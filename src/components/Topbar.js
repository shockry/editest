import React, { Component } from 'react';
import UploadButton from './UploadButton';
import DownloadButton from './DownloadButton';
import MainNavbar from './MainNavbar';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <UploadButton canvas={this.props.canvas}/>
        <DownloadButton canvas={this.props.canvas}/>
        <MainNavbar canvas={this.props.canvas}/>
      </div>
    );
  }

}

export default Topbar;
