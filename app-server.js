'use strict';
const express = require('express');
const app = express();
const connections = [];
const users = [];
const _ = require('underscore');

const title = 'BioClock';

app.use(express.static('./public')); //middleware to serve static links
app.use(express.static('./node_modules/bootstrap/dist'));

const server = app.listen(4000);
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

	socket.once('disconnect' , function() {
		const member = _.findWhere(users, { id: this.id }); //searches array for specific member that disconnected
		if (member) {
			users.splice(users.indexOf(member), 1);
			io.sockets.emit('users', users);
			console.log("Left: %s (%s audience members)", member.name, users.length)
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect(); //extra safety step to disconnect socket
		
		console.log('Disconnected: %s sockets remaining.' , connections.length)
	});

	socket.on('addUser' , function(payload) {
		const newUser = {
			id: this.id,
			name: payload.user
		};

		this.emit('joined', newUser);
		users.push(newUser);
		io.sockets.emit('users', users);
		
		console.log("%s joined.", newUser.name);

	});

	socket.on('refreshUser', function(payload) {
		this.emit('joined', payload);
		users.push(payload);
		//io.sockets.emit('users', users);
		console.log("%s refreshed. %s", payload.name, payload.id);

	});

	socket.on('addReagent' , function(payload) {
		const User = {
			id: this.id,
			message: payload.message,
			serving: payload.serving
		};
		this.emit('addedReagent', User);
		
		console.log("%s", payload.message);
	});

	socket.emit('welcome', {
		title: title
	});
	connections.push(socket);
	
	console.log("Connected: %s sockets connected", connections.length);

});

console.log('The app is running at http://localhost:4000');