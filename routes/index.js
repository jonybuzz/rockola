var express = require('express');
var router = express.Router();

var databaseUrl = "my-db";
var collections  = ["usuarios"];
var db = require("mongojs")(databaseUrl,collections);

/* GET home page. */
router.get('/', function(req, res, next) {
  db.usuarios.save({id:1, nombre: "eduardo"});  
  res.render('index');
  
});
module.exports = router;
