var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
var api;

mongodb.MongoClient.connect("mongodb://localhost:27017/testdb", function(err, database) {
  api = database.collection("api");
});

router.get('/', function(req, res, next) {
      api.find().toArray(function(err, rows) {
          res.json(rows);
      });
});

router.get('/:id', function(req, res, next) {
      api.findOne({_id: mongodb.ObjectID(req.params.id)}, function(err, rows) {
          res.json(rows);
      });
});

router.post('/', function(req, res, next) {
    api.save(req.body, function() {
      res.json({"status":"post"});
    });
});

router.put('/:id', function(req, res, next) {
    var json = req.body;
    var id = req.params.id;
    json._id = mongodb.ObjectID(id);
    api.save(json, function() {
        res.json({"status":"put"});
    });
});

router.delete('/:id', function(req, res, next) {
    api.remove({_id: mongodb.ObjectID(req.params.id)}, function() {
      res.json({"status": "del"});
    });
});

module.exports = router;
