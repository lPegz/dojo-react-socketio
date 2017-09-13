import React, {Component} from 'react';
import './App.css';
import Header from './Header';
import {stylesheet} from 'react-bootstrap'
import {Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: ''
    };
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <p>
          <label>Nickname: </label>
          <input type="text" id="nickname" onChange={e => this.setState({nickname: e.target.value})}/>
          <Link to={{
            pathname: '/chat',
            state: {nickname: this.state.nickname}
          }}>Entrar</Link>
        </p>
      </div>
    );
  }
}

export default App;
