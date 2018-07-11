import React, { Component } from 'react';
import logo from './logo.svg';
import CreateContact from './CreateContact'
//import Component name from './components/name'
        //at the bottom of this additional component, export default name
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <CreateContact/>
      </div>
    );
  }
}

export default App;
