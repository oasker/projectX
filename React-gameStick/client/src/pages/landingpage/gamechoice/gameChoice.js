import React, { Component } from 'react';
class GameChoice extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = this.props;
  }

  checkUserName(){
    var userName = document.getElementById('userNameInput');
    if(userName.value !== ""){
      return true;
    } else {
      userName.style.border = "2px solid red";
      return false;
    }
  }

  render() {
    return (
        <div className="text-center">
          <button className="btn" onClick = { ()=>{ if(this.checkUserName){ this.props.setJoinGameComponent() } } } >Join Game</button>

          <br/>
          <button className="btn" onClick = { ()=>{ if(this.checkUserName){ this.props.setStartGameComponent() } } } >Start New Game</button>
        </div>
    );
  }
}

export default GameChoice;
