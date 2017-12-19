import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar/navBar.js';
import Home from './pages/home/index.js';

class App extends Component {
  constructor(){
    super();
    this.view = "test";
  }
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Home/>
      </div>
    );
  }
}

export default App;
