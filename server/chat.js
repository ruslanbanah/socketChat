module.exports = (socket)=>{
  let name = 'U' + (socket.id).toString().substr(1,4);
  let time = (new Date).toLocaleTimeString();
  
  socket.json.send({'event': 'connected', 'name': name, 'time': time});
  socket.broadcast.json.send({'event': 'userJoined', 'name': name, 'time': time});
  console.info(name + ' connected to chat!');
  
  socket.on('message', function (msg) {
    let time = (new Date).toLocaleTimeString();
    socket.json.send({'event': 'messageSent', 'name': name, 'text': msg, 'time': time});
    socket.broadcast.json.send({'event': 'messageReceived', 'name': name, 'text': msg, 'time': time})
  });
  
  socket.on('disconnect', function() {
    let time = (new Date).toLocaleTimeString();
    socket.json.send({'event': 'userSplit', 'name': name, 'time': time});
    console.info(name + ' disconected.');
  });
}