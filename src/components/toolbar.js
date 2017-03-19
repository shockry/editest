import React, { Component } from 'react';
import '../css/Toolbar.css';
import MenuItemWithPopover from './MenuItemWithPopover';
import imagePreprocessor from '../imagePreprocessor';
import {setVars} from '../sharedVars';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.handleInput = this.handleInput.bind(this);
   this.photoMosaic = this.photoMosaic.bind(this);

   this.state = {
     active: null,
     tileWidth: 10,
     tileHeight: 10
   };
 }

  render() {
    return (
      <div className="toolbar">
        <MenuItemWithPopover label="Mosaic"
          active={this.state.active === 0} onClick={(e) => this.toggleActive(e, 0)}>
          <div className="inputContainer">
            <label>Width</label>
            <input value={this.state.tileWidth} type="number" min="1"
                  name="tileWidth" onChange={this.handleInput}/>
          </div>
          <div className="inputContainer">
            <label>Height</label>
            <input value={this.state.tileHeight} type="number" min="1"
                  name="tileHeight" onChange={this.handleInput}/>
          </div>
          <button onClick={this.photoMosaic}>Go</button>
        </MenuItemWithPopover>
        <MenuItemWithPopover label="Retro"
          active={this.state.active === 1} onClick={(e) => this.toggleActive(e, 1)}>
          <div className="inputContainer">
            <label>Intensity</label> <input type="range" min="1"/>
          </div>
          <button>Go</button>
        </MenuItemWithPopover>
      </div>
    );
  }

  toggleActive(e, i) {
    this.setState((prevState) =>
                  ({active: prevState.active === i? null: i}));
    e.stopPropagation();
    e.preventDefault();
  }

  handleInput(e) {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    this.setState({[name]: value});
  }

  photoMosaic(e) {
    if (this.props.canvas) {
      this.setState({active: null});
      setVars({TILE_WIDTH: this.state.tileWidth, TILE_HEIGHT: this.state.tileHeight,
               canvas: this.props.canvas});
      imagePreprocessor.processImage();
    }
  }
}

export default Toolbar;
