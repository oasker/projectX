import React, { Component } from 'react';
import GameChoice from './gamechoice/gameChoice.js';
import UserName  from './gamechoice/userName.js';
import './landingPage.css';

class LandingPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.setState({ view : <UserName/> })
  }

  setUserName(){

  }

  joinGame(msg){
    // join game
  }

  getStartGameView(){
    return (
      <div>
        <h4>Your Room Code is</h4>
        <h3>{ this.state.user.roomCode }</h3>
        <ul>
          Users in
          <li></li>
        </ul>
        <button onClick={ ()=>{ console.log('initiateGame') } } className="btn"> Everyone has started. </button>
      </div>
    )
  }

  startGameView(){
    this.props.user.startNewGame()
    this.props.user.socket.on('newRoomCode',(msg)=>{
      console.log('in')
      this.props.user.roomCode = msg.roomCode;
      this.setState( { view : this.getStartGameView() , user: this.state.user } );
    })
  }

  joinGameView(){
    this.setState( { view : this.getJoinView() } )
  }

  getRoomCodeVal(){
    console.log(document.getElementById('joinGameRoomCode').value);
    return document.getElementById('joinGameRoomCode').value;
  }

  getJoinView(){
    return (
      <div>
        <p>Enter Room Code</p>
        <input id='joinGameRoomCode' placeholder="Enter Room Code Here" className="landing-page-roomcode-input" type="text"></input>
        <br/>
        <button className="btn" onClick = { ()=>{ this.state.user.joinGame(this.getRoomCodeVal()) } } >Join Room</button>
      </div>
    )
  }

  componentDidMount(){
  }


  render() {
    return (
      <div className="landing-page-main-content">
        <div className="landing-page-pop-up text-center">
        <h1>Cards Against Hummanity</h1>
          <br/>
          {
            this.state.view
          }
        </div>
      </div>
    );
  }
}

export default LandingPage;
