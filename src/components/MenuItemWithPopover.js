
import React, { Component } from 'react';
import '../css/Popover.css';

class MenuItemWithPopover extends Component {
  constructor(props) {
   super(props);

   this.state = {active: false};

   this.toggleActive = this.toggleActive.bind(this);
 }

  render() {
    return (
      <div className="toolbar-item">
        <a href="#" onClick={this.toggleActive}>{this.props.label}</a>
        <div className={this.state.active? "popover popover-active": "popover"}>
          {this.props.children}
        </div>
      </div>
    );
  }

  toggleActive(e) {
    e.preventDefault();
    this.setState(prevState => ({active: !prevState.active}));
  }

}

export default MenuItemWithPopover;
