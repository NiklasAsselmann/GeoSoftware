var express = require('express');
var router = express.Router();

//Logging for Server
var JL = require('jsnlog').JL;
//Logging for Console
var jsnlog_nodejs = require('jsnlog-nodejs').jsnlog_nodejs;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Geosoftware I - Endabgabe - Start' });
});

/* GET map page. */
router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Geosoftware I - Endabgabe - Karte' });
});

/* GET impressum page. */
router.get('/impressum', function(req, res, next) {
  res.render('impressum', { title: 'Geosoftware I - Endabgabe - Impressum' });
});

/* GET Jsonlist page that contains all ojects of our database. */
router.get('/jsonlist', function(req, res) {
  var db = req.db;
  var collection = db.get('geojsons');
  collection.find({},{},function(e,docs){
      res.render('jsonlist', {
          "jsonlist" : docs, title: 'Database Objects'
      });
  });
});

/*
* handling database load request when clicking button in map
*/
router.get('/start/institute/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('institute');
  var json;
  collection.find({name: req.params.name},{},function(e,docs){
      res.send(docs)
  });
});

router.get('/start/fachbereich/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereich');
  var json;
  collection.find({name: req.params.name},{},function(e,docs){
      res.send(docs)
  });
});

router.get('/start/routen/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.find({name: req.params.name},{},function(e,docs){
      res.send(docs)
  });
});

router.get('/start/routen/:start', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.find({start: req.params.start},{},function(e,docs){
      res.send(docs)
  });
});

router.get('/start/routen/:ziel', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.find({ziel: req.params.ziel},{},function(e,docs){
      res.send(docs)
  });
});
/*
* handling database insert request when clicking button in map
*/
router.post('/start/institute', function(req, res) {
  console.log(req.params)
  var db = req.db;
  var document = req.body;
  db.collection('institute').insert(document, function(err, result) {
    if(err) {
      JL().error(document.name+" wasn't succesfully saved");
    } else {
      res.send(document);    
      JL().info(document.name+" saved to the INdatabase");
    }
  });
});

router.post('/start/fachbereiche', function(req, res) {
  console.log(req.params)
  var db = req.db;
  var document = req.body;
  db.collection('fachbereiche').insert(document, function(err, result) {
    if(err) {
      JL().error(document.name+" wasn't succesfully saved");
    } else {
      res.send(document);    
      JL().info(document.name+" saved to the FBdatabase");
    }
  });
});

router.post('/start/routen', function(req, res) {
  console.log(req.params)
  var db = req.db;
  var document = req.body;
  db.collection('routen').insert(document, function(err, result) {
    if(err) {
      JL().error(document.name+" wasn't succesfully saved");
    } else {
      res.send(document);    
      JL().info(document.name+" saved to the Routesdatabase");
    }
  });
});
/*
* handling database update request when clicking button in map
*/
router.put('/start/institute/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('institute');
  var json;
  collection.updateOne({name: req.params.name},{ $set: {json: req.params.json, picture:req.params.picture } },
    function(e,docs){
      res.send(docs)
  });
});

router.put('/start/fachbereiche/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
  var json;
  JL().info(req.params.name);
  collection.updateOne({name: req.params.name},{ $set: {website: req.params.website, institute:req.params.institute } },
    function(e,docs){
      res.send(docs)
  });
});

router.put('/start/routen/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.updateOne({name: req.params.name},{ $set: {start: req.params.start, ziel:req.params.ziel } },
    function(e,docs){
      res.send(docs)
  });
});
/*
* handling database delete request when clicking button in map
*/
router.delete('/start/institute/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('institute');
  var json;
  collection.deleteOne({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

router.delete('/start/fachbereiche/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
  var json;
  collection.deleteOne({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

router.delete('/start/routen/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.deleteOne({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

module.exports = router;
