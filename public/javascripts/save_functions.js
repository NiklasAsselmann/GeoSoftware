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
                $('#error').html("Objekt gespeichert");
            },
            error: function(xhr,status,error){
                $('#error').html("Ups");
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
                $('#error').html("Objekt gespeichert");
                },
                error: function(xhr,status,error){
                $('#error').html("Ups");
                }
                });
            }
        }
    }
}
/**
* get all Waypoints from the current route
*/
function getAllPoint(){
    var returnArray = [];
        for (var i = 0; i < control.getWaypoints().length; i++) {
          returnArray.push(control.getWaypoints()[i].latLng);
        };
      return returnArray;
}
/**
* represents a Route in the database
*/
class Routedatabaseobject {
    constructor(name, json,) {
      this.name = name;
      this.json = json;
    }
}
/**
* save a Route in the database
*/
function saveRouteToDatabase() {
    var textfield = document.getElementById("routenname").value;
    if(textfield.length==0) {
    alert("Bitte Namen eingeben");
    }  else {
      var data = getAllPoint();
      var dbObject = new Routedatabasobject(name,"");
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

