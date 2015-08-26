var express = require('express');
var createTemplate = require("passbook");
var fs = require('fs');

var template = createTemplate("generic", {
  passTypeIdentifier: "pass.pw.passwallet",
  teamIdentifier:     "EV548SXF22",
  backgroundColor:    "rgb(65,83,173)",
  labelColor:         "rgb(255,255,255)",
  foregroundColor:    "rgb(255,255,255)",
  logoText:           "",
  organizationName:   "Pass Wallet"
});
template.keys("certificates", process.env.PASSWALLET_KEY_SECRET);
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
    description:   "Pass Wallet",
    barcode: {
      "message" : wallet,
      "format" : "PKBarcodeFormatQR",
      "messageEncoding" : "iso-8859-1"
    }
  });
  pass.primaryFields.add({ key: "name", label: "Description", value: req.query.description});
  pass.backFields.add({ key: "backname", label: "Description", value: req.query.description});
  pass.backFields.add({ key: "address", label: "Wallet address", value: wallet});
  pass.backFields.add({ key: "url", label: "Url", value: "bitcoin://"+wallet});
  pass.backFields.add({ key: "passwallet", label: "PassWallet", value: "This card has been generated using passwallet.pw"});
  pass.backFields.add({ key: "contact", label: "Support", value: "Need help or just want to reach us? contact@passwallet.pw"});
  pass.backFields.add({ key: "made", label: "", value: "Made with ❤️ by @kemcake and @loladam"});
  pass.backFields.add({ key: "enjoy", label: "", value: "Enjoy ✌️"});

  pass.render(res, function(error) {
    if (error)
      console.log(error);
  });    
});

app.get('*', function(req, res) {
  var dir = __dirname || './build';
  res.sendFile(dir + '/index.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
})
