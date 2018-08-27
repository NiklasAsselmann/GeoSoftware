'use strict';
/**
* represents a Institutobjekt in the database
*/
class INdatabaseobject {
    constructor(name, json, picture) {
      this.name = name;
      this.json = json;
      this.picture = picture;
    }
}
/**
* represents a Fachbreich in the database
*/
class FBdatabaseobject {
    constructor(name, website,institute) {
      this.name = name;
      this.website = website;
      this.institute= institute
    }
}
/**
* save an Institut in the database
*/
function saveINToDatabase() {
    var textfield = document.getElementById('institutsname-area').value;  
    var picture = document.getElementById('imageurl-area').value;   
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        if(picture.length==0){
            alert("Bitte passendes Bild hinzufügen")
        }
        var data = drawnItems.toGeoJSON();
        var dbObject = new INdatabaseobject(textfield, "",picture);
        dbObject.json = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            data: dbObject,
            url: "./start/institute",
            success: function(result){
                alert("Erfolgreich gespeichert");
            },
            error: function(xhr,status,error){
            }
        });
    }
}
/**
* save a Fachbereich in the database
*/
function saveFBToDatabase() {
    var name =document.getElementById('FBname').value; 
    var url = document.getElementById('FBurl-area').value;
    var institute = document.getElementById('institute').value;
    if(name.length==0) {
        alert("Bitte Namen eingeben");
    }   
    else {
        if(url.length==0){
            alert("Bitte Websites angeben");
        }
        else{
            if(institute.length==0){
                alert("Bitte Institut(e) angeben");
            }
            else{
                var dbObject = new FBdatabaseobject(name,url,institute);
                $.ajax({
                type: 'POST',
                data: dbObject,
                url: "./start/fachbereiche",
                success: function(result){
                    alert("Erfolgreich gespeichert");
                },
                error: function(xhr,status,error){
                }
                });
            }
        }
    }
}
/**
* represents a Route in the database
*/
class Routedatabaseobject {
    constructor(name,start,startlat,startlng,ziel,ziellat,ziellng) {
      this.name = name;
      this.start = start;
      this.ziel = ziel;
      this.startlat=startlat
      this.startlng=startlng
      this.ziellat=ziellat
      this.ziellng=ziellng
    }
}
/**
* save a Route in the database
*/
function saveRouteToDatabase() {
    var name = document.getElementById("routenname-area").value;
    var waypoint=control.getWaypoints()
    if(name.length==0){
        alert("Bitte Namen angeben")
    }
    else{
        if(waypoint[0].latLng==null){
            alert("Bitte Start angeben")
        }
        else{
            if(waypoint[1].latLng==null) {
            alert("Bitte Ziel eingeben");
        }
            else {
                var ziel = waypoint[1].name
                var start = waypoint[0].name
                var ziellat = waypoint[1].latLng.lat
                var ziellng = waypoint[1].latLng.lng
                var startlat = waypoint[0].latLng.lat
            var startlng = waypoint[0].latLng.lng
            var dbObject = new Routedatabaseobject(name,start,startlat,startlng,ziel,ziellat,ziellng);
            $.ajax({
                type: 'POST',
                data: dbObject,
                url: "./start/routen",
                success: function(result){
                    alert("Erfolgreich gespeichert");
                },
                error: function(xhr,status,error){
                }
                });
            }
         }
    }
  }

