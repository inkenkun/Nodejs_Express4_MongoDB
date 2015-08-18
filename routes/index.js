var express = require('express');
var router = express.Router();
var mysql      = require('mysql');

var connection = mysql.createConnection({
	user: 'root',
	password: '',
	host: 'localhost',
	port: '3306',
	database: 'todolist',
});


router.get('/', function(req, res) {
  
  var sql = "SELECT * FROM todo ORDER BY id DESC"
  connection.query(sql, function(err, result, fields) {
    res.json(result);
  });
  
});

router.get('/:id', function(req, res) {
  
  var sql = "SELECT * FROM todo WHERE id = ?"
  connection.query(sql, [req.params.id], function(err, result, fields) {
    res.json(result);
  });
  
});

router.post('/', function(req, res) {
  
  var sql = 'INSERT todo (' +
      'memo' +
      ',register_date' +
      ',done_flag' +
      ' ) VALUES' +
      "(?,CURRENT_TIMESTAMP,0)";
  
  var data = [req.body.memo];
  
  connection.query(sql ,data ,function(err, result) {
    res.json({ "status": "add" });
  });
});

router.put('/:id', function(req, res) {
  
  var sql = 'UPDATE todo SET ' +
          ' memo = ? ' +
          ' ,done_flag = ? ' +
          ' WHERE id=?';

  var data = [
              req.body.memo,
              req.body.done_flag,
              req.params.id
              ];
  
  connection.query(sql ,data,function(err, result) {
    res.json({ "status": "update" });
  });
});


router.delete('/:id', function(req, res) {
  
  var sql = 'DELETE FROM todo WHERE id=?';

  var data = [
              req.params.id
              ];
  
  connection.query(sql ,data,function(err, result) {
    res.json({ "status": "delete" });
  });
});

module.exports = router;
