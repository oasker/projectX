class GameHandler(){
  constructor(){
    this.games = {};
  }
  addGame(game){
    this.games[game.id] = game;
  }
  getGame(id){
    return this.games[id]
  }
}
