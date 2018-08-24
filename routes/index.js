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

router.get('/database', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
  collection.find({},{},function(e,docs){
      res.render('database', {
          'database' : docs, title: "Datenbank Objekte"
      });
  });
});

router.get('/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('institute');
  collection.find({"name": req.params.name},{},function(e,docs){
    var baba = JSON.parse(docs[0].json);
    JL().info(baba.features[0].features[0].properties.name);
    res.render('object', {title: 'Objekt: ' + JSON.stringify(baba.features[0].features[0].properties.name), text: JSON.stringify(docs[0].json), dbName:JSON.stringify(docs[0].name)});
  JL().info("Currently retrieving object with id... "+req.params.id+ "...");  
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

router.get('/start/fachbereiche/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
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
  collection.update({name: req.params.name},{name: req.body.name, json: req.body.json, picture:req.body.picture},
    function(e,docs){
      res.send(docs)
  });
});

router.put('/start/fachbereiche/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
  var json;
    collection.update({name: req.params.name},{name: req.body.name, website: req.body.website, institute:req.body.institute},
    function(e,docs){
      res.send(docs)
  });
});

router.put('/start/routen/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.update({name: req.params.name},{name: req.body.name, start: req.body.start, ziel: req.body.ziel},
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
  collection.remove({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

router.delete('/start/fachbereiche/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('fachbereiche');
  var json;
  collection.remove({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

router.delete('/start/routen/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('routen');
  var json;
  collection.remove({name: req.params.name},function(e,docs){
      res.send(docs)
  });
});

router.get('/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('institute');
  collection.find({"name": req.params.name},{},function(e,docs){
    var baba = JSON.parse(docs[0].json);
    JL().info(baba.features[0].features[0].properties.name);
    res.render('object', {title: 'Objekt: ' + JSON.stringify(baba.features[0].features[0].properties.name), text: JSON.stringify(docs[0].json), dbName:JSON.stringify(docs[0].name)});
  JL().info("Currently retrieving object with id... "+req.params.name+ "...");  
  }); 
});

// jsnlog.js on the client by default sends log messages to /jsnlog.logger, using POST.
router.post('*.logger', function (req, res) {
  jsnlog_nodejs(JL, req.body);
});

module.exports = router;
