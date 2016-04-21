var pg = require('pg');

var connectionString = 'postgres://localhost:5432/thePeopleAndPatronuses';

function initializePatronus() {
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS patronus (patronus_id serial PRIMARY KEY, patronus_name varchar(80) NOT NULL)');

      query.on('end', function(){
        console.log('Successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('Error creating schema', error);
        process.exit(1);
      });
    }
  });
}

function initializePeople() {
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS people (person_id serial PRIMARY KEY, first_name varchar(80) NOT NULL, last_name varchar(80) NOT NULL, patronus_id integer REFERENCES patronus(patronus_id))');
      query.on('end', function(){
        console.log('Successfully created schema');
        done();
      });

      query.on('error', function(error){
        console.log('Error creating schema', error);
        process.exit(1);
      });
    }
  });
}

module.exports.connectionString = connectionString;
module.exports.initializePatronus = initializePatronus;
module.exports.initializePeople = initializePeople;
