var React = require('react');
var _ = require('lodash');

var Home = React.createClass({
  
  getInitialState: function() {
    return {
      loading: false
    }
  },
  
  componentDidMount: function() {

  },
  
  addToPassbook: function() {
    this.setState({loading: true});

    var iframe = document.createElement('iframe');
    iframe.id = "IFRAMEID";
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = 'http://localhost:5000/pass';
    iframe.addEventListener("load", function () {

    });

  },
  
  //🚗🐰🐇😎👏
  render: function() {    
    return (
      <div className="home">
        <h1 className="">PassWallet</h1>
        <p className="subtitle">
          {"Keep your bitcoin wallet in Passbook"}
        </p>
        <br/>
        <br/>
        <label className="address">Wallet Addresse</label>
        <input type="text" placeholder="Wallet public address"/>
        <br/><br/>
        <label className="description">Description</label>
        <input type="text" placeholder="Description (optional)"/>
        <br/><br/>
        <button onClick={this.addToPassbook}>Add to Passbook</button>
      </div>
    );
  },

});

module.exports = Home;
