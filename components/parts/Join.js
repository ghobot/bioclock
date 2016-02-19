'use strict';
const React = require('react');
const ReactDOM = require('react-dom');

const Join = React.createClass({
	
	addUser() {
		const userName = ReactDOM.findDOMNode(this.refs.Username).value;
		//console.log(userName);
		this.props.emit(
			'addUser', 
			{
				name : userName
			});
	},

	render() {
		return (				
			<form action="javascript:void(0)" 
				onSubmit={this.addUser} 
				className="">
				<div className="form-group col-xs-8">
					<label>Name</label>
					<input ref="Username" 
						className="form-control" 
						placeholder="Enter your name" 
						required 
					/>
				</div>	
				<button ref="join" 
					href="#" 
					className="btn btn-primary btn-lg col-xs-8 ">
						Join to add Reagent
				</button>
			</form>						
		);
	}
});

module.exports = Join;