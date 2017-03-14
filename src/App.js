import React, { Component } from 'react';
import filtersIcon from './icons/filtersIcon.svg';
import effectsIcon from './icons/effectsIcon.svg';
import './App.css';
import Toolbar from './components/toolbar'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="menu-item menu-item-active">
            <div className="img"> <img src={effectsIcon} alt="effects"></img></div>
            <span>Effects</span>
          </div>
          <div className="menu-item">
            <div className="img"> <img src={filtersIcon} alt="effects"></img></div>
            <span>Filters</span>
          </div>
        </nav>
        <Toolbar></Toolbar>
      </div>
    );
  }
}

export default App;
