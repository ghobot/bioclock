//'use strict';
const express = require('express');
const app = express();
const connections = [];
const users = [];
const totalServings = [];
const _ = require('underscore');

const title = 'BioClock';

app.use(express.static('./public')); //middleware to serve static links
app.use(express.static('./node_modules/bootstrap/dist'));

const server = app.listen(process.env.PORT || 4000);
const io = require('socket.io').listen(server);

const main = io.of('/main');
const dish = io.of('/dish');

main.on('connection', function(socket){

	socket.once('disconnect' , function() {
		const member = _.findWhere(users, { id: this.id }); //searches array for specific member that disconnected
		if (member) {
			users.splice(users.indexOf(member), 1);
			//io.sockets.emit('users', users);
			main.emit('users', users);
			console.log("Left: %s (%s audience members)", member.user, users.length)
		}

		connections.splice(connections.indexOf(socket), 1);
		socket.disconnect(); //extra safety step to disconnect socket
		
		console.log('Disconnected: %s sockets remaining.' , connections.length)
	});

	socket.on('addUser' , function(payload) {
		const newUser = {
			id: this.id,
			name: payload.name
		};

		this.emit('joined', newUser);
		users.push(newUser);
		//io.sockets.emit('users', users);
		//io.sockets.emit('totalServings', totalServings);
		main.emit('users', users);
		main.emit('totalServings', totalServings);


		console.log("%s joined.", newUser.name);

		connections.push(socket);
	
		console.log("Connected: %s sockets connected", connections.length);

	});

	socket.on('refreshUser', function(payload) {
		

		this.emit('joined', payload);
		users.push(payload);
		//io.sockets.emit('users', users);
		main.emit('users', users);
		console.log("%s refreshed. %s", payload.name, payload.id);

	});

	socket.on('addReagent' , function(payload) {
		//totalServings += payload.serving;

		const User = {
			id: this.id,
			message: payload.message,
			serving: payload.serving,
			name: payload.name,
			totalServings: totalServings
		};

		totalServings.push(payload.serving);

		this.emit('addedReagent', User);
		dish.emit('toP5' , User);

		
		//io.sockets.emit('totalServings', totalServings);
		//dish.sockets.emit('totalServings', totalServings);
		main.emit('totalServings', totalServings);

		console.log("%s , %s total doses", payload.message, totalServings.length);
	});

	socket.emit('welcome', {
		title: title
	});
	

});

dish.on('connection', function(socket){
	console.log('dish has connected');

	const doses = totalServings.length;

	dish.emit('doses' , doses);
	// socket.on('addReagent' , function(payload) {
	// 	//totalServings += payload.serving;

	// 	const User = {
	// 		id: this.id,
	// 		message: payload.message,
	// 		serving: payload.serving,
	// 		name: payload.name,
	// 		totalServings: totalServings
	// 	};

	// 	totalServings.push(payload.serving);

	// 	this.emit('addedReagent', User);
	// 	this.emit('toP5' , User);

});

console.log('The app is running at http://localhost:4000');