import React, { Component } from 'react';
class GameChoice extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = this.props;
  }

  render() {
    return (
        <div className="text-center">
          <button className="btn" onClick = { ()=>{ this.props.setJoinGameComponent() } } >Join Game</button>
          <br/>
          <br/>
          <button className="btn" onClick = { ()=>{ this.props.setStartGameComponent() } } >Start New Game</button>
        </div>
    );
  }
}

export default GameChoice;
