'use strict';

/**
* @desc Reads the geojson/URL
*/
function readGeoJSONFromTA() {
    return JSON.parse($('textarea#geojson-area')[0].value);
}

function readURLFromTA() {
    var url = document.getElementById('url-area').value;
    $.getJSON(url, function(data) {
    return text(data.result);
    });
}
/**
*@desc add and load the read GeoJSON/URL on the map
*/
function loadGeoJSON() {
    var feat = readGeoJSONFromTA();
    var bild = feat.features[0].properties.img;
    var iname = feat.features[0].properties.name;
    var laylay = L.geoJson(feat);
    var LATLON = coordinateMean(feat);
    var maymay = L.marker([LATLON.LATmean, LATLON.LONmean]);
    try {
        laylay.addTo(map);
        maymay.addTo(map).bindPopup("<h5>"+iname+"<h5><img src="+bild+" width='200'><br>").openPopup();
        drawnItems.addLayer(laylay);
        drawnItems.addLayer(maymay);
        $('#delete').prop('disabled', false);
        $('#download').prop('disabled', false);    
    }
    catch {
        alert("Bidde korrektes JSON");
    }
}

function loadURL() {
    var feat;
    var url = document.getElementById('url-area').value;
    fetch(url)
    .then(response => response.json())
    .then(json => {
        feat = json;
        var bild = feat.features[0].properties.img;
        var iname = feat.features[0].properties.name;
        var laylay = L.geoJson(feat);
        var LATLON = coordinateMean(feat);
        var maymay = L.marker([LATLON.LATmean, LATLON.LONmean]);
    try {    
        laylay.addTo(map);
        maymay.addTo(map).bindPopup("<h5>"+iname+"<h5><img src="+bild+" width='200'><br>").openPopup();
        drawnItems.addLayer(laylay);
        drawnItems.addLayer(maymay);
        $('#delete').prop('disabled', false);
        $('#download').prop('disabled', false); 
    }
    catch {
        alert("Bidde korrekten Link");
        }
        }
    )

}

/**
* @desc Deletes the layer 
* source: https://bl.ocks.org/danswick/d30c44b081be31aea483
*/
function deleteLayer() {
    drawnItems.clearLayers();
    alert("Alles gelöscht")
    $("#delete").prop("disabled",true);
    $("#download").prop("disabled",true);
}

/**
* represent a file in the database
*/
class databaseobject {
    /**
    * @param{string} name - name of the figures
    * @param{string:json} - boundries of the figures
    */
    constructor(name, json, pic) {
      this.name = name;
      this.json = json;
      this.picture = pic;
    }
}
  
/**
 * @desc makes an AJAX post request with the data to later store it in the database
 */
function saveToDatabase() {
    var textfield = document.getElementById('GeoJSONname').value;     
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        var data = drawnItems.toGeoJSON();
        var dbObject = new databaseobject(textfield, "");
        dbObject.json = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            data: dbObject,
            url: "./start",
            success: function(result){
                $('#error').html("Objekt gespeichert");
            },
            error: function(xhr,status,error){
                $('#error').html("Ups");
            }
        });
    }
}

/**
*@desc Helper function, removes element it's invoked by from DOM
*/
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
