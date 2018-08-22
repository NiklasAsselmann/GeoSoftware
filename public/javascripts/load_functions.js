'use strict';
/**
*@desc adding and loading from GeoJSON/URL to Map
*/
function loadGeoJSON() {
    var feat = readGeoJSONFromTA()
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

/**
* CurrentDate Function, Credit to: "https://stackoverflow.com/users/525895/samuel-meddows"
*/

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

/**
* Load all Mensas in MS with their Tagesgericht
*/
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
                        .bindPopup(mensa.name+"<br>"+mensa.address+"<br>"+"Heute leider geschlossen")
                }
            })
            .then((json)=>{
                var gerichte=""
                json.map((gericht)=>{
                    gerichte+=gericht.category+":"+"<br>"+gericht.name+"<br>"+gericht.prices.students+"€ | "+gericht.prices.employees+"€ | "+gericht.prices.others+"€<br>"
                })
                L.marker([mensa.coordinates[0], mensa.coordinates[1]]).addTo(map)
                    .bindPopup(mensa.name+"<br>"+mensa.address+"<br>"+gerichte);
            })
        })
    })
}
/**
* Show the Route to the nearest Mensa for a given Institut
*/
function navToMensa(INdatabaseobject){
    var Mensen
    var Mensen2
    var Abstand=[]
    var ID=[]
    var url = 'http://openmensa.org/api/v2/canteens?near[lat]=51.9629731&near[lng]=7.625654&nebrar[dist]=20' 
    fetch(url)
    .then(response => response.json())
    .then(json => {
        Mensen = json
        var index = 1
        Mensen.map((mensa)=>{
            Abstand[index]=distance(mensa.coordinates[0], mensa.coordinates[1],INdatabaseobject.coordinates[0], INdatabaseobject.coordinates[1])
            ID[index]=mensa.id
            index= index+1
        })
    })
    console.log(Abstand)
    Array.min = function( Abstand ){
        return Math.min.apply( Math, Abstand );
    };
    var value = Abstand.min;
    console.log(value)
    var key = Abstand.indexOf(value);
    console.log(key)
    var url2 = "http://openmensa.org/api/v2/canteens/"+ID[key]
    fetch(url2)
    .then(response => response.json())
    .then(json => {
        Mensen2 = json
        control.setWaypoints([
            L.latLng(mensa.coordinates[0],mensa.coordinates[1]),
            L.latLng(INdatabaseobject.coordinates[0], INdatabaseobject.coordinates[1])
          ]);
    })
}


//- Credit to https://stackoverflow.com/users/1090562/salvador-dali
function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}



function loadINFromDatabase(){
    var name = document.getElementById('institutload-area').value;
    $.ajax({
        type: 'GET',
        data: "",
        url: "/"+name+"/",
        async: false,
    success: function(res){
        },
    error: function(res){
        alert("Keine passendes Objekt in der DB")
        }
    })
}

function loadFBFromDatabase(){
    var name = document.getElementById('fachbereichload-area').value;
    $.ajax({
        type: 'GET',
        data: "",
        url: "/"+name+"/",
        async: false,
    success: function(res){
        //-document.getElementById("loadedFB")=res[0].name+"\n"+res[0].website+"\n"+res[0].institute
    },
    error: function(res){
        alert("Keine passendes Objekt in der DB")
    }
    })
}

function loadRouteFromDatabase(){
    var name = document.getElementById('routenload').value;
    $.ajax({
        type: 'GET',
        data: "",
        url: "/"+name+"/",
        async: false,
    success: function(res){

    },
    error: function(res){
        alert("Keine passendes Objekt in der DB")
    }
    })
}