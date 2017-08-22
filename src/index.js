import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Chat from './Chat';
import createHistory from 'history/createBrowserHistory';
import {Router, Route, Switch, Redirect} from 'react-router-dom';

const history = createHistory();

function nicknameValid() {
  return history.location.state ? history.location.state.nickname : '';
}

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/chat" component={props =>
        nicknameValid(props) ? <Chat history={history} location={props.location}/> : <Redirect to="/"/>
      }/>
      <Route path="/" component={App}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

