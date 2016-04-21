var express=require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
var port = process.env.PORT || 3000;
var connection = require('./db/connection');


connection.initializePatronus();
connection.initializePeople();

app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/', index);
// app.use('/people', people);
// app.use('/patronus'), patronus);



app.listen(port, function(){
  console.log('Listening on port: ', port);
});
