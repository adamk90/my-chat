import React, {Component} from 'react';
import './App.css';
import Login from './Login';
import {Main} from './Main';
import {proxy} from './Proxy';

class App extends Component<{}, {loggedIn: boolean}>
{
  state = {loggedIn: false};
  constructor(props) {
    super(props);
    proxy.addEventListener("login", this.loginCallback);
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <Main /> : <Login />}
      </div>
    );
  }

  loginCallback = () => {
    this.setState({loggedIn: true});
  }
}

export default App;
