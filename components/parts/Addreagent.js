'use strict';
const React = require('react');

const Addreagent = React.createClass({
	
	addReagent() {
		
		let serving = 1;
		
		
		const name = JSON.parse(sessionStorage.getItem('member')); 
		const _message =  name.name + " has added reagent to the dish.";


		this.props.emit('addReagent', 
			{
				name : name.name,
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