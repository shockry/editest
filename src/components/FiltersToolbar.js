import React, { Component } from 'react';
import imageProcessor from '../image_operations/filters/imageProcessor';


class FiltersToolbar extends Component {
  constructor(props) {
   super(props);

   this.handleImageFilters = this.handleImageFilters.bind(this);

   this.state = {
     activeFilter: null
   };
 }

 render() {
   const menuItems = [
     {
       label: "Grayscale",
       functionality: "GrayScale"
     },
     {
       label: "Sepia",
       functionality: "Sepia"
     },
     {
       label: "Negative",
       functionality: "Negative"
     }
   ];

   const menu = menuItems.map((item) => (
     <div className={this.state.activeFilter === item.functionality?
                      "toolbar-item toolbar-item-active":"toolbar-item"}
          key={item.label}>
       <a href="#" data-function={item.functionality}>{item.label}</a>
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
    const filterType = e.target.dataset.function;
    if (filterType) {
      this.setState({activeFilter: filterType});
      imageProcessor.processImage(filterType, this.props.originalImage, this.props.canvas);
    }
   }
 }
}

export default FiltersToolbar;
