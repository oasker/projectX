import React, { Component } from 'react';
import StatusBar from './statusbar/statusBar.js';
import Card from './cardModule/cardModule.js';
import './pickingView.css';

// White Card and Black Card will be absracted out later

class PickingView extends Component {

  //============================================================================
  //=== Setup ==================================================================
  //============================================================================

  constructor(props){
    super(props);
    this.cardArray = [];
    this.usersSubmitted = [];
    this.setUpSocketEventHandlers();
  }

  componentDidMount(){
    this.setState({ user : this.props.user});
    this.props.updateUser(this.props.user)
  }

  setUpSocketEventHandlers(){
    //=== Socket Events ========================================================
    this.user.socket.on("userRecievedCard", msg =>{
      this.cardRecived(msg);
    })
    //=== User is sent card to pick from =======================================

  }

  //============================================================================
  //=== Data Manipulation ======================================================
  //============================================================================

  randomizeCards(){

  }

  //============================================================================
  //=== Setup ==================================================================
  //============================================================================

  render() {
    return (
      <div >
        <StatusBar/>

        <div id="whiteCard" className="white-card-container white-card">
          <h4 id="whiteCardLabel">{ this.user.deck.whiteCard }</h4>
        </div>

      </div>
    );
  }
}

export default PickingView;
