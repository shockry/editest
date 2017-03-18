
import React, { Component } from 'react';
import '../css/Toolbar.css';
import '../css/Popover.css';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.state = {active: false, retroActive: false};

   this.toggleActive = this.toggleActive.bind(this);
   this.toggleRetroActive = this.toggleRetroActive.bind(this);
 }

  render() {
    return (
      <div className="toolbar">
        <div className="toolbar-item">
          <a href="#" onClick={this.toggleActive}>Mosaic</a>
          <div className={this.state.active? "popover popover-active": "popover"}>
            <div className="inputContainer">
              <label>Width</label> <input type="number" min="1"></input>
            </div>
            <div className="inputContainer">
              <label>Height</label> <input type="number" min="1"></input>
            </div>
            <button>Go</button>
          </div>
        </div>
        <div className="toolbar-item">
          <a href="#" onClick={this.toggleRetroActive}>Retro</a>
          <div className={this.state.retroActive? "popover popover-active": "popover"}>
            <div className="inputContainer">
              <label>Intensity</label> <input type="range" min="1"></input>
            </div>
            <button>Go</button>
          </div>
        </div>
      </div>
    );
  }

  toggleActive(e) {
    e.preventDefault();
    this.setState(prevState => ({active: !prevState.active}));
  }

  toggleRetroActive(e) {
    e.preventDefault();
    this.setState(prevState => ({retroActive: !prevState.retroActive}));
  }

}

export default Toolbar;
