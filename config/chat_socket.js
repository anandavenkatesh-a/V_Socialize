

module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer,{cors:{origin:'*'}});

    io.sockets.on('connection',(socket) => {
         console.log('new socket connection recieved :: ',socket.id);

         socket.on('join_room',function(data){
             console.log('join room req res.',data);

             socket.join(data.chatroom);

             io.in(data.chatroom).emit('user_joined_room',data);
         });

         socket.on('room_incomming_message',(message) => {
            io.in(message.chatroom).emit('room_message',message);
         })
         
         socket.on('disconnect',function(){
            console.log('socket disconnected!');
         });
         
    });    
};