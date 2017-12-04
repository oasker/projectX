import React, { Component } from 'react';
import io from 'socket.io-client';

import './App.css';

import SubmitView from './pages/mainView/submitView';
import PickingView from './pages/mainView/pickingView';
import LandingPage from './pages/landingpage/landingPage'
import User from './pages/User';

let socket = io.connect('http://localhost:4000');

// =============================================================================
// === Main View ===============================================================
// =============================================================================

class App extends Component {
  constructor(){
    super()
    this.user = new User(socket)
    this.view = <LandingPage user = { this.user }/>
    this.pickingView;
    this.submitView;
  }
  updateUser(user) {
    this.setState({user : user});
  }

  componentWillMount() {
    this.setState({
      user: this.user,
      view: this.view
    })
  }

  setUI(){
    if(this.state.user.isPicking){
      this.setState({ view : this.pickingView });
    }else{
      this.setState({ view : this.submitView });
    }
  }

  componentDidMount(){
    this.pickingView = <PickingView user = { this.state.user } updateUser = { this.updateUser.bind(this)}/>;
    this.submitView = <SubmitView user = { this.state.user } updateUser = { this.updateUser.bind(this)}/>;
    this.user.socket.on('gameHasStarted',(msg)=>{
      this.setUI();
    })
  }

  render() {
    return (
      <div>
        {
          this.state.view
        }
      </div>
    );
  }
}

export default App;
