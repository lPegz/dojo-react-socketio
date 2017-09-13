import React, {Component} from 'react';
import { ListGroup , ListGroupItem } from 'react-bootstrap'
import './css/LoggedUsers.css'

class LoggedUsers extends Component {
  constructor(props){
    super(props);
    this.socket = props.socket;
    this.state = {
      loggedUsers  : {}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.socket = nextProps.socket;
    console.log("componentWillReceiveProps ", this.socket);
    if(this.socket) {
      this.socket.on('logged users', (loggedUsers) => {
        this.setState({loggedUsers: loggedUsers});
        console.log("Received users: ", loggedUsers);
      });
    }
  }

  render() {
    const {loggedUsers} = this.state;
    console.log("Render: ", loggedUsers);
    console.log("Object ", Object.keys(loggedUsers));
    return (
      <div className="box">
        <ListGroup>
        <ListGroupItem active>Users</ListGroupItem>
          {Object.keys(loggedUsers).map((loggedUser, index) => <ListGroupItem bsStyle="info" key={index}>{loggedUser}</ListGroupItem>)}
        </ListGroup>
      </div>
    );
  }
}

export default LoggedUsers;
