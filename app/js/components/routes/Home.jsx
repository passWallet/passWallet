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
    var desc = this.refs.description.getDOMNode().value;
    var address = this.refs.address.getDOMNode().value;
    var iframe = document.createElement('iframe');
    iframe.id = "IFRAMEID";
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = 'http://192.168.1.58:5000/pass?wallet='+address+'&description='+desc;
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
        <input ref="address" type="text" value="12wxKyqaVbCx5AAqy2AdnbAVAzxVtKyPzL" placeholder="Wallet public address"/>
        <br/><br/>
        <label className="description">Description</label>
        <input ref="description" type="text" placeholder="Description (optional)"/>
        <br/><br/>
        <button onClick={this.addToPassbook}>Add to Passbook</button>
      </div>
    );
  },

});

module.exports = Home;
