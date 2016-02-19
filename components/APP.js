'use strict';
const React = require('react');
const ReactRouter = require('react-router');
const io = require('socket.io-client');
const Header = require('./parts/Header');
let servings = 0;

const APP = React.createClass({
	getInitialState() {
		return {
			status: 'disconnected',
			title: '',
			member: {},
			memberAddingReagent: {},
			servings: 0,
			users: []
		};
	},
	//listeners to events from server with their respective event handlers
	componentWillMount() { 
		this.socket = io('https://localhost:4000/main'); //this creates a socket at our localhost in the main namespace
		this.socket.on('connect', this.connect); //after this socket is connected, we will ruin a custom connect function
		this.socket.on('disconnect', this.disconnect);
		this.socket.on('welcome', this.welcome);
		this.socket.on('joined', this.joined);
		this.socket.on('addedReagent', this.addedReagent);  
		this.socket.on('users', this.updateUsers );
		this.socket.on('totalServings' , this.updateTotalServings);
	},

	emit(eventName, payload) {
		this.socket.emit(eventName, payload);
	},

	connect() {
		// check to see if there is member info saved to the client
		let member = null;
		try {
			const storedMember = sessionStorage.getItem('member');
			member = storedMember ?
				JSON.parse(storedMember) :
				null;
		} catch (e) {
			console.warn('Unable to retrieve member from sessionStorage');
		}

		// if a member exists, just join that member again
		if (member) {
			this.emit('addUser', member);
		}

		//console.log("Connected: " + this.socket.id);
		this.setState({
			status: 'connected'
		});
	},

	disconnect() {
		this.setState({ status : 'disconnected'});
	},

	welcome(serverState) {
		this.setState({ 
			title: serverState.title 
		});
	},

	joined(member) {
		//adds a member node to session storage in JSON format 	
		sessionStorage.setItem('member', JSON.stringify(member)); 
		this.setState({ 
			member : member 
		});
		//console.log("member check: %s" , member.name);
	},

	updateUsers(newUsersArray) {
		this.setState({ 
			users : newUsersArray
		});
	},

	addedReagent(payload){	 	

	 	this.setState({
	 		memberAddingReagent : payload.name

	 	});

	 	//console.log("%s added reagent" , payload.name);

	 	// this.setState({
	 	// 	servings: (servings += 1)
	 	// });
	 },

	 updateTotalServings(payload){
	 	this.setState({
	 		servings: payload.length
	 	})
	 },

	render() {	
		const routes = this.props.children;

		// all of the props passed down to the components	
		return (
			<div>				

				<Header title={this.state.title} status={this.state.status}/>				
				{routes && React.cloneElement(routes, 
					{emit : this.emit,
						status: this.state.status,
						member : this.state.member,
						users: this.state.users,
						servings: this.state.servings,
						memberAddingReagent: this.state.memberAddingReagent
					}
				)}
			</div>
		);
	}
});



module.exports = APP;