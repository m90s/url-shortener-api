var mongo = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/';
var collection = 'shortURLs';

exports.find = function(shortenedURL, callback){
    mongo.connect(url, function(err, db){
     if(err) throw err;
     
     db.collection(collection).findOne({'short': shortenedURL}, function(err, r){
                     if(err) throw err;
                     if(r) callback(null, r.long);
                     else callback('not found', null);
                     
                 });
     db.close();
    });
};

exports.insert = function(longURL, shortenedURL){

  mongo.connect(url, function(err, db){
     if(err) throw err;
     
     db.collection(collection)
     .insertOne({'short': shortenedURL, 'long': longURL }, function(err, r){
     });
     db.close();
  });
  
};