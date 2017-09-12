import React, {Component} from 'react';


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
      <div>
        <p>Users</p>
        <ul>
          {Object.keys(loggedUsers).map((loggedUser, index) => <li key={index}>{loggedUser}</li>)}
        </ul>
      </div>
    );
  }
}

export default LoggedUsers;
