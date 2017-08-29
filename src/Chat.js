import React, {Component} from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: props.location.state ? props.location.state.nickname : '',
      messages: [],
      userMessages: ''
    };

      this.changeMessage = this.changeMessage.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.socket = io('ws://localhost:3001', {
      path: '/ws/chat',
      query: {
        user: this.state.nickname
      }
    });
    this.socket.on('user connected', ({userLoggedMsg}) => this.setState({
      messages: [...this.state.messages, userLoggedMsg]
    }));

    this.socket.on('myMessage', (data) => this.setState({
      messages: [...this.state.messages, data]
    }));
  }



  sendMessage(e) {
    console.log(this.state.userMessages);
    this.socket.emit('sendMessage', this.state.userMessages, (data) => { console.log(data) });
  }

  changeMessage(e) {
    e.preventDefault();
    this.setState({userMessages: e.target.value});
  }

  render() {
    const {nickname, messages, userMessages} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Chat App - {nickname}</h2>
        </div>
        <div className="chat-area">
          <ul>
            {messages.map((message, index) => <li key={index}>{message}</li>)}
          </ul>
        </div>
        <p>
          <input type="text" id="textToSend" onChange={this.changeMessage} value={userMessages}/>
          <button onClick={this.sendMessage}>Enviar</button>
        </p>
      </div>
    );
  }
}

export default Chat;
