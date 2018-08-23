'use strict';
/**
* represents a Institutobjekt in the database
*/
class INdatabaseobject {
    constructor(name, json, pic) {
      this.name = name;
      this.json = json;
      this.picture = pic;
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
    var image = document.getElementById('imageurl-area').value;   
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        if(image.length==0){
            alert("Bitte passendes Bild hinzufügen")
        }
        var data = drawnItems.toGeoJSON();
        var dbObject = new INdatabaseobject(textfield, "",image);
        dbObject.json = JSON.stringify(data);
        $.ajax({
            type: 'POST',
            data: dbObject,
            url: "./start",
            success: function(result){
                console.log("Erfolg")
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
        if(url.lenght==0){
            alert("Bitte URL(s) angeben");
        }
        else{
            if(institute.lenght==0){
                alert("Bitte Institut(e) angeben");
            }
            else{
                var dbObject = new FBdatabaseobject(name,url,institute);
                $.ajax({
                type: 'POST',
                data: dbObject,
                url: "./start",
                success: function(result){
                console.log("Erfolg")
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
    var ziel = waypoint[1].name
    var ziellat = waypoint[1].latLng.lat
    var ziellng = waypoint[1].latLng.lng
    var start = waypoint[0].name
    var startlat = waypoint[0].latLng.lat
    var startlng = waypoint[0].latLng.lng
    console.log(waypoint)
    if(name.length==0) {
    alert("Bitte Namen eingeben");
    }  else {
      var dbObject = new Routedatabaseobject(name,start,startlat,startlng,ziel,ziellat,ziellng);
      console.log(dbObject)
      $.ajax({
        type: 'POST',
        data: dbObject,
        url: "./start",
        success: function(result){
        console.log("Erfolg")
        },
        error: function(xhr,status,error){
        }
        });
    }
  }

