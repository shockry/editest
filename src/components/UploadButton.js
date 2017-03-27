import React, { Component } from 'react';
import { setVars } from '../utils/sharedVars';
import uploadIcon from '../icons/uploadIcon.svg';

class UploadButton extends Component {
  constructor(props) {
   super(props);

   this.triggerUpload = this.triggerUpload.bind(this);
   this.drawImage = this.drawImage.bind(this);
   // refs
   this.imageInput = null;
 }
  render() {
    return (
      <div className="left">
        <input className="hiddenInput" type="file"
               accept="image/*" id="image-picker"
               ref={input => {this.imageInput = input;}}
               onChange={this.drawImage}>
        </input>
        <button type="button" onClick={this.triggerUpload}>
          <img className="button-icon" src={uploadIcon} alt="upload icon"/>
          <span className="button-text">Upload</span>
        </button>
      </div>
    );
  }

  triggerUpload() {
    this.imageInput.click();
  }

  drawImage(e) {
    const file = this.imageInput.files[0];
    const imageType = /^image\//;
    const isImage = file && imageType.test(file.type);

    if (this.imageInput.files.length === 1 && isImage) {
      const canvas = this.props.canvas;

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = function() {
        URL.revokeObjectURL(this.src);
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(this, 0, 0);
        canvas.hasImage = true;

        setVars({originalImage: this});
      };
    }
  }

}

export default UploadButton;
