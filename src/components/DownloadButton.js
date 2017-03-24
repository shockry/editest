import React, { Component } from 'react';
import downloadIcon from '../icons/downloadIcon.svg';

class DownloadButton extends Component {
  constructor(props) {
   super(props);

   this.downloadImage = this.downloadImage.bind(this);
   // refs
   this.imagedownloader = null;
 }
  render() {
    return (
      <div className="right">
        <a className="hiddenInput" ref={input => {this.imagedownloader = input;}}/>
        <button type="button" onClick={this.downloadImage}>
          <img className="button-icon" src={downloadIcon} alt="upload icon"/>
          <span className="button-text">Download</span>
        </button>
      </div>
    );
  }

  downloadImage(e) {
    if (this.props.canvas.hasImage) {
      const data = this.props.canvas.toDataURL();
      this.imagedownloader.href = data;
      this.imagedownloader.download = "bestest image";
      this.imagedownloader.click();
    }
  }

}

export default DownloadButton;
