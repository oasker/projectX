class Game {
    constructor() {
        this.decks = [];
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
        ).join('');

        if (this.roomCodeIsUnique(code)) {
            return code;
        } else {
            this.getNewRoomCode();
        }
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
            game: new Game(),
            lastUsed: new Date().getTime()
        };
    }

    deleteOldRooms() {
        for( room in this.roomCodes ){

        }
    }
}

var gameManager = new GameManager();
