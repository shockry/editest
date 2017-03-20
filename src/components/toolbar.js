import React, { Component } from 'react';
import '../css/Toolbar.css';
import MenuItemWithPopover from './MenuItemWithPopover';
import imagePreprocessor from '../imagePreprocessor';
import {setVars} from '../sharedVars';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.handleInput = this.handleInput.bind(this);
   this.handleImageEffects = this.handleImageEffects.bind(this);

   this.state = {
     active: null,
     tileWidth: 10,
     tileHeight: 10,
     retrosize: 5
   };
 }

  render() {
    let menu;
    if (this.props.active === "Effects") {
      menu = (
        <div>
          <MenuItemWithPopover label="Mosaic"
            active={this.state.active === 0} onClick={(e) => this.toggleActive(e, 0)}>
            <div className="inputContainer">
              <label>Width</label>
              <input value={this.state.tileWidth} type="number" min="1"
                     inputMode="numeric" name="tileWidth" onChange={this.handleInput}/>
            </div>
            <div className="inputContainer">
              <label>Height</label>
              <input value={this.state.tileHeight} type="number" min="1"
                    name="tileHeight" onChange={this.handleInput}/>
            </div>
            <button name="mosaic" onClick={this.handleImageEffects}>Go</button>
          </MenuItemWithPopover>

          <MenuItemWithPopover label="Retro"
            active={this.state.active === 1} onClick={(e) => this.toggleActive(e, 1)}>
            <div className="inputContainer">
              <label>Intensity</label>
              <input type="range" name="retrosize" value={this.state.retrosize}
                     onChange={this.handleInput} min="5"/>
                   <label className="numberViewer">{this.state.retrosize}</label>
            </div>
            <button name="retro" onClick={this.handleImageEffects}>Go</button>
          </MenuItemWithPopover>
        </div>
      );
    }

    return (
      <div className="toolbar">
        {menu}
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

  handleImageEffects(e) {
    if (this.props.canvas.hasImage) {
      this.setState({active: null});

      switch (e.target.name) {
        case "mosaic":
          setVars({TILE_WIDTH: this.state.tileWidth,
                   TILE_HEIGHT: this.state.tileHeight,
                   canvas: this.props.canvas});
          break;

        case "retro":
          setVars({TILE_WIDTH: this.state.retrosize,
                   TILE_HEIGHT: this.state.retrosize,
                   canvas: this.props.canvas});
          break;

        default:
          console.log("noop");
      }

      const effectType = e.target.name;
      imagePreprocessor.processImage(effectType);
    }
  }
}

export default Toolbar;
