import React, { Component } from 'react';
class Mainview extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
    this.deck = this.props.user.deck;
    this.user = this.props.user;
    this.setUpSocketEventHandlers();
  }

  cardRecived(msg){
    console.log(msg)
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
      console.log("OMG", this.user)
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
        <ul className="status-bar">
          <li className="sb-list">Usersfdfsd : { this.user.userName }</li>
          <li className="sb-list">Cards Won : { this.user.whiteCards }</li>
          <li className="sb-list">{ this.user.turn } turn</li>
          <li className="sb-list">{ this.user.userName }</li>
        </ul>

        <div id="whiteCard" className="white-card-container white-card">
          <h4 id="whiteCardLabel">{ this.user.deck.whiteCard }</h4>
        </div>
        <div className="bottom-control">

          <button onClick={ this.onSwipeUp }>Submit Card</button>
        </div>
      </div>
    );
  }
}

export default Mainview;
