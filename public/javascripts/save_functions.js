'use strict';
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
    constructor(name, website,institute) {
      this.name = name;
      this.website = website;
      this.institute= institute
    }
}

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