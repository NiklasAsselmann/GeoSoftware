var express = require('express');
var router = express.Router();

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
* render all of the url-request that could be matched to others
* (those with the id in it when selecting object of database)
* Render it with oject.jade and pass the variables title, text and name
*/
router.post('/db/', function(req, res) {
  var db = req.db;
  var document = req.body;
  db.collection('geojsons').insert(document, function(err, result) {
    if(err) {
      console.log("Klappt nicht");
    } else {
      res.send(document);
      console.log("New Object..."+document.name+ "... saved to the database");
    }
  });
});

router.get('/db/:name', function(req, res) {
  var db = req.db;
  var collection = db.get('geojsons');
  var json;
  collection.find({name: req.params.name},{},function(e,docs){
        // text is the json-string
        res.send(docs);
    });
});


module.exports = router;
