
import React, { Component } from 'react';
import '../css/Popover.css';

class MenuItemWithPopover extends Component {


  render() {
    return (
      <div className="toolbar-item" onClick={this.props.onClick} id={this.props.id}>
        {this.props.label}
        <div className={this.props.active? "popover popover-active": "popover"}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

export default MenuItemWithPopover;
