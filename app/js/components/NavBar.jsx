var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NavBar = React.createClass({
  
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  
  render: function() {
    return (
      <div id="navbar">
        <a href="http://github.com/kemcake/passwallet" 
          target="_blank">
          Github
        </a>
      </div>
    );
  },
});

module.exports = NavBar;
