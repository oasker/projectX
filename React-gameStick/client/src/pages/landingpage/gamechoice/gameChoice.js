import React, { Component } from 'react';
class GameChoice extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = this.props;
  }

  checkUserName(){
    var userName = document.getElementById('userName');
    if(userName.value !== ""){
      return true;
    } else {
      userName.style.border = "2px solid red";
      return false;
    }
    console.log("test")
  }

  render() {
    return (
        <div className="text-center">
          <br/>
          <button className="btn" onClick = { ()=>{ if(this.checkUserName){ this.props.joinGameView() } } } >Join Game</button>
          <br/>
          <br/>
          <button className="btn" onClick = { ()=>{ if(this.checkUserName){ this.props.startGameView() } } } >Start New Game</button>
        </div>
    );
  }
}

export default GameChoice;
