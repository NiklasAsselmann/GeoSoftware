'use strict';
/**
* @desc Delete all Layers
* source: https://bl.ocks.org/danswick/d30c44b081be31aea483
*/
function deleteLayer() {
    drawnItems.clearLayers();
    alert("Alles gelöscht")
    $("#delete").prop("disabled",true);
    $("#download").prop("disabled",true);
}

/**
*@desc Helper function, removes element it's invoked by from DOM
*/
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function deleteINfromDatabase() {
    var textfield = document.getElementById('institutsname-area').value;  

    if(textfield.length==0) {
        alert("Bitte Namen eingeben");
    }   else {
        $.ajax({
            type: 'DELETE',
            url: "./start/institute/"+name,
            success: function(result){
                console.log("Erfolg")
            },
            error: function(xhr,status,error){
            }
        });
    }
}

function deleteFBfromDatabase() {
    var name =document.getElementById('FBname').value; 
    if(name.length==0) {
        alert("Bitte Namen eingeben");
    }   
    else {
                $.ajax({
                type: 'DELETE',
                url: "./start/fachbereiche/"+name,
                success: function(result){
                console.log("Erfolg")
                },
                error: function(xhr,status,error){
                    console.log(res)
                }
                });
        }
}

function deleteRoutefromDatabase() {
    var name = document.getElementById("routenname-area").value;
    if(name.length==0) {
    alert("Bitte Namen eingeben");
    }  else {
      $.ajax({
        type: 'DELETE',
        url: "./start/routen/"+name,
        success: function(result){
        console.log("Erfolg")
        },
        error: function(xhr,status,error){
        }
        });
    }
  }