var express = require('express');
var createTemplate = require("passbook");
var fs = require('fs');

var template = createTemplate("storeCard", {
  passTypeIdentifier: "pass.pw.passwallet",
  teamIdentifier:     "EV548SXF22",
  backgroundColor:    "rgb(65,83,173)",
  labelColor:         "rgb(255,255,255)",
  foregroundColor:    "rgb(255,255,255)",
  logoText:           "PassWallet",
  organizationName:   ""
});
template.keys("certificates", "walletpass");
template.loadImagesFrom("build/images/");

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static('build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/pass', function(req, res) {
  var wallet = req.query.wallet;
  var pass = template.createPass({
    serialNumber:  wallet,
    description:   "awesome",
    barcode: {
      "message" : wallet,
      "format" : "PKBarcodeFormatQR",
      "messageEncoding" : "iso-8859-1"
    }
  });
  pass.backFields.add({ key: "name", label: "Name", value: req.query.description});
  pass.backFields.add({ key: "address", label: "Public Address", value: wallet});

  pass.primaryFields.add({ key: "name", label: "Name", value: req.query.description});
  pass.secondaryFields.add({ key: "wallet", label: "Wallet", value: wallet});
  pass.render(res, function(error) {
    if (error)
      console.error(error);
  });    
});

app.get('*', function(req, res) {
  var dir = __dirname || './build';
  res.sendFile(dir + '/index.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
})
