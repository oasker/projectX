import React, { Component } from 'react';


class Card {
  constructor(index,label) {
    this.label = label;
    this.index = index;
  }
}

class Deck {
  constructor() {
    this.blackCards = [];
    this.whiteCardsEarned = [];
    this.whiteCard = "White";
    this.currentBlackCard = "Black";
    this.ind = 0;
  }

  insertCard(card){
    this.blackCards.push(card);
  }

  //=======================================================
  //=== Deck and Card Classes =============================

  getNextCard(){
    this.currentBlackCard = this.blackCards[this.nextCardIndex()].label;
  }

  getPreviousCard(){
    this.currentBlackCard = this.blackCards[this.previousCardIndex()].label;
  }

  nextCardIndex() {
    if (this.ind === 6) {
      this.ind = 0;
      return this.ind;
    } else {
      this.ind++
      return this.ind;
    }
  }

  previousCardIndex() {
    if (this.ind === 0) {
      this.ind = 6;
      return this.ind;
    } else {
      this.ind--
      return this.ind;
    }
  }

  fillHand(ar){
    for (var i = 0; i < ar.length; i++) {
      var x = new Card(i, ar[i]); // get a black card
      this.insertCard(x);
    }
    console.log(this.blackCards);
    this.currentBlackCard=this.blackCards[0].label;
  }
}

export default class User {
  constructor(socket){
    this.id = 0;
    this.userName = "Jeff";
    this.deck = new Deck();
    this.cardsEarned = 0;
    this.whiteCards = 0;
    this.isPickingCards = false;
    this.socket = socket;
    this.setUpSocket()
    this.requestDeck();
  }

  setUpSocket(){

  }

  //fillHand(ar)

  requestDeck(){
      this.socket.emit("fillDeck");
      this.socket.emit("getWhiteCard");
  }

  getBlackCard(){
    this.socket.emit('getBlackCard');
  }

  //Choosing Black Cards

  submitCardToTable() {
    this.socket.emit('submitCard',this.deck.blackCards[this.deck.ind]);
  }

  // White Card Stuff

  pickWhiteCard(){
    // If is picking == true;
    if(this.isPickingCards){
        this.socket.emit("cardChosen",/* Some Card cardChosen */)
    } else {
      return
    }
  }


}
