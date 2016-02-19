'use strict';
const React = require ('react');
const P5 = require('p5');
//const P5Dom = P5.p5.dom;

const Dish = React.createClass({	

	render() {
		return (
			<div>
				<h1>
					Dish
				</h1>
				<p>
					This is the main animation.
				</p>
			</div>
		);
	}
});

module.exports = Dish;