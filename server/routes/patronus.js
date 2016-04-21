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
      var patronus_name = request.body.patronus_name;
      var results = [];
      var query = client.query('INSERT INTO patronus (patronus_name) VALUES ($1) RETURNING patronus_id, patronus_name', [patronus_name]);

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
      var query = client.query('SELECT "patronus_name" FROM "patronus"');
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
