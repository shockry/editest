import React, { Component } from 'react';
import '../css/Toolbar.css';

class Toolbar extends Component {
  render() {
    return (
      <div className="toolbar">
        <span className="toolbar-item">Mosaic</span>
        <span className="toolbar-item">Retro</span>
      </div>
    );
  }
}

export default Toolbar;
