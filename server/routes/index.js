var router = require('express').Router();
var path = require('path');
var people = require('./people');
var patronus = require('./patronus');


router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/people', people);
router.use('/patronus', patronus);


module.exports = router;
