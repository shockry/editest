import React, { Component } from 'react';
import '../css/Toolbar.css';
import MenuItemWithPopover from './MenuItemWithPopover';

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <MenuItemWithPopover label="Mosaic">
          <div className="inputContainer">
            <label>Width</label> <input type="number" min="1"></input>
          </div>
          <div className="inputContainer">
            <label>Height</label> <input type="number" min="1"></input>
          </div>
          <button>Go</button>
        </MenuItemWithPopover>
        <MenuItemWithPopover label="Retro">
          <div className="inputContainer">
            <label>Intensity</label> <input type="range" min="1"></input>
          </div>
          <button>Go</button>
        </MenuItemWithPopover>
      </div>
    );
  }

}

export default Toolbar;
