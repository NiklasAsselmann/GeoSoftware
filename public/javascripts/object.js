'use strict';

// create random map with leaflet and OSM
var drawnItems = new L.FeatureGroup();
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
    map = new L.Map('map', { center: new L.LatLng(51.9606649, 7.6261347), zoom: 13 }),
    drawnItems = L.featureGroup().addTo(map);
L.control.layers({ "OSM": osm.addTo(map)}).addTo(map);

// call function
loadGeomitriesOfObject();

/**
* function takes the geojson of the particular object and projects it on the map
*/
function loadGeomitriesOfObject() {
  var json = document.getElementById("white").innerHTML;
  var geojson = JSON.parse(json);
  geojson = JSON.parse(""+geojson+"");
  var bild = geojson.features[0].features[0].properties.img;
  var iname = geojson.features[0].features[0].properties.name;
  var layer = L.geoJSON(geojson[0]).addTo(map);
  map.fitBounds(layer.getBounds());
}

// var name = document.getElementById('fbdbName').value;
// var num = name.replace( /^\D+/g, '');
// var FSname = document.getElementById("FSname")[num].innerHTML;