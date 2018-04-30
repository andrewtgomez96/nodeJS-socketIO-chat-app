/*
Our Google API key: AIzaSyCCMdJYDCf_gZ5O9AODdeEe1NMBXx9jj8w
*/
//Gets the user's location
var userCounty;
var countyList = ["Los Angeles County","Orange County","Riverside County","San Diego County","San Bernardino County",
                         "Kern County","Ventura County","Santa Barbara County","San Luis Obispo County","Imperial County"];
var pos;
var crd;
var longi = 33.8728111;
var lati = -117.84871449999999;
var geocoder;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition,error,options);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function savePosition(position) {
pos = position;
crd = pos.coords;
longi = crd.longitude;
lati = crd.latitude;
county = decodeGeoLocation(geocoder, position)
}

function error() {
    alert("Unable to get your location");
}


function decodeGeoLocation(dgeocoder,position) {
    //position from getLocation used to get lat and long
    var latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
    //uses the lat and long to decode the location and places a list of addresses into results
    dgeocoder.geocode({'location': latlng}, function(results, status) {
        if (status == 'OK') {
            //finds the county
            var county = 'NONE';
            for (var i = 0; i < results.length; i++) {
								var rtypes = results[i].types;
								for (var j = 0; j < rtypes.length; j++) {
										if (rtypes[j] == "administrative_area_level_2")
												county = results[i].formatted_address;
								}
						}
            county = county.substring(0,county.indexOf(","));
            if (county != 'NONE')
                return county;
        }
    });
}

//this function is called with the google API
function getUserLocation() {
    var geocoder = new google.maps.Geocoder;
    getLocation();
    //userCounty = decodeGeoLocation(geocoder, position);
}

function manualUserPrompt() {
    var manCounty = prompt("Please enter your county:","Orange County");
    while (!checkCounty(tCounty)) {
        alert("Please choose a valid Southern California County");
        manCounty = prompt("Please enter your county:","Orange County");
    }
    county = manCounty;
}

function checkCounty(var tCounty) {
    var found = false;
    for (var c = 0; c < countyList.length; c++) {
        if (tCounty == countyList[c])
            found = true;
    }
    return found;
}
