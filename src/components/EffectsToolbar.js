import React, { Component } from 'react';
import MenuItemWithPopover from './MenuItemWithPopover';
import imagePreprocessor from '../image_operations/effects/imagePreprocessor';


class EffectsToolbar extends Component {
  constructor(props) {
   super(props);

   this.handleInput = this.handleInput.bind(this);
   this.handleImageEffects = this.handleImageEffects.bind(this);
   this.updateTileDimensions = this.updateTileDimensions.bind(this);

   this.state = {
     tileWidth: 10,
     tileHeight: 10,
     retrosize: 5,
     sync: true
   };
 }

 render() {
   const menuItems = [
     {
       label: "Mosaic",
       content:
       <div className="popover-form">
         <div>
           <label className="popover-form-label">Width</label>
           <input value={this.state.tileWidth} type="number" min="1"
                  inputMode="numeric" name="tileWidth" onChange={this.updateTileDimensions}/>
         </div>
         <div>
           <label className="popover-form-label">Height</label>
           <input value={this.state.tileHeight} type="number" min="1"
                  name="tileHeight" onChange={this.updateTileDimensions}/>
         </div>
         <div>
           <label htmlFor="sync" className="popover-form-label">Sync</label>
           <input checked={this.state.sync} type="checkbox"
                  name="sync" id="sync" onChange={this.handleInput}/>
         </div>
         <button name="mosaic" onClick={this.handleImageEffects}>Go</button>
       </div>
     },
     {
       label: "Retro",
       content:
       <div className="popover-form">
         <div>
           <label className="popover-form-label">Intensity</label>
           <input type="range" name="retrosize" value={this.state.retrosize}
                  onChange={this.handleInput} min="5"/>
           <label className="numberViewer">{this.state.retrosize}</label>
         </div>
         <button name="retro" onClick={this.handleImageEffects}>Go</button>
       </div>
     }
   ];

   const menu = menuItems.map((item) => (
     <MenuItemWithPopover label={item.label} key={item.label}
       active={this.props.active === item.label} onClick={this.props.onClick}>
       {item.content}
     </MenuItemWithPopover>
   ));

   return (
     <div>
       {menu}
     </div>
   )
 }

 updateTileDimensions(e) {
   const value = e.target.value;
   const name = e.target.name;
   this.setState((prevState) => {
     if (prevState.sync) {
       return {tileWidth: value, tileHeight: value};
     } else {
       return {[name]: value};
     }
   });
 }

 handleInput(e) {
   let value;
   if (e.target.type === "checkbox") {
     value = e.target.checked;
   } else {
     value = e.target.value;
   }
   const name = e.target.name;
   this.setState({[name]: value});
 }

 handleImageEffects(e) {
   if (this.props.canvas.hasImage) {
     this.props.hide(); // Close popover

     const effectType = e.target.name;

     const tileDimensions = {
              width: this.state.tileWidth,
              height: this.state.tileHeight
            };

     if (effectType === 'retro') {
       tileDimensions.width = this.state.retrosize;
       tileDimensions.height = this.state.retrosize;
     }

     imagePreprocessor.processImage(effectType, tileDimensions);
   }
 }
}

export default EffectsToolbar;
