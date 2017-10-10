import React, {Component} from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import LoggedUsers from './LoggedUsers';
import { Well , ListGroup, ListGroupItem, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import './css/Chat.css';

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
    this.socket.emit('sendMessage', this.state.userMessages, (data) => { /* onSuccess */ });
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
        <LoggedUsers socket={this.socket}/>
        <div className="chat-area">
          <ListGroup>
          <Well>
            {messages.map((message, index) => <ListGroupItem bsStyle='info' key={index}>{message}</ListGroupItem>)}
          </Well>
          </ListGroup>
        </div>
        <Form inline>
          <FormGroup controlId="textToSend">
          <ControlLabel>{nickname}</ControlLabel>
          {' '}
          <FormControl type="text" placeholder="diga algo" id="textToSend" onChange={this.changeMessage} value={userMessages}/>
          </FormGroup>
          {' '}
          <Button onClick={this.sendMessage}>Enviar</Button>
        </Form>
      </div>
    );
  }
}

export default Chat;
