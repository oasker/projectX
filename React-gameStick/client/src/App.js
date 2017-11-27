import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

import SubmitView from './pages/mainView/submitView';
import PickingView from './pages/mainView/pickingView';
import User from './pages/User';

import LandingPage from './pages/landingpage/landingPage'

let socket = io.connect('http://localhost:4000');

class App extends Component {
  updateUser(user) {
    this.setState({user : user})
  }
  componentWillMount() {
    this.setState({
      user: new User(socket)
    })
  }

  setUI(){
    if(this.state.user.isPicking){
      return <PickingView user = { this.state.user } updateUser = { this.updateUser.bind(this)}/>
    }else{
      return <SubmitView user = { this.state.user } updateUser = { this.updateUser.bind(this) }/>
    }
  }

  componentDidMount(){
    // let client = prompt("Choose a user name.");
    // this.state.user.userName = client;
    // this.setState({ user : this.state.user})
    // socket.emit('addUserName',client);
  }

  render() {
    return (
      <div>
        <LandingPage user = { this.state.user }/>
      </div>
    );
  }
}

export default App;
