var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4000, () => {
  console.log('listening on *:4200');
});

var gameHandler = require('./gameHandler.js');
var decks = require('./serverSideCard.js');

class Game {
  constructor() {
    this.decks = decks;
    this.users = [];
    this.isPicking = {};
    this.cardsOnTable = [];
  }
  addUser(user) {
    this.users.push(user);
  }
  isPickingNow(user) {
    this.isPicking.userName = user.userName;
    this.isPicking.socketID = user.socketID;
  }
  addCardToTable(card){
    this.cardsOnTable.push(card);
  }
}

let game = new Game();

app.use(require('express').static('public'));
var currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html.html');
});

io.on('connection', function(socket) {
  // initiate game
  console.log(game.users);
  
  socket.on('addUserName', (msg) => {
    if (game.users.length === 0) {
      game.isPicking = {
        userName: msg,
        socket: socket.id
      };
      socket.emit('youArePicking');
    }
    game.addUser({
      userName: msg,
      socket: socket.id
    })
    socket.emit("whoseTurnIsIt", game.isPicking.userName )
    });

  socket.on('fillDeck', (msg) => {
    var x = [];
    for (var i = 0; i < 7; i++) {
      x.push(decks.blackCardDeck.getCardFromDeck())
    }
    socket.emit("filledDeck", x);
  });

  socket.emit('whiteCard', currentWhiteCard);

  // send cards to users

  socket.on("submitCard", (msg) => {
    console.log(`recived card ${msg.blackCard} from ${ msg.userName } whoose socket is ${ msg.socket }`);
    game.addCardToTable(msg); // add cards to table.
    socket.to(game.isPicking.socket).emit("userSentCard", msg);
  })

  socket.on('getBlackCard', (msg) => { socket.emit('card', decks.blackCardDeck.getCardFromDeck())});

  socket.on('getWhiteCard', () => socket.emit('whiteCard', currentWhiteCard))

  // recived cards from user

  socket.on('userChooseCard', () => {
    // add point to the user whose card was chosen,
    // send a notification to the user whos card was chosen
    // send a starting flag to the next user
  })

  socket.on("test", (msg) => {
    msg = JSON.parse(msg);
    console.log(msg.user, msg.text);
    socket.to(msg.user).emit("testR", msg.text);
  })

  // Game ends
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});
