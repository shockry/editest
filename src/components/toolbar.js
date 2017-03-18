import React, { Component } from 'react';
import '../css/Toolbar.css';
import MenuItemWithPopover from './MenuItemWithPopover';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.state = {active: null};

   this.toggleActive = this.toggleActive.bind(this);
 }

  render() {
    return (
      <div className="toolbar" onClick={this.toggleActive}>
        <MenuItemWithPopover label="Mosaic" id="0"
          active={this.state.active === "0"} onClick={this.toggleActive}>
          <div className="inputContainer">
            <label>Width</label> <input type="number" min="1"/>
          </div>
          <div className="inputContainer">
            <label>Height</label> <input type="number" min="1"/>
          </div>
          <button>Go</button>
        </MenuItemWithPopover>
        <MenuItemWithPopover label="Retro" id="1"
          active={this.state.active === "1"} onClick={this.toggleActive}>
          <div className="inputContainer">
            <label>Intensity</label> <input type="range" min="1"/>
          </div>
          <button>Go</button>
        </MenuItemWithPopover>
      </div>
    );
  }

  toggleActive(e) {
    e.persist();
    e.stopPropagation();
    this.setState((prevState) =>
                  ({active: prevState.active === e.target.id? null: e.target.id}));
  }

}

export default Toolbar;
