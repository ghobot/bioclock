const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const APP = require('../components/APP');
const Users = require('../components/Users');
const Dish = require('../components/Dish');
const Info = require('../components/Info');
const Whoops404 = require('../components/Whoops404');


const routes = (
	<Route path="/" component={APP}>	
  		<Route path="info" component={Info}/>
  		<Route path="dish" component={Dish}/>
  		<Route path="users" component={Users}/>
  		<Route path="*" component={Whoops404}/>
  		<IndexRoute component={Users}/>
	</Route>
);

module.exports = routes;