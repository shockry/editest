import React, { Component } from 'react';

class DownloadButton extends Component {
  constructor(props) {
   super(props);

   this.downloadImage = this.downloadImage.bind(this);
   // refs
   this.imagedownloader = null;
 }
  render() {
    return (
      <div className="right navbar-container">
        <a className="hiddenInput" ref={input => {this.imagedownloader = input;}}/>
        <button type="button" onClick={this.downloadImage}> Download </button>
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
