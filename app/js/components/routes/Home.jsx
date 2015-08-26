var React = require('react');
var _ = require('lodash');
var InputColor = require('react-input-color');

var Home = React.createClass({
  
  getInitialState: function() {
    return {
      loading: false,
      color: "#eeeeee"
    }
  },
  
  componentDidMount: function() {

  },
  
  addToPassbook: function() {
    this.setState({loading: true});
//     var url = 'http://192.168.1.58:5000';
    var url = 'http://passwallet.pw';
    var desc = this.refs.description.getDOMNode().value;
    var address = this.refs.address.getDOMNode().value;
    if (address.length < 2) {
      return;
    }
    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.src = url+'/pass?wallet='+address+'&description='+desc;
    iframe.addEventListener("load", function () {
      document.body.removeChild(iframe);
    });

  },
  
  handleChangeColor: function(color) {
    
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
        <input ref="address" type="text" placeholder="Wallet public address"/>
        <br/><br/>
        <label className="description">Description</label>
        <input ref="description" type="text" placeholder="Description (optional)"/>
        <br/><br/>
        <label className="description">Color</label>
        <InputColor color={this.state.color} onChange={this.handleChangeColor} />
        <br/><br/>
        
        <button onClick={this.addToPassbook}>Add to Passbook</button>
      </div>
    );
  },

});

module.exports = Home;
