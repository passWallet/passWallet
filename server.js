var express = require('express');
var createTemplate = require("passbook");
 
var template = createTemplate("wallet", {
  passTypeIdentifier: "pass.pw.passwallet.passbook",
  teamIdentifier:     "PW",
  backgroundColor:   "rgb(0,255,100)"
});

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static('build'));

app.get('/pass', function(req, res) {

  var pass = template.createPass({
    serialNumber:  "123456",
    description:   "20% off"
  }); 
  pass.render(response, function(error) {
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
