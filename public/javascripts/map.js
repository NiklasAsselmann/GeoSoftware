'use strict';

/**
 * @file This script sets up the Leaflet map
 */

/* 
 * Setting up the three base layers.
 */
var geoJSONDrawn = "";
var mapboxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
var token = 'pk.eyJ1IjoiaG9lbHNjaCIsImEiOiJxblpwakZrIn0.JTTnLszkIJB11k8YEe7raQ';
var map = L.map('map').setView([51.963621,7.615891], 13); // the map with the start Coordinats
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
 * Add fullscreen control.
 */
map.addControl(new L.Control.Fullscreen());

/* 
 * Add leaflet draw control features.
 */
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var overlayMaps = {
    "Overlay": drawnItems
}

/* 
 * Add the basemaps to the layercontrol.
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

    $('button#download').attr("disabled", false);
    drawnItems.addLayer(layer);
    $('button#delete').attr("disabled", false);
    drawnItems.addLayer(layer);
});
