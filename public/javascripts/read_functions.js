'use strict';

/**
* @desc ließt die geojson/URL und gibt die JSON Datei zurück
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