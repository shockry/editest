import React, { Component } from 'react';
import filtersIcon from '../icons/filtersIcon.svg';
import effectsIcon from '../icons/effectsIcon.svg';
import '../css/MainNavbar.css';
import MenuItemIconAbove from './MenuItemIconAbove';
import Toolbar from './Toolbar';


class MainNavbar extends Component {
  constructor(props) {
   super(props);

   this.state = {currentItem: "Effects"};
 }

  render() {
    const menuItems = [
      {
       icon: effectsIcon,
       alt: "effects",
       label: "Effects",
       disabled: false
     },
     {
      icon: filtersIcon,
      alt: "filters",
      label: "Filters",
      disabled: true
      }
    ];

    const menu = menuItems.map((item) => {
      return <MenuItemIconAbove
                        className={item.disabled?"menu-item-disabled": "menu-item-active"}
                        icon={item.icon} alt={item.alt}
                        label={item.label} currentItem={this.state.currentItem}
                        key={item.label}
                        onClick={(e) => this.activateMenu(e, item)}/>
    });

    return (
      <div>
        <div className="middle navbar-container">
          {menu}
        </div>
        <Toolbar canvas={this.props.canvas} active={this.state.currentItem}/>
      </div>
    );
  }

  activateMenu(e, item) {
    if (!item.disabled) {
      this.setState({currentItem: item.label});
    }
  }

}

export default MainNavbar;
