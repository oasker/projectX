var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(4000, () => {
  console.log('listening on *:4200');
});
var decks = require('./serverSideCard.js');

class Game{
  constructor(){
    this.decks = decks;
    this.users = [];
  }
}

app.use(require('express').static('public'));
var currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html.html');
});

io.on('connection', function(socket) {
  // init game in general

  socket.on("startGame" ,function(){

  })


  console.log(socket.id);
  socket.emit('users',socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

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
    currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();
    // socket.broadcast.emit('whiteCard', currentWhiteCard)
    socket.emit('whiteCard', currentWhiteCard)
  })

  socket.emit('whiteCard', currentWhiteCard);

  socket.on("submitCard", (msg) => {
    socket.emit("newBlackCard", decks.blackCardDeck.getCardFromDeck());
  })

  socket.on("test", (msg) => {
    console.log("test");
  })
});
