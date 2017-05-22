import React, { Component } from 'react';
import '../css/Topbar.css';
import UploadButton from './UploadButton';
import DownloadButton from './DownloadButton';
import MainNavbar from './MainNavbar';

class Topbar extends Component {
  constructor(props) {
   super(props);

   this.setOriginalImage = this.setOriginalImage.bind(this);

   this.state = {
     originalImage: null
   };
  }
  render() {
    return (
      <div className="topbar">
        <UploadButton canvas={this.props.canvas} imgElement={this.props.imgElement} setOriginalImage={this.setOriginalImage}/>
        <DownloadButton canvas={this.props.canvas}/>
        <MainNavbar canvas={this.props.canvas} originalImage={this.state.originalImage}/>
      </div>
    );
  }

  setOriginalImage(img) {
    this.setState({originalImage: img});
  }

}

export default Topbar;
