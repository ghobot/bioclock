var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;
var routes = require('./config/routes.js')

ReactDOM.render(<Router history={hashHistory} routes={routes}></Router>, 
	document.getElementById('app')
	);

//ReactDOM.render(<APP />, document.getElementById('app'));

// Router.run(routes, function(Handler) {
// 	ReactDOM.render(<Handler />, document.getElementById('app'));
// });

