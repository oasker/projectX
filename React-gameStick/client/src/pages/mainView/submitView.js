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
    this.socket = this.user.socket;
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
      this.submitCardToTable();
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

  // Socket Events/Emitions

  submitCardToTable(){
    this.socket.emit("submitCard", { "userName" : this.user.userName , "blackCard" : this.deck.currentBlackCard , "socket" : this.user.socket.id});
  }

  setUpSocketEventHandlers(){
    // Start Game
    this.socket.on("filledDeck", msg =>{
      this.deck.fillHand(msg);
      this.props.updateUser(this.user)
    });
    // During Game

    this.socket.on("newBlackCard",(msg)=>{
      this.deck.blackCards[this.deck.ind].label = msg;
      this.deck.currentBlackCard = this.deck.blackCards[this.deck.ind].label;
    });

    this.socket.on("whiteCard", msg => {
      this.deck.whiteCard = msg;
      this.props.updateUser(this.user)
    });

    this.socket.on("youArePicking",(msg)=>{
      this.user.isPickingCards = true;
      this.props.updateUser(this.user);
      console.log("YOUR PICKING");
    })

    this.socket.on("userSentCard",(msg)=>{
      console.log(`Recived Card ${ msg.blackCard } form ${ msg.userName } with SocketID = ${ msg.socket }`);
      // add card to cardsRecived

      // Show cards on the thing
    })

    this.socket.on("whoseTurnIsIt", msg =>{
      this.user.turn = (this.user.userName === msg )?("my"):(msg);
      this.setState({ user : this.user })
      console.log(this.state + " " + msg)
    })

    this.socket.on("testR",(msg)=>{
      console.log(msg);
    })

    // End Game
  }

  componentDidMount(){
    this.props.updateUser(this.user)
  }

  render() {
    return (
      <div >
        <StatusBar user = {this.state.user}/>

        <div id="whiteCard" className="white-card-container white-card">
          <h6 id="whiteCardLabel">{ this.state.user.deck.whiteCard }</h6>
        </div>

        <Swipe onSwipedLeft={ this.onSwipeLeft } onSwipedRight={ this.onSwipeRight }>
          <div id="blackCard" className="black-card-container black-card">
            <h3 id="blackCardLabel">{ this.state.user.deck.currentBlackCard }</h3>
            <img alt='none' id="logo" className="logo" src={ require("./imgs/blackLogo.PNG") }></img>
          </div>
        </Swipe>
        <div className="bottom-control">
          <button onClick={ this.onSwipeUp }>Submit Card</button>
        </div>
      </div>
    );
  }
}

export default SubmitView;
