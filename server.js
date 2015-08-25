var express = require('express');
var createTemplate = require("passbook");
var fs = require('fs');

var template = createTemplate("coupon", {
  passTypeIdentifier: "pass.pw.passwallet.passbook",
  teamIdentifier:     "PW",
  backgroundColor:    "rgb(0,255,100)",
  organizationName:   "PassWallet"
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

  var pass = template.createPass({
    serialNumber:  "123456",
    description:   "20% off"
  });
  var file = fs.createWriteStream("mypass.pkpass");
/*
  pass.on("error", function(error) {
    console.error(error);
    process.exit(1);
  })
  pass.pipe(file); 
*/
  pass.render(res, function(error) {
    if (error)
      console.error(error);
  });    
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(app.get('port'), function() {
  console.log("Node app is running on port:" + app.get('port'));
})
