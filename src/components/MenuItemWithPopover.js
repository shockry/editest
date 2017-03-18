import React, { Component } from 'react';
import '../css/Popover.css';

class MenuItemWithPopover extends Component {
  render() {
    return (
      <div className="toolbar-item">
        <a href="#" onClick={this.props.onClick}>{this.props.label}</a>
        <div className={this.props.active? "popover popover-active": "popover"}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default MenuItemWithPopover;
