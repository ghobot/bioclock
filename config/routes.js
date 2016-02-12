var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
//var IndexRoute = ReactRouter.IndexRoute;

var APP = require('../components/APP');
var Users = require('../components/Users');
var Dish = require('../components/Dish');
var Info = require('../components/Info');

var routes = (
	<Route path="/" component={APP}>	
  		<Route path="info" component={Info}/>
  		<Route path="dish" component={Dish}/>
  		<Route path="users" component={Users}/>
	</Route>
);

module.exports = routes;