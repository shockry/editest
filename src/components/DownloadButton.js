import React, { Component } from 'react';
import downloadIcon from '../icons/downloadIcon.svg';

class DownloadButton extends Component {
  constructor(props) {
   super(props);

   this.downloadImage = this.downloadImage.bind(this);
   this.downloadCanvasBlob = this.downloadCanvasBlob.bind(this);
   this.revokeURL = this.revokeURL.bind(this);
   // refs
   this.imagedownloader = null;
 }
  render() {
    return (
      <div className="right">
        <a className="hiddenInput" ref={input => {this.imagedownloader = input;}}
          onClick={this.revokeURL}/>
        <button type="button" onClick={this.downloadImage}>
          <img className="button-icon" src={downloadIcon} alt="upload icon"/>
          <span className="button-text">Download</span>
        </button>
      </div>
    );
  }

  downloadImage(e) {
    if (this.props.canvas.hasImage) {
      this.props.canvas.toBlob(this.downloadCanvasBlob, 'image/png');
    }
  }

  downloadCanvasBlob(blob) {
    this.imagedownloader.href = URL.createObjectURL(blob);
    this.imagedownloader.download = "bestest image";
    this.imagedownloader.click();
  }

  revokeURL() {
    // requestAnimationFrame makes the browser prepare the file for download
    // before revoking the URL
    requestAnimationFrame(() => URL.revokeObjectURL(this.imagedownloader.href));
  }

}

export default DownloadButton;
