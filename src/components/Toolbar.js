import React, { Component } from 'react';
import '../css/Toolbar.css';
import EffectsToolbar from './EffectsToolbar';
import FiltersToolbar from './FiltersToolbar';


class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.toggleActive = this.toggleActive.bind(this);
   this.dismissAll = this.dismissAll.bind(this);

   this.state = {
     activeToolbarItem: null
   };
 }

  render() {
    // Every type of toolbar is going into its own file with its
    // own functionality details
    const menuItems = {
      Effects: <EffectsToolbar canvas={this.props.canvas}
                               originalImage={this.props.originalImage}
                               active={this.state.activeToolbarItem}
                               onClick={this.toggleActive}
                               hide={this.dismissAll}/>,

      Filters: <FiltersToolbar canvas={this.props.canvas} originalImage={this.props.originalImage}/>
    };

    const menu = menuItems[this.props.activeMainbarItem];

    return (
      <div className="toolbar">
        {menu}
      </div>
    );
  }

  toggleActive(e) {
    const item = e.target.dataset.label;
    this.setState((prevState) =>
                  ({activeToolbarItem: prevState.activeToolbarItem === item? null: item}));
    e.stopPropagation();
    e.preventDefault();
  }

  // Close all toolbar items
  dismissAll() {
    this.setState({activeToolbarItem: null});
  }

}

export default Toolbar;
