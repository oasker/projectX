import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import Black from './pages/mainView/blackCard';
import User from './pages/User';

let socket = io.connect('http://localhost:4000');


class App extends Component {
  updateUser(user) {
    this.setState({user : user})
  }
  constructor() {
    super();
  }
  componentWillMount() {
    this.setState({
      user: new User(socket)
    })
  }

  render() {
    return (
      <div>
        <Black user = { this.state.user } updateUser = { this.updateUser.bind(this) }></Black>
      </div>
    );
  }
}

export default App;
