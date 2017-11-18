import React, { Component } from 'react';
import Swipe from 'react-swipe-component';
class Black extends Component {

  constructor(props){
    super();
    this.props = props;
    this.onSwipeLeft = this.swipeLeftCard.bind(this);
    this.onSwipeRight = this.swipeRightCard.bind(this);
    this.onSwipeUp = this.swipeCardUp.bind(this);
    this.deck = this.props.user.deck;
    this.user = this.props.user;
    console.log(this.props);
    this.setUpSocketEventHandlers();
  }

  swipeLeftCard() {
    var card = document.getElementById("blackCard");
    var originalStyle = "black-card-container black-card";
    card.className = "card-left-transition " + originalStyle;
    setTimeout(() => {
      card.className = originalStyle;
      this.deck.getPreviousCard();
      this.props.updateUser(this.user);
    }, 600);
  }

  swipeRightCard(){
    var card = document.getElementById("blackCard");
    var originalStyle = "black-card-container black-card";
    card.className = "card-right-transition " + originalStyle;
    setTimeout(()=>{
      card.className = originalStyle;
      this.deck.getNextCard();
      this.props.updateUser(this.user);
    }, 600);
  }

  swipeCardUp(){
    var card = document.getElementById("blackCard");
    var originalStyle = "black-card-container black-card";
    card.className = "on-swipe-up " + originalStyle;
    setTimeout(()=>{
      card.className = originalStyle;
      this.props.updateUser(this.user);
    }, 600);
    this.user.submitCardToTable();
  }

  setUpSocketEventHandlers(){
    this.user.socket.on("newBlackCard",(msg)=>{
      this.deck.blackCards[this.deck.ind].label = msg;
      this.deck.currentBlackCard = this.deck.blackCards[this.deck.ind].label;
      console.log(this.deck.blackCards[0], msg)
    });

    this.user.socket.on("filledDeck", msg =>{
      this.deck.fillHand(msg);
    });

    this.user.socket.on("whiteCard", msg => {
      this.deck.whiteCard = msg;
    });

    this.user.socket.on("userPickedCard", msg =>{
      console.log("someone picked your card!")
    })
  }

  render() {
    return (
      <div >
        <ul className="status-bar">
          <li className="sb-list">User : { this.user.userName }</li>
          <li className="sb-list">Cards Won : { this.user.whiteCards }</li>
          <li className="sb-list">{ this.user.turn } turn</li>
          <li className="sb-list">{ this.user.userName }</li>
        </ul>

        <div ng-hide="isInView" ng-controller="whiteCardController" id="whiteCard" className="white-card-container white-card">
          <h4 id="whiteCardLabel">{ this.deck.whiteCard }</h4>
        </div>

        <Swipe onSwipedLeft={ this.onSwipeLeft } onSwipedRight={ this.onSwipeRight }>
          <div id="blackCard" className="black-card-container black-card">
            <h3 id="blackCardLabel">{ this.deck.currentBlackCard }</h3>
            <img id="logo" className="logo" src={ require("./imgs/blackLogo.PNG") }></img>
          </div>
        </Swipe>

        <div className="bottom-control">
          <button onClick={ this.onSwipeUp }>Submit Card</button>
        </div>
      </div>
    );
  }
}

export default Black;