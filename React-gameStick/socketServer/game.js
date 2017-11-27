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

module.exports = Game
