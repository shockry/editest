import React, { Component } from 'react';
import '../css/MenuItemIconAbove.css';


class MenuItemIconAbove extends Component {
  render() {
    return (
      <div className={`menu-item ${this.props.className}`} onClick={this.props.onClick}>
        <img src={this.props.icon} alt={this.props.alt}></img>
        <span>{this.props.label}</span>
      </div>
    );
  }

}

export default MenuItemIconAbove;
