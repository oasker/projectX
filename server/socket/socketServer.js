var io = require('socket.io')(4000);

console.log("Socket Server Running on 4000!");

io.on('connection',(socket)=>{ // Generic "/" route which everyone hits first

  // Logic for joining room

  // Logic for starting room

  // logic for leaving room

});
