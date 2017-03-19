import React, { Component } from 'react';
import filtersIcon from './icons/filtersIcon.svg';
import effectsIcon from './icons/effectsIcon.svg';
import './App.css';
import Toolbar from './components/Toolbar';
import {setVars} from './sharedVars';

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {canvas: null};

   this.triggerUpload = this.triggerUpload.bind(this);
   this.drawImage = this.drawImage.bind(this);
   // refs
   this.imageInput = null;
   this.canvas = null;
 }
  render() {
    return (
      <div>
        <div className="topbar">
          <div className="left navbar-container">
            <input className="hiddenInput" type="file"
                   accept="image/*" id="image-picker"
                   ref={input => {this.imageInput = input;}}
                   onChange={this.drawImage}>
            </input>
            <button type="button" onClick={this.triggerUpload}> Upload </button>
          </div>

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

          <div className="right navbar-container">
            <button type="button"> Download </button>
          </div>
        </div>

        <Toolbar canvas={this.state.canvas}/>
        <div className="preview">
          <canvas className="drawingArea"
                  ref={canvas => {this.canvas = canvas;}}>
          </canvas>
        </div>
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
      const canvas = this.canvas;

      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = function() {
        URL.revokeObjectURL(this.src);
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(this, 0, 0);

        setVars({originalImage: this});
      };

      this.setState({canvas});
    }
  }

}

export default App;
