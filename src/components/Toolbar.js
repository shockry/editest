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
   this.updateTileDimensions = this.updateTileDimensions.bind(this);

   this.state = {
     active: null,
     tileWidth: 10,
     tileHeight: 10,
     retrosize: 5,
     sync: true
   };
 }

  render() {
    const menuItems = [
      {
        label: "Mosaic",
        under: "Effects",
        content:
        <div className="popover-form">
          <div>
            <label className="popover-form-label">Width</label>
            <input value={this.state.tileWidth} type="number" min="1"
                   inputMode="numeric" name="tileWidth" onChange={this.updateTileDimensions}/>
          </div>
          <div>
            <label className="popover-form-label">Height</label>
            <input value={this.state.tileHeight} type="number" min="1"
                   name="tileHeight" onChange={this.updateTileDimensions}/>
          </div>
          <div>
            <label htmlFor="sync" className="popover-form-label">Sync</label>
            <input checked={this.state.sync} type="checkbox"
                   name="sync" id="sync" onChange={this.handleInput}/>
          </div>
          <button name="mosaic" onClick={this.handleImageEffects}>Go</button>
        </div>
      },
      {
        label: "Retro",
        under: "Effects",
        content:
        <div className="popover-form">
          <div>
            <label className="popover-form-label">Intensity</label>
            <input type="range" name="retrosize" value={this.state.retrosize}
                   onChange={this.handleInput} min="5"/>
            <label className="numberViewer">{this.state.retrosize}</label>
          </div>
          <button name="retro" onClick={this.handleImageEffects}>Go</button>
        </div>
      }
    ];

    //First extract relevant menu items, then make a menu from them
    const selectedMenuItems = menuItems.filter((item) => item.under === this.props.active);

    const menu = selectedMenuItems.map((item) => (
      <MenuItemWithPopover label={item.label} key={item.label}
        active={this.state.active === item.label} onClick={(e) => this.toggleActive(e, item.label)}>
        {item.content}
      </MenuItemWithPopover>
    ));

    return (
      <div className="toolbar">
        {menu}
      </div>
    );
  }

  toggleActive(e, item) {
    this.setState((prevState) =>
                  ({active: prevState.active === item? null: item}));
    e.stopPropagation();
    e.preventDefault();
  }

  updateTileDimensions(e) {
    const value = parseInt(e.target.value, 10);
    const name = e.target.name;
    this.setState((prevState) => {
      if (prevState.sync) {
        return {tileWidth: value, tileHeight: value};
      } else {
        return {[name]: value};
      }
    });
  }

  handleInput(e) {
    let value;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = parseInt(e.target.value, 10);
    }
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
