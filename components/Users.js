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
					<Display if={this.props.member.name} 
						className="container" >					
						<h3>
							Hello, {this.props.member.name}
						</h3>
						<div className="row">
							<Addreagent emit={this.props.emit} />
						</div>
						<div className="row">
							<h4> 
								{this.props.users.length} users connected.
							</h4>
							<h4> 
								{this.props.servings} doses added to the dish. 
							</h4>
							
						</div>
					</Display>
					<Display if={!this.props.member.name} >
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