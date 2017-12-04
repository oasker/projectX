import React, { Component } from 'react';
import StatusBar from './statusbar/statusBar.js';
import Card from './cardModule/cardComponent.js';
import './pickingView.css';

// White Card and Black Card will be absracted out later

class PickingView extends Component {

  constructor(props){
    super();
    this.state = props;
    this.props = props;
    this.deck = this.props.user.deck;
    this.user = this.props.user;
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

        <input type="button" id="submit-button" onClick={ this.submitCardToTable }>Main View</input>

      </div>
    );
  }
}

export default PickingView;
