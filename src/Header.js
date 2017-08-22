import React, {Component} from 'react';
import logo from './logo.svg';

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2>Chat App</h2>
      </div>
    );
  }
}

export default Header;