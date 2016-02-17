'use strict';
const React = require ('react');
const Display = require('./parts/Display');
const Join = require('./parts/Join');
const Addreagent = require('./parts/AddReagent');

const Users = React.createClass({	
	render() {
		return (
			<div>
				<Display if={this.props.status === 'connected'}>
					<Display if={this.props.member.user} 
						className="container" >					
						<h3>
							{this.props.member.user} , add the reagent
						</h3>
						<div className="row">
							<Addreagent emit={this.props.emit} />
						</div>
						<div className="row">
							<h4> 
								{this.props.users.length} users connected.
							</h4>
							<h4> 
								{this.props.servings} servings. 
							</h4>
						</div>
					</Display>
					<Display if={!this.props.member.user} >
						<h3>
							Join to add a reagent to the dish.
						</h3>
						<Join emit={this.props.emit} />	
					</Display>					
				</Display>
			</div>
		);
	}
});

module.exports = Users;