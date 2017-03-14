import React, { Component } from 'react';
import filtersIcon from './icons/filtersIcon.svg';
import effectsIcon from './icons/effectsIcon.svg';
import './App.css';
import Toolbar from './components/toolbar'

class App extends Component {
  render() {
    return (
      <div>
        <div className="topbar">
          <div className="left navbar-container">
            <button type="button"> Upload </button>
          </div>

          <div className="middle navbar-container">
            <div className="menu-item menu-item-active">
              <img src={effectsIcon} alt="effects"></img>
              <span>Effects</span>
            </div>
            <div className="menu-item menu-item-disabled">
              <img src={filtersIcon} alt="effects"></img>
              <span>Filters</span>
            </div>
          </div>

          <div className="right navbar-container">
            <button type="button"> Download </button>
          </div>
        </div>

        <Toolbar></Toolbar>
      </div>
    );
  }
}

export default App;
