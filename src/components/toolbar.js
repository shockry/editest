import React, { Component } from 'react';
import '../css/Toolbar.css';

class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.state = {active: false};

   this.toggleActive = this.toggleActive.bind(this);
 }

  render() {
    return (
      <div className="toolbar">
        <div className="toolbar-item">
          <a href="#" onClick={this.toggleActive}>Mosaic</a>
          <div className={this.state.active? "popover popover-active": "popover"}>
            <div className="inputContainer"><label>Width:</label> <input type="number" min="1"></input></div>
          <div className="inputContainer"><label>Height:</label> <input type="number" min="1"></input></div>
          <div><button>Go</button></div>
          </div>
        </div>
        <div className="toolbar-item">Retro</div>
      </div>
    );
  }

  toggleActive(e) {
    e.preventDefault();
    this.setState(prevState => ({active: !prevState.active}));
  }

}

export default Toolbar;
