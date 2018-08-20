'use strict';

/**
* @desc Reads the geojson/URL
*/
function readGeoJSONFromTA() {
    return JSON.parse($('textarea#geojson-area')[0].value);
}

function readURLFromTA() {
    var url = document.getElementById('url-area').value;
    fetch(url)
    .then(response => response.json())
    .then(json => {
        JASON = json;
        }
    )
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
        alert("Bitte korrektes JSON angeben");
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
            //maymay.addTo(map).bindPopup("<h5>"+iname+"<h5><img src="+bild+" width='200'><br>").openPopup();
            drawnItems.addLayer(laylay);
            drawnItems.addLayer(maymay);
            $('#delete').prop('disabled', false);
            $('#download').prop('disabled', false); 
        }
        catch {
            alert("Bitte korrekten Link angeben");
        }
        })

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
* represent a Institut in the database
*/
class INdatabaseobject {
    constructor(name, json, pic) {
      this.name = name;
      this.json = json;
      this.picture = pic;
    }
}

/**
* represent a Fachbereich in the database
*/
class FBdatabaseobject {
    constructor(name, abkürzung, website,institute) {
      this.name = name;
      this.abkürzung = abkürzung;
      this.website = website;
      this.name= institute
    }
}

function saveINToDatabase() {
    var textfield = document.getElementById('institutsname-area').value;  
    var image = document.getElementById('imageurl-area').value;     
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        var data = drawnItems.toGeoJSON();
        var dbObject = new INdatabaseobject(textfield, "",image);
        dbObject.json = JSON.stringify(data);
        console.log(dbObject);
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

function saveFBToDatabase() {
    var textfield = document.getElementById('FBname').value;    
    console.log(textfield);
    var abk = document.getElementById('abk').value;
    var url = document.getElementById('FBurl-area').value;
    var institute = document.getElementById('institute').value;
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        var dbObject = new FBdatabaseobject(textfield,abk,url,institute);
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

function coordinateMean(GeoJSON){
    var tempcoordinates = GeoJSON.features[0].geometry.coordinates[0];
    var coordinatesLAT = [];
    var coordinatesLON = [];
    for(var i=0; i<tempcoordinates.length; i++) {
        coordinatesLAT[i] = tempcoordinates[i][1];
        coordinatesLON[i] = tempcoordinates[i][0];
    }
    var LATmean = 0;
    var LONmean = 0;
    for(var j=0; j<(coordinatesLAT.length-1); j++) {
        LATmean += parseFloat(coordinatesLAT[j]);
        LONmean += parseFloat(coordinatesLON[j]);
    }
    LATmean = LATmean / (coordinatesLAT.length-1);
    LONmean = LONmean / (coordinatesLON.length-1);
    var LATLONmean = {LATmean, LONmean};
    return LATLONmean;
}

//- CurrentDate Function Credit to: "https://stackoverflow.com/users/525895/samuel-meddows"
var date
function getCurrentDate(){
    var tag = new Date();
    var dd = tag.getDate();
    var mm = tag.getMonth()+1;
    var yyyy = tag.getFullYear();
    if(dd<10) {
    dd = '0'+dd
    } 
    if(mm<10) {
    mm = '0'+mm
    } 
    tag = yyyy + '-' + mm + '-' + dd; 
    date = tag
}
function loadMensen() {
    var Mensaurl = 'http://openmensa.org/api/v2/canteens?near[lat]=51.9629731&near[lng]=7.625654&nebrar[dist]=20' 
    var Mensen
    fetch(Mensaurl)
    .then(response => response.json())
    .then(json => {
        Mensen = json
        Mensen.map((mensa)=>{
            var url2 = "http://openmensa.org/api/v2/canteens/"+mensa.id+"/days/"+date+"/meals"
            fetch(url2)
            .then((response)=>{
                if (response.ok) {
                    return response.json() 
                } else {
                    L.marker([mensa.coordinates[0], mensa.coordinates[1]]).addTo(map)
                        .bindPopup("<h4>"+mensa.name+"  "+"</h4><p><em>"+mensa.address+"</em></p>")
                }
            })
            .then((json)=>{
                var gerichte=""
                json.map((gericht)=>{
                    gerichte+="<ins>"+gericht.category+"</ins>: "+gericht.name+" [Studenten: "+gericht.prices.students+"€, Mitarbeiter: "+gericht.prices.employees+"€, Andere: "+gericht.prices.others+"€]<br><br>"
                })
                L.marker([mensa.coordinates[0], mensa.coordinates[1]]).addTo(map)
                    .bindPopup("<h4>"+mensa.name+"  "+"</h4><em>"+mensa.address+"</em><br><h5>Tagesgerichte:</h5>"+gerichte);
            })
        })
    })
}
/**
*@desc Helper function, removes element it's invoked by from DOM
*/
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}