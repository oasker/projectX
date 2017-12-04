var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(4000, () => {
  console.log('listening on *:4200');
});
<<<<<<< HEAD

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
=======
//==============================================================================
//==== Server Stuff ============================================================
//==============================================================================

>>>>>>> mainViewChange

app.use(require('express').static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html.html');
});

//==============================================================================
//==== Cards Stuff =============================================================
//==============================================================================


var gameHandler = require('./gameHandler.js');
var Game = require('./game.js')
var decks = require('./serverSideCard.js');
var currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();
//==============================================================================
//==== Socket Stuff ============================================================
//==============================================================================


io.on('connection', function(socket) {
<<<<<<< HEAD
  // initiate game
  console.log(game.users);
  
=======
  //============================================================================
  //==== Starting/Joining Game =================================================
  //============================================================================

  socket.on('joinGame',(msg)=>{
    console.log(msg.roomCode.toUpperCase())
    console.log(msg)
    if(gameHandler.roomCodeExists(msg.roomCode.toUpperCase())){
      gameHandler.roomCodes[msg.roomCode.toUpperCase()].game.addUser({userName : msg.userName , socket : socket.id });
    } else {
      socket.emit("err","room Code doesn't Exists");
    }
  })

  socket.on('startNewGame', msg => {
    console.log(msg)
    var code = gameHandler.getNewRoomCode();
    gameHandler.addRoom(code)
    gameHandler.roomCodes[code].game.isPicking = { userName : msg.userName , socket : socket.id }
    gameHandler.roomCodes[code].game.addUser({ userName : msg.userName , socket : socket.id })
    socket.emit('newRoomCode' , { roomCode : code } )
  })

>>>>>>> mainViewChange
  socket.on('addUserName', (msg) => {
    if (gameHandler.gameusers.length === 0) {
      gameHandler.gameisPicking = {
        userName: msg,
        socket: socket.id
      };
      socket.emit('youArePicking');
    }
    gameHandler.gameaddUser({
      userName: msg,
      socket: socket.id
    })
<<<<<<< HEAD
    socket.emit("whoseTurnIsIt", game.isPicking.userName )
=======
    socket.emit("whoseTurnIsIt", gameHandler.gameisPicking.userName )
>>>>>>> mainViewChange
    });

  socket.on('getDeck', (msg) => {
    var x = [];
    for (var i = 0; i < 7; i++) {
      x.push(decks.blackCardDeck.getCardFromDeck())
    }
    socket.emit("newDeck", x);
  });

  socket.emit('newWhiteCard', currentWhiteCard);

  //============================================================================
  //==== Game In progress Game =================================================
  //============================================================================

  socket.on('startGame',()=>{
    console.log('startGame')
    socket.emit('gameHasStarted');
    socket.broadcast.emit('gameHasStarted');
    socket.emit("test","test")
  })

  socket.on("submitCard", (msg) => {
    console.log(gameHandler.roomCodes[msg.roomCode].game)
    gameHandler.roomCodes[msg.roomCode].game.addCardToTable(msg.card);
    socket.to(gameHandler.roomCodes[msg.roomCode].game.isPicking.socket).emit("userSentCard", msg);
  })

  socket.on('getBlackCard', (msg) => { socket.emit('newBlackCard', decks.blackCardDeck.getCardFromDeck())});

  socket.on('getWhiteCard', () => socket.emit('newWhiteCard', currentWhiteCard))

  //============================================================================
  //==== Testing ===============================================================
  //============================================================================


  socket.on("test", (msg) => {
    msg = JSON.parse(msg);
    console.log(msg.user, msg.text);
    socket.to(msg.user).emit("testR", msg.text);
  })

  //============================================================================
  //==== Game Ended ============================================================
  //============================================================================

  socket.on('disconnect', () => {
    // remove from room
    console.log('user disconnected');
  });

  socket.on('getGameCode',(id)=>{
    socket.emit('game',gameHandler.getRoomCodeById(id));
  })
});
