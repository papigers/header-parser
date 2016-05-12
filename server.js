var express = require('express');

var app = express();

app.get('*', function (req, res) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddres;
  var language =  req.headers["accept-language"];
  if(language.indexOf(',') > 0)
    language = language.substring(0, language.indexOf(','));
  var ua = req.headers["user-agent"];
  var os = ua.substring(ua.indexOf('(') + 1, ua.indexOf(')'));
  
  res.json({
    'ipaddress': ip,
    'language': language,
    'software': os
  });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
  console.log("Server listening on port: ", app.get('port'));
});

