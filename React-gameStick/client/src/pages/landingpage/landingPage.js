import React, { Component } from 'react';
import GameChoice from './gamechoice/gameChoice.js';
import UserName  from './gamechoice/userName.js';
import './landingPage.css';

class LandingPage extends Component {
  constructor(props){
    super(props);
    console.log(props)
    this.props.user.socket.on('game',(msg)=>{
      console.log(msg);
    })
  }

  componentWillMount(){
    this.setState({ view : <GameChoice joinGameView = { this.joinGameView.bind(this)} startGameView = {this.startGameView.bind(this)} user = { this.props.user }/> })
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
        <h6>{ this.state.user.roomCode }</h6>
        <button onClick={ ()=>{ this.props.user.socket.emit('getGameCode',this.state.user.roomCode) } } className="btn"> Everyone has started. </button>
      </div>
    )
  }

  startGameView(){
    this.props.user.startNewGame()
    this.props.user.socket.on('newRoomCode',(msg)=>{
      console.log('in',msg.roomCode)
      console.log(this.props.user.roomCode)
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
    this.setState({user : this.props.user });
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
