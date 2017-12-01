class Game {
    constructor(id) {
        this.decks = [];
        this.users = [];
        this.isPicking = {};
        this.cardsOnTable = [];
        this.gameID = id;
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

    getNewRoomCode() {
        var code = Array.from(Array(5)).map(()=>{
            return this.randomNumber()
        }
        ).map(val=>{
            return String.fromCharCode(parseInt(val + 97))
        }
      ).join('').toUpperCase();

        if (this.roomCodeIsUnique(code)) {
            return code;
        } else {
            this.getNewRoomCode();
        }
        return code;
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
            game: new Game(roomCode),
            lastUsed: new Date().getTime()
        };
        return roomCode;
    }

    deleteOldRooms() {
        for( room in this.roomCodes ){

        }
    }

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
