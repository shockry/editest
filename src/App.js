import React, { Component } from 'react';
import './css/App.css';
import Topbar from './components/Topbar';
import { setVars } from './utils/sharedVars';
import { setCanvasToBlob } from './utils/canvasToBlob';

class App extends Component {
  constructor(props) {
   super(props);

   this.toggleShowOriginal = this.toggleShowOriginal.bind(this);

   this.state = {canvas: null, originalImage: null};
   // refs
   this.canvas = null;
   this.originalImage = null;
 }

 componentDidMount() {
   this.setState({canvas: this.canvas, originalImage: this.originalImage});
   setCanvasToBlob(); // A polyfill for canvas.toBlob if not present
   setVars({canvas: this.canvas});
 }

  render() {
    return (
      <div>
        <Topbar className="topbar" canvas={this.state.canvas} imgElement={this.originalImage}/>
        <div className="preview">
          <canvas className="drawingArea canvas" onMouseOver={this.toggleShowOriginal}
                  onTouchStart={this.toggleShowOriginal}
                  onTouchEnd={this.toggleShowOriginal}
                  ref={canvas => {this.canvas = canvas;}}>
          </canvas>
          <img className="drawingArea hiddenImg" alt="original"
               onMouseLeave={this.toggleShowOriginal}
               ref={img => {this.originalImage = img;}}>
          </img>
        </div>
      </div>
    );
  }

  toggleShowOriginal(e) {
    if (this.canvas.hasImage) {
      e.preventDefault();
      this.originalImage.classList.toggle('hiddenImg');
    }
  }

}

export default App;
