var React = require('react');

/* ROUTES */
var App = require('./components/App.jsx');
var Home = require('./components/routes/Home.jsx');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="home" handler={Home} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});