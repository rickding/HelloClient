import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'antd/lib/button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Hello React. To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Button type="primary">Button Hello</Button>
      </div>
    );
  }
}

export default App;
