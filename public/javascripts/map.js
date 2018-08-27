'use strict';

/**
 * @file Adding of Leaflet Map
 */

/* 
 * Create threee Base Layers.
 */
var geoJSONDrawn = "";
var mapboxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
var token = 'pk.eyJ1IjoiaG9lbHNjaCIsImEiOiJxblpwakZrIn0.JTTnLszkIJB11k8YEe7raQ';
var map = L.map('map').setView([51.963621,7.615891], 13); // Startkoordinaten
var streets = L.tileLayer(mapboxURL, {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: token
    }).addTo(map),
    outdoors = L.tileLayer(mapboxURL, {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: 'mapbox.outdoors',
        accessToken: token
    }),
    satellite = L.tileLayer(mapboxURL, {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 18,
        id: 'mapbox.satellite',
        accessToken: token
    });


/*
 * Fullscreen control.
 */
map.addControl(new L.Control.Fullscreen());
/* 
 * Leaflet draw control features.
 */
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var overlayMaps = {
    "Overlay": drawnItems
}

/* 
 * Add Basemaps to Layercontrol.
 */
var baseMaps = {
    "Streets": streets,
    "Outdoors": outdoors,
    "Satellite": satellite
};

var lcontrol = L.control.layers(baseMaps, overlayMaps).addTo(map);
map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        },
        circle: false

    }
}));

map.on('draw:created', function(e) {
    var type = e.layerType;
    var layer = e.layer;
    var currentGeojson = layer.toGeoJSON();
    
    if (geoJSONDrawn != ""){
      geoJSONDrawn.push(currentGeojson);
    }
    else {
      geoJSONDrawn = [currentGeojson];
    }

    $('button#downloadIN').attr("disabled", false);
    drawnItems.addLayer(layer);
    $('button#delete').attr("disabled", false);
    drawnItems.addLayer(layer);
    $('button#updateIN').attr("disabled", false);
    drawnItems.addLayer(layer);
});

var control = L.Routing.control({
    router: L.routing.mapbox('pk.eyJ1IjoiZWZmaXpqZW5zIiwiYSI6ImNqaWFkbWsxMjB1bzgzdmxtZjcxb2RrMWcifQ.By1C8AELYfvq1EpQeOVMxw'),
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(map);

/* 
 * Load getCurrentDate and loadMensen to make the Mensas visible when the page is ready
 */
$(document).ready(function(){
    getCurrentDate();
    loadMensen();
});