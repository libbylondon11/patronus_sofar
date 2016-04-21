var express = require('express');
var router = express.Router();

var pg = require('pg');
var connection = require('../db/connection');
var connectionString = connection.connectionString;

router.post('/', function(request, response){
  console.log(request.body);
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      var first_name = request.body.first_name;
      var last_name = request.body.last_name;
      var results = [];
      var query = client.query('INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING first_name, last_name', [first_name, last_name]);

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      var query = client.query('SELECT "first_name", "last_name" FROM "people"');
      var results = [];

      query.on('error', function(error){
        console.log(error);
        response.sendStatus(500);
        done();
      });

      query.on('row', function(rowData){
        results.push(rowData);
      });

      query.on('end', function(){
        response.send(results);
        done();
      });
    }
  });
});

module.exports = router;
