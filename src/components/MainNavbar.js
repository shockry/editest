import React, { Component } from 'react';
import filtersIcon from '../icons/filtersIcon.svg';
import effectsIcon from '../icons/effectsIcon.svg';
import MenuItemIconAbove from './MenuItemIconAbove';


class MainNavbar extends Component {
  render() {
    return (
      <div className="middle navbar-container">
        <MenuItemIconAbove className="menu-item-active"
                           icon={effectsIcon} alt="effects"
                           label="Effects"/>
        <MenuItemIconAbove className="menu-item-disabled"
                           icon={filtersIcon} alt="filters"
                           label="Filters"/>
      </div>
    );
  }

}

export default MainNavbar;
