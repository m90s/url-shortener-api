var express = require("express");
var app = express();
var url = require("url");
var randomstring = require("randomstring");
var db = require("./db");

const SHORT_URL_LENGTH = 5;

app.get('/new/:query*', function(req, res){
   var query = req.params.query + req.params[0];
   var queryURL = url.parse(query);

   if(!queryURL){
       res.status(400).send('Invalid URL format');
   }
   
   else {
       var shortenedURL = randomstring.generate(SHORT_URL_LENGTH);
       var short_url = 'https://' + req.hostname + '/' + shortenedURL;
       
       db.insert(query, shortenedURL);
       res.json({'original_url': query, 'short_url': short_url});
   }
   
});

app.get('/:query', function(req, res){
    db.find(req.params.query, callback);

    function callback(err, r){
        if(err){
            res.status(404).send('URL not found!')
            
        }
        else {
            if(r.slice(0,7) != 'http://' && r.slice(0,8) != 'https://'){
                r = 'http://' + r;
            }
            res.redirect(301, r);
        }
    }
});



app.listen(8080, function () {
  console.log('Running on 8080');
});