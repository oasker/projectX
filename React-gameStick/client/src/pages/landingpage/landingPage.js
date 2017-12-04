import React, { Component } from 'react';
import GameChoice from './gamechoice/gameChoice.js';
import UserName  from './gamechoice/userName.js';
import './landingPage.css';

class LandingPage extends Component {
  constructor(props){
    super(props);
    this.userNameField;
    this.gameCodeField;
  }

  componentWillMount(){
    this.setState({ view : <GameChoice setJoinGameComponent = { this.setJoinGameComponent.bind(this)} setStartGameComponent = {this.setStartGameComponent.bind(this)} user = { this.props.user }/> })
  }

  componentDidMount(){
    this.setState({user : this.props.user });
    this.userNameField = document.getElementById('userNameInput');
    this.gameCodeField = document.getElementById('gameCodeField');
  }

  //============================================================================
  //=== Start New Game =========================================================
  //============================================================================

  startGameComponent(){
    return (
      <div>
        <h4>Your Room Code is</h4>
        <h6>{ this.state.user.roomCode }</h6>
        <button onClick={ ()=>{ this.initGame() } } className="btn"> Everyone has started. </button>
      </div>
    )
  }

  setStartGameComponent(){
    this.props.user.startNewGame(); // send event to server
    this.startGameEvents(); // initialize event listners to hand start game event
  }

  startGameEvents(){
    this.props.user.socket.on('newRoomCode',(msg)=>{
      this.props.user.roomCode = msg.roomCode; // recieve roomCode from server
      this.setState( { view : this.startGameComponent() , user: this.props.user } );
    })
  }

  //============================================================================
  //=== JoinGame Game =========================================================
  //============================================================================

  joinGameComponent(){
    return (
      <div>
        <p>Enter Room Code</p>
        <input id='joinGameRoomCode' placeholder="Enter Room Code Here" className="landing-page-roomcode-input" type="text"></input>
        <br/>
        <button className="btn" onClick = { ()=>{  } } >Join Room</button>
      </div>
    )
  }

  setJoinGameComponent(){
    this.setState( { view : this.joinGameComponent() } )
  }

  getRoomCodeVal(){
    return document.getElementById('joinGameRoomCode').value;
  }

  joinGameInit(){
    if( this.userNameIsSet()){
      this.setUserName();
      this.props.user.joinGame(this.getRoomCodeVal());
      this.initGame();
    } else {
      alert("Set UserName First You Fucking Idiot");
    }
  }

  //============================================================================
  //=== Begin Game =========================================================
  //============================================================================

  initGame(){
    this.setUserName();
    this.props.user.socket.emit('getGameCode');//,this.state.user.roomCode);
    this.props.user.socket.emit('startGame',this.state.user.roomCode);
  }

  userNameIsSet(){
    return document.getElementById();
  }

  setUserName(){
    this.props.user.userName = document.getElementById('userNameInput');
    this.setState({user : this.props.user});
  }

  render() {
    return (
      <div className="landing-page-main-content">
        <div className="landing-page-pop-up text-center container">
          <h1>Cards Against Hummanity</h1>
          <UserName/>
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
