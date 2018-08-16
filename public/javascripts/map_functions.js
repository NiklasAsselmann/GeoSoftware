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
    try {
    var feat = readGeoJSONFromTA();
    var gLayer = L.geoJson(feat);
    gLayer.addTo(map);
}
    catch {
        alert("Bitte korrektes GeoJSON eingeben")
    }
}
function loadURL() {
    try {
        var feat = readURLFromTA();
        var gLayer = L.geoJson(feat);
        gLayer.addTo(map);
    }
    catch {
            alert("Bitte korrekte URL eingeben")
    }
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
    var textfield = document.getElementById('institutsname-area').value; 
    var imageurl = document.getElementById('imageurl-area').value; 
    //console.log(textfield);
    

    if(textfield.length==0) {
        alert("Bitte Name eingeben");
    }   else {
        var data = drawnItems.toGeoJSON();
        var dbObject = new databaseobject(textfield, "",imageurl);
        dbObject.json = JSON.stringify(data);
        alert("Object erfolgreich gespeichert!");
        $.ajax({
            type: 'POST',
            data: dbObject,
            url: "./start",
        });
    }
}

/**
*@desc Helper function, removes element it's invoked by from DOM
*/
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
