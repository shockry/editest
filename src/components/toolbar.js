import React, { Component } from 'react';
import '../css/Toolbar.css';
import MenuItemWithPopover from './MenuItemWithPopover';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.state = {active: null};
 }

  render() {
    return (
      <div className="toolbar">
        <MenuItemWithPopover label="Mosaic"
          active={this.state.active === 0} onClick={(e) => this.toggleActive(e, 0)}>
          <div className="inputContainer">
            <label>Width</label> <input type="number" min="1"/>
          </div>
          <div className="inputContainer">
            <label>Height</label> <input type="number" min="1"/>
          </div>
          <button>Go</button>
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

}

export default Toolbar;
