import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Topbar from './components/Topbar';

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {canvas: null};
   // refs
   this.canvas = null;
 }

 componentDidMount() {
   this.setState({canvas: this.canvas});
 }

  render() {
    return (
      <div>
        <Topbar className="topbar" canvas={this.state.canvas}/>

        <Toolbar canvas={this.state.canvas}/>
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
