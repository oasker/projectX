class Game {
<<<<<<< HEAD
    constructor() {
=======
    constructor(id) {
>>>>>>> mainViewChange
        this.decks = [];
        this.users = [];
        this.isPicking = {};
        this.cardsOnTable = [];
<<<<<<< HEAD
=======
        this.gameID = id;
>>>>>>> mainViewChange
    }
    addUser(user) {
        this.users.push(user);
    }
    isPickingNow(user) {
        this.isPicking.userName = user.userName;
        this.isPicking.socketID = user.socketID;
    }
    addCardToTable(card) {
        this.cardsOnTable.push(card);
    }

}

class GameManager {
    constructor() {
        this.roomCodes = {}
    }
<<<<<<< HEAD
=======

>>>>>>> mainViewChange
    getNewRoomCode() {
        var code = Array.from(Array(5)).map(()=>{
            return this.randomNumber()
        }
        ).map(val=>{
            return String.fromCharCode(parseInt(val + 97))
        }
<<<<<<< HEAD
        ).join('');
=======
      ).join('').toUpperCase();
>>>>>>> mainViewChange

        if (this.roomCodeIsUnique(code)) {
            return code;
        } else {
            this.getNewRoomCode();
        }
<<<<<<< HEAD
=======
        return code;
>>>>>>> mainViewChange
    }

    randomNumber() {
        return Math.round(Math.random() * 25);
    }

    roomCodeIsUnique(key) {
        return !(key in this.roomCodes);
    }

    getRoomCode() {
        this.getNewRoomCode();
    }

    addRoom(roomCode) {
        this.roomCodes[roomCode] = {
<<<<<<< HEAD
            game: new Game(),
            lastUsed: new Date().getTime()
        };
=======
            game: new Game(roomCode),
            lastUsed: new Date().getTime()
        };
        return roomCode;
>>>>>>> mainViewChange
    }

    deleteOldRooms() {
        for( room in this.roomCodes ){

        }
    }
<<<<<<< HEAD
}

var gameManager = new GameManager();

gameManager.addRoom(gameManager.getNewRoomCode())
gameManager.addRoom(gameManager.getNewRoomCode())
gameManager.addRoom(gameManager.getNewRoomCode())
gameManager.addRoom(gameManager.getNewRoomCode())

console.log(gameManager)
=======

    //

    getRoomCodeById(id){
      return this.roomCodes[id]
    }

    roomCodeExists(roomCode){
      return roomCode in this.roomCodes;
    }
}
module.export = new Game()
module.exports = new GameManager()
>>>>>>> mainViewChange
