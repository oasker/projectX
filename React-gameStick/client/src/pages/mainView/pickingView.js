import React, { Component } from 'react';
import StatusBar from './statusbar/statusBar.js';
import Card from './cardModule/cardComponent.js';
import './pickingView.css';

class Mainview extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
    this.deck = this.props.user.deck;
    this.user = this.props.user;
    this.setUpSocketEventHandlers();
  }

  setUpSocketEventHandlers(){
    this.user.socket.on("newBlackCard",(msg)=>{
      this.deck.blackCards[this.deck.ind].label = msg;
      this.deck.currentBlackCard = this.deck.blackCards[this.deck.ind].label;
    });

    this.user.socket.on("filledDeck", msg =>{
      this.deck.fillHand(msg);
      this.props.updateUser(this.user);
    });

    this.user.socket.on("whiteCard", msg => {
      this.deck.whiteCard = msg;
      this.props.updateUser(this.user);

    });

    this.user.socket.on("youArePicking",(msg)=>{
      console.log("I am picking");
      this.user.props.isPicking = true;
      this.props.updateUser(this.user)
    })

    this.user.socket.on("userRecievedCard", msg =>{
      this.cardRecived(msg);
    })
  }

  componentDidMount(){
    this.props.updateUser(this.user)
  }

  render() {
    return (
      <div >
        <StatusBar/>
        <div id="whiteCard" className="white-card-container white-card">
          <h4 id="whiteCardLabel">{ this.user.deck.whiteCard }</h4>
        </div>

        <Card/>
          <input type="button" id="submit-button" onClick={ this.onSwipeUp }>Main View</input>

        <input type="button" id="submit-button" onClick={ this.submitCardToTable }>Main View</input>

      </div>
    );
  }
}

export default Mainview;
