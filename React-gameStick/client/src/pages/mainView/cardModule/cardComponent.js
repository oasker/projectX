import React, { Component } from 'react';
import Swipe from 'react-swipe-component';
class Mainview extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
    console.log(this.state)
    this.onSwipeLeft = this.swipeLeftCard.bind(this);
    this.onSwipeRight = this.swipeRightCard.bind(this);
    this.onSwipeUp = this.swipeCardUp.bind(this);
    this.deck = this.props.user.deck;
    this.user = this.props.user;
    this.setUpSocketEventHandlers();
  }
  componentDidMount(){
    this.props.updateUser(this.user)
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Mainview;
