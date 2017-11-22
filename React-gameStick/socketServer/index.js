var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(4000, () => {
  console.log('listening on *:4200');
});
var gameHandler = require('./gameHandler.js');
var decks = require('./serverSideCard.js');

class Game{
  constructor(){
    this.decks = decks;
    this.users = [];
    this.isPicking = '';
  }
  addUser(user){
    this.users.push(user);
    console.log(this.users);
  }
}

app.use(require('express').static('public'));
var currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html.html');
});

io.on('connection', function(socket) {
  // initiate game

  // send cards to users

  // recived cards from user
  let game = new Game();
  console.log(decks.whi)
  socket.on('addUserName',(msg)=>{

    if(game.isPicking === '' ){
      game.isPicking = {userName: msg, socket: socket.id};
      socket.emit('youArePicking');
    }
      game.addUser({userName: msg, socket: socket.id})
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  socket.on("startGame" ,function(){

  })

  socket.emit('users',socket.id)

  socket.on('getBlackCard', (msg) => {
    console.log('getingBlack')
    socket.emit('card', decks.blackCardDeck.getCardFromDeck())
  });

  socket.on('fillDeck', (msg) => {
    var x = [];
    for (var i = 0; i < 7; i++) {
      x.push(decks.blackCardDeck.getCardFromDeck())
    }
    socket.emit("filledDeck", x);
    console.log("There are " + decks.blackCardDeck.deck.length + " cards in the blackDeck");
  });

  socket.on('getWhiteCard', () => {
    // currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();
    // socket.broadcast.emit('whiteCard', currentWhiteCard)
    socket.emit('whiteCard', currentWhiteCard)
  })

  socket.emit('whiteCard', currentWhiteCard);

  socket.on("submitCard", (msg) => {
    console.log(msg)
    socket.emit("newBlackCard", decks.blackCardDeck.getCardFromDeck());
    socket.emit('userPickedCard',msg)
  })

  socket.on("test", (msg) => {
    console.log("test");
  })

  socket.on('userChooseCard',()=>{
    // add point to the user whose card was chosen,
    // send a notification to the user whos card was chosen
    // send a starting flag to the next user
  })
});
