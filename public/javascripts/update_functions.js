'use strict';
/**
* update a Institut in the database
*/
function updateINinDatabase() {
    var textfield = document.getElementById('institutsname-area').value;  
    var picture = document.getElementById('imageurl-area').value;   
    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        if(picture.length==0){
            alert("Bitte passendes Bild hinzufügen")
        }
        else{
        var data = drawnItems.toGeoJSON();
        var dbObject = new INdatabaseobject(textfield, "",picture);
        dbObject.json = JSON.stringify(data);
        $.ajax({
            type: 'GET',
            data: "",
            url: "./start/institute/"+textfield,
            async: false,
            success: function(res){   
                if(res[0]==undefined){
                    alert("Keine passendes Objekt zum Updaten in der DB")
                }
                else{
                $.ajax({
                    type: 'PUT',
                    data: dbObject,
                    url: "./start/institute/"+name,
                    success: function(result){
                        alert("Erfolgreich geupdated");
                    },
                });  
            }
        },
        error: function(res){
            alert("Keine passendes Objekt zum bearbeiten in der DB")
            }
        })
    }
        
    }
}
/**
* update a Fachbereich in the database
*/
function updateFBinDatabase() {
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
                    type: 'GET',
                    data: "",
                    url: "./start/fachbereiche/"+name,
                    async: false,
                success: function(res){
                    if(res[0]==undefined){
                        alert("Keine passendes Objekt zum Updaten in der DB")
                    }
                    else{
                    $.ajax({
                        type: 'PUT',
                        data: dbObject,
                        url: "./start/fachbereiche/"+name,
                        success: function(result){
                            alert("Erfolgreich geupdated");
                        },
                        });
                    }
                },
                error: function(res){
                    alert("Keine passendes Objekt zum bearbeiten in der DB")
                }
                })
            }
        }
    }
}
/**
* save a Route in the database
*/
function updateRouteinDatabase() {
    var name = document.getElementById("routenname-area").value;
    var waypoint=control.getWaypoints()
    var ziel = waypoint[1].name
    var ziellat = waypoint[1].latLng.lat
    var ziellng = waypoint[1].latLng.lng
    var start = waypoint[0].name
    var startlat = waypoint[0].latLng.lat
    var startlng = waypoint[0].latLng.lng
    if(name.length==0) {
    alert("Bitte Namen eingeben");
    }  else {
      var dbObject = new Routedatabaseobject(name,start,startlat,startlng,ziel,ziellat,ziellng);
      $.ajax({
        type: 'GET',
        data: "",
        url: "./start/routen/"+name,
        async: false,
    success: function(res){
        if(res[0]==undefined){
            alert("Keine passendes Objekt zum Updaten in der DB")
        }
        else{
        $.ajax({
            type: 'PUT',
            data: dbObject,
            url: "./start/routen/"+name,
            success: function(result){
                alert("Erfolgreich geupdated");
            },
            });
        }
    },
    error: function(res){
        alert("Keine passendes Objekt in der DB")
    }
    })
    }
  }