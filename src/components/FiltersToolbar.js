import React, { Component } from 'react';
import imagePreprocessor from '../image_operations/imagePreprocessor';
import {setVars} from '../utils/sharedVars';


class FiltersToolbar extends Component {
  constructor(props) {
   super(props);

   this.handleImageFilters = this.handleImageFilters.bind(this);

  //  this.state = {
  //    tileWidth: 10,
  //    tileHeight: 10,
  //    retrosize: 5,
  //    sync: true
  //  };
 }

 render() {
   const menuItems = [
     {
       label: "GrayScale"
     },
     {
       label: "Sepia"
     },
     {
       label: "Negative"
     }
   ];

   const menu = menuItems.map((item) => (
     <div className="toolbar-item" key={item.label}>
       <a href="#" data-function={item.label}>{item.label}</a>
     </div>
   ));

   return (
     <div onClick={this.handleImageFilters}>
       {menu}
     </div>
   )
 }

 handleImageFilters(e) {
   if (this.props.canvas.hasImage) {
  //    this.props.hide(); // Close popover
    const filterType = e.target.dataset.function;
    setVars({canvas: this.props.canvas});

  //   switch (filterType) {
  //     case "GrayScale":
  //
  // //      case "mosaic":
  // //        setVars({TILE_WIDTH: this.state.tileWidth,
  // //                 TILE_HEIGHT: this.state.tileHeight,
  // //                 canvas: this.props.canvas});
  // //        break;
  //  //
  // //      case "retro":
  // //        setVars({TILE_WIDTH: this.state.retrosize,
  // //                 TILE_HEIGHT: this.state.retrosize,
  // //                 canvas: this.props.canvas});
  // //        break;
  //  //
  // //      default:
  // //        console.log("noop");
  //   }
   //
  //    const effectType = e.target.name;
     imagePreprocessor.processImage(filterType, "filters");
   }
 }
}

export default FiltersToolbar;
