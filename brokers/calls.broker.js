'use strict';

var online = {};
module.exports.authorize = function(socket) {
  socket.emit('user.authorize');

  socket.on('user.authorize.response', function(user){
    online[user._id] = true;
    socket.user_id = user._id;
    socket.join(user._id); // Join user to its own room for to call it individually.
    socket.io.sockets.emit('contacts.online', online);
  });

  var room = function(message) {
    return 'call_' + message.from + '_' + message.to;
  };

  socket.on('call.ready', function(message){
    socket.broadcast.to(room(message)).emit('call.ready', message);
  });

  socket.on('call.connect', function(message){
     socket.join(room(message));
  });

  socket.on('call.message', function(message){
    socket.broadcast.to(room(message)).emit('call.message', message);
  });

  socket.on('call.hang-up', function(message){
    socket.emit('call.hang-up', message);
    socket.broadcast.to(room(message)).emit('call.hang-up', message);
  });

  socket.on('call.hang-up.accepted', function(message){
    socket.leave(room(message));
  });

  socket.on('disconnect', function(){
    delete online[socket.user_id];
    socket.io.sockets.emit('contacts.online', online);
  });

  socket.on('contacts.online', function() {
    socket.emit('contacts.online', online);
  });
};