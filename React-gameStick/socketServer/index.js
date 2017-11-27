var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(4000, () => {
  console.log('listening on *:4200');
});
//==============================================================================
//==== Server Stuff ============================================================
//==============================================================================


app.use(require('express').static('public'));
var currentWhiteCard = decks.whiteCardDeck.getCardFromDeck();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html.html');
});

//==============================================================================
//==== Cards Stuff =============================================================
//==============================================================================


var gameHandler = require('./gameHandler.js');
var Game = require('./game.js')
var decks = require('./serverSideCard.js');

//==============================================================================
//==== Socket Stuff ============================================================
//==============================================================================


io.on('connection', function(socket) {
  //============================================================================
  //==== Starting/Joining Game =================================================
  //============================================================================

  socket.on('joinGame',(msg)=>{
    console.log(msg.roomCode.toUpperCase())
    if(gameHandler.roomCodeExists(msg.roomCode.toUpperCase())){

      gameHandler.roomCodes[msg.roomCode.toUpperCase()].game.addUser(msg.userName);

        console.log(gameHandler.roomCodes[msg.roomCode.toUpperCase()].game.users)
    } else {
      socket.emit("err","room Code doesn't Exists");
    }
  })

  socket.on('startNewGame', msg => {
    var code = gameHandler.getNewRoomCode();
    gameHandler.addRoom(code)
    socket.emit('newRoomCode' , { roomCode : code } )
  })

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
    socket.emit("whoseTurnIsIt", gameHandler.gameisPicking.userName )
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


  socket.on("submitCard", (msg) => {
    console.log(`recived card ${msg.blackCard} from ${ msg.userName } whoose socket is ${ msg.socket }`);
    gameHandler.gameaddCardToTable(msg);
    socket.to(gameHandler.gameisPicking.socket).emit("userSentCard", msg);
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

});
