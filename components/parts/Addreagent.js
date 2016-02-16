'use strict';
const React = require('react');

const Addreagent = React.createClass({
	
	addReagent() {
		//var userName = {this.props.member.name};
		const _message = "A user has added Reagent to the dish.";
		let serving = 1;
		
		console.log(_message);
		
		this.props.emit('addReagent', 
			{
				add : serving,
				message : _message
			});
	},

	render() {
		return (				
			<form action="javascript:void(0)" onSubmit={this.addReagent} >
				<button ref="reagent" 
					href="#" 
					className="btn btn-success btn-lg col-xs-8">
						Add Reagent
				</button>
			</form>						
		);
	}
});

module.exports = Addreagent;