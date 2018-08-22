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
router.get('/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('geojsons');
  var json;
  collection.find({name: req.params.id},{},function(e,docs){
      // text is the json-string
      if(res.send(docs).length==0){
        res.send("Error")
      }
      if(res.send(docs).length==1){ 
             res.send(docs)
        }
      if(res.send(docs).length>1){
        res.send("Error")
      }
    // res.render('object', { title: 'Object: ' + docs[0].name, id: req.params.id,
      //text: JSON.stringify(docs[0].json), name: docs[0].name
      //});
  });
});

/*
* handling database insert post request when clicking button in map
* sending the data of the request to the database collection 'geojsons'
*/
router.post('/start', function(req, res) {
  console.log(req.params)
  var db = req.db;
  var document = req.body;
  db.collection('geojsons').insert(document, function(err, result) {
    if(err) {

    } else {
      res.send(document);    
    }
  });
});

module.exports = router;
