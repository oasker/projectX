import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import Black from './pages/mainView/blackCard';
import User from './pages/User';
import Mainview from './pages/mainView/mainView'

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

  setUI(){
    if(this.state.user.isPicking){
      return <Mainview user = { this.state.user } updateUser = { this.updateUser.bind(this)}/>
    }else{
      return <Black user = { this.state.user } updateUser = { this.updateUser.bind(this) }></Black>
    }
  }

  componentDidMount(){
    let client = prompt("Choose a user name.");
    this.state.user.userName = client;
    this.setState({ user : this.state.user})
    socket.emit('addUserName',client);
  }

  render() {
    return (
      <div>
       { this.setUI() }
      </div>
    );
  }
}

export default App;
