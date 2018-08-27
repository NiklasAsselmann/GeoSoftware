'use strict';
/**
* @desc Delete all Layers
* source: https://bl.ocks.org/danswick/d30c44b081be31aea483
*/
function deleteLayer() {
    drawnItems.clearLayers();
    alert("Alles gelöscht")
    $("#delete").prop("disabled",true);
    $("#downloadIN").prop("disabled",true);
    $("#updateIN").prop("disabled",true);

}

/**
*@desc Helper function, removes element it's invoked by from DOM
*/
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function deleteINfromDatabase() {
    var name = document.getElementById('institutsname-area').value;  
    if(name.length==0) {
        alert("Bitte Namen eingeben");
    }   
    else {
        $.ajax({
            type: 'GET',
            data: "",
            url: "./start/institute/"+name,
            async: false,
            success: function(res){   
                if(res[0]==undefined){
                    alert("Keine passendes Objekt zum löschen in der DB")
                }
                else{
                $.ajax({
                    type: 'DELETE',
                    url: "./start/institute/"+name,
                    success: function(result){
                        alert("Erfolgreich gelöscht");
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

function deleteFBfromDatabase() {
    var name =document.getElementById('FBname').value; 
    if(name.length==0) {
        alert("Bitte Namen eingeben");
    }   
    else { $.ajax({
        type: 'GET',
        data: "",
        url: "./start/fachbereiche/"+name,
        async: false,
        success: function(res){   
            if(res[0]==undefined){
                alert("Keine passendes Objekt zum löschen in der DB")
            }
            else{
            $.ajax({
                type: 'DELETE',
                url: "./start/fachbereiche/"+name,
                success: function(result){
                    alert("Erfolgreich gelöscht");
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

function deleteRoutefromDatabase() {
    var name = document.getElementById("routenname-area").value;
    if(name.length==0) {
    alert("Bitte Namen eingeben");
    }  else {
        $.ajax({
            type: 'GET',
            data: "",
            url: "./start/routen/"+name,
            async: false,
            success: function(res){   
                if(res[0]==undefined){
                    alert("Keine passendes Objekt zum löschen in der DB")
                }
                else{
                $.ajax({
                    type: 'DELETE',
                    url: "./start/routen/"+name,
                    success: function(result){
                        alert("Erfolgreich gelöscht");
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