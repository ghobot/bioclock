'use strict';
const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Whoops404 = React.createClass({
	render() {
		return( 
			<div id="not-found">
				<h1>Whoops...</h1>
				<p>We cannot find the page that you requested.</p> 
				<Link to="/users">
					Return to Users.
				</Link>
			</div>
		);
	}
});

module.exports = Whoops404;