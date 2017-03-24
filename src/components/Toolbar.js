import React, { Component } from 'react';
import '../css/Toolbar.css';
import EffectsToolbar from './EffectsToolbar';


class Toolbar extends Component {
  constructor(props) {
   super(props);

   this.toggleActive = this.toggleActive.bind(this);

   this.state = {
     active: null
   };
 }

  render() {
    // Every type of toolbar is going into its own file with its
    // own functionality details
    const menuItems = {
      Effects: <EffectsToolbar canvas={this.props.canvas} active={this.state.active}
                               onClick={this.toggleActive}/>
    };

    const menu = menuItems[this.props.active];

    return (
      <div className="toolbar">
        {menu}
      </div>
    );
  }

  toggleActive(e) {
    const item = e.target.dataset.label;
    this.setState((prevState) =>
                  ({active: prevState.active === item? null: item}));
    e.stopPropagation();
    e.preventDefault();
  }

}

export default Toolbar;
