var React = require('react');
var _ = require('lodash');

var Home = React.createClass({

  getInitialState: function() {
    return {
      loading: false,
      color: "#4153B0"
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

  onColorInputChange: function(e) {
    this.setState({
      color: e.target.value
    });
  },

  //🚗🐰🐇😎👏
  render: function() {
    return (
      <div className="home" style={{backgroundColor:this.state.color}}>
        <div className="wrap">
          <h1 className="title">
            <img className="typo" src="images/typo.png"/>
            <br/>
            <img className="icon" src="images/icon.png"/>
          </h1>
          <p className="subtitle">
            {"Keep your bitcoin wallets in Passbook"}
          </p>
          <br/>
          <br/>
          <label className="address">Wallet Addresse</label>
          <input ref="address" type="text" placeholder="Wallet public address" defaultValue="38W25PhVqZBz1nPJTVvnubMBL51YwiuTDy"/>
          <br/><br/>
          <label className="description">Description</label>
          <input ref="description" type="text" placeholder="Description (optional)" defaultValue="passwallet"/>
          <br/><br/>
          <label className="description">Color</label>
          <input
            type="color"
            value={this.state.color}
            onChange={this.onColorInputChange}
          />

          <br/><br/>

          <button onClick={this.addToPassbook}>Add to Passbook</button>
        </div>
      </div>
    );
  },

});

module.exports = Home;
