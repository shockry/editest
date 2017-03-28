import React, { Component } from 'react';
import './css/App.css';
import Topbar from './components/Topbar';
import { setVars } from './utils/sharedVars';
import { setCanvasToBlob } from './utils/canvasToBlob';

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {canvas: null};
   // refs
   this.canvas = null;
 }

 componentDidMount() {
   this.setState({canvas: this.canvas});
   setCanvasToBlob(); // A polyfill for canvas.toBlob if not present
   setVars({canvas: this.canvas});
 }

  render() {
    return (
      <div>
        <Topbar className="topbar" canvas={this.state.canvas}/>
        <div className="preview">
          <canvas className="drawingArea"
                  ref={canvas => {this.canvas = canvas;}}>
          </canvas>
        </div>
      </div>
    );
  }

}

export default App;
