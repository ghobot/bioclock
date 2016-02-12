var express = require('express');

var app = express();
var connections = [];

var title = 'untitled session';

app.use(express.static('./public')); //middleware to serve static links
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(4000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	
	socket.once('disconnect' , function() {
		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect(); //extra safety step to disconnect socket
		console.log('Disconnected: %s sockets remaining.' , connections.length)
	});

	socket.emit('welcome', {
		title: title

	});

	connections.push(socket);
	console.log("Connected: %s sockets connected", connections.length);

});

console.log('The app is running at http://localhost:4000');