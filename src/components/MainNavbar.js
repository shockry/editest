import React, { Component } from 'react';
import filtersIcon from '../icons/filtersIcon.svg';
import effectsIcon from '../icons/effectsIcon.svg';
import MenuItemIconAbove from './MenuItemIconAbove';
import Toolbar from './Toolbar';


class MainNavbar extends Component {
  constructor(props) {
   super(props);

   this.activateMenu = this.activateMenu.bind(this);

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
      disabled: false
      }
    ];

    const menu = menuItems.map((item) => {
      return <MenuItemIconAbove
                        className={item.disabled? "menu-item-disabled":
                          this.state.currentItem === item.label? "menu-item-active": ""}
                        icon={item.icon} alt={item.alt}
                        label={item.label} currentItem={this.state.currentItem}
                        key={item.label} disabled={item.disabled}
                        onClick={this.activateMenu}/>
    });

    return (
      <div>
        <div className="middle">
          {menu}
        </div>
        <Toolbar canvas={this.props.canvas}
          activeMainbarItem={this.state.currentItem}/>
      </div>
    );
  }

  activateMenu(e) {
    const item = e.currentTarget.dataset;
    if (item.disabled === "false") {
      this.setState({currentItem: item.label});
    }
  }

}

export default MainNavbar;
