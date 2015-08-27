var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var NavBar = require('./NavBar.jsx');

var App = React.createClass({

  render: function() {

    return (
      <div>
        <RouteHandler />
        <NavBar/>
      </div>
    );
  }
});

module.exports = App;
