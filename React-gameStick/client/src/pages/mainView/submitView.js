import React, { Component } from 'react';
import Swipe from 'react-swipe-component';
import StatusBar from './statusbar/statusBar.js';

class SubmitView extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
    this.onSwipeLeft = this.swipeLeftCard.bind(this);
    this.onSwipeRight = this.swipeRightCard.bind(this);
    this.onSwipeUp = this.swipeCardUp.bind(this);
    this.deck = this.props.user.deck;
    this.user = this.props.user;
    this.setUpSocketEventHandlers();
  }

  // UI
  removeClass(e){
    let target = e.target;
    if(target.className.includes("right")){
      this.deck.getNextCard();
    } else if(target.className.includes("left")){
      this.deck.getPreviousCard();
    } else if(target.className.includes("up")){
      this.user.submitCardToTable();
    }
    target.className = "black-card-container black-card";
    this.props.updateUser(this.user);
  }

  swipeRightCard(){
    var card = document.getElementById("blackCard");
    card.className += " card-right-transition";
    card.addEventListener("animationend", this.removeClass.bind(this) , false);
  }

  swipeCardUp(){
    var card = document.getElementById("blackCard");
    card.className += " on-swipe-up";
    card.addEventListener("animationend", this.removeClass.bind(this) , false);
  }

  swipeLeftCard() {
    var card = document.getElementById("blackCard");
    card.className += " card-left-transition ";
    card.addEventListener("animationend", this.removeClass.bind(this) , false);
  }

  sendToPlayer(){
    var val = document.getElementById('test-input').value;
    this.user.socket.emit("test",JSON.stringify({ "user" : val , "text":"TESTING"}))
  }

  // Socket setup

  setUpSocketEventHandlers(){
    this.user.socket.on("newBlackCard",(msg)=>{
      this.deck.blackCards[this.deck.ind].label = msg;
      this.deck.currentBlackCard = this.deck.blackCards[this.deck.ind].label;
    });

    this.user.socket.on("filledDeck", msg =>{
      this.deck.fillHand(msg);
      this.props.updateUser(this.user)
    });

    this.user.socket.on("whiteCard", msg => {
      this.deck.whiteCard = msg;
      this.props.updateUser(this.user)

    });

    this.user.socket.on("userPickedCard", msg =>{
    });

    this.user.socket.on("youArePicking",(msg)=>{
      this.user.isPickingCards = true;
      this.props.updateUser(this.user)
    })

    this.user.socket.on("testR",(msg)=>{
      console.log(msg);
    })
  }

  componentDidMount(){
    this.props.updateUser(this.user)
  }

  render() {
    return (
      <div >
        <StatusBar user = {this.user}/>

        <div id="whiteCard" className="white-card-container white-card">
          <h4 id="whiteCardLabel">{ this.state.user.deck.whiteCard }</h4>
        </div>

        <Swipe onSwipedLeft={ this.onSwipeLeft } onSwipedRight={ this.onSwipeRight }>
          <div id="blackCard" className="black-card-container black-card">
            <h3 id="blackCardLabel">{ this.state.user.deck.currentBlackCard }</h3>
            <img alt='none' id="logo" className="logo" src={ require("./imgs/blackLogo.PNG") }></img>
          </div>
        </Swipe>

        <input type="text" id='test-input' />
        <button onClick={this.sendToPlayer.bind(this)} id ="test-button">Test</button>
        <div className="bottom-control">
          <button onClick={ this.onSwipeUp }>Submit Card</button>
        </div>
      </div>
    );
  }
}

export default SubmitView;
