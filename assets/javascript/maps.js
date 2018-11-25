// DOCUMENTATION: https://leafletjs.com/reference-1.3.4.html
// note: Leaflet uses items from MapBox
// MapBox default public token: pk.eyJ1IjoiYW1vbnRhbHRvIiwiYSI6ImNqb2Q3OTZvNDJsb3ozcG5sbXB3OTh5c2YifQ.uPEo7wdSsxNN4g5APp1Z4Q
// MapBox token for this WheresHappenin project: USE THIS ONE
// pk.eyJ1IjoiYW1vbnRhbHRvIiwiYSI6ImNqb2Q3Y2I4MDB2OWkzcG4ybnp2bzJnenoifQ.On1P5Xmo3zQb7OQQANE9YA

// initialize map
var mymap
 = L.map("mapid").setView([51.505, -0.09], 13);

// lisener to check if user location is available
 function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng)
    .addTo(mymap)
    .bindPopup("You are within " + radius + " meters from this point")
    .openPopup();

  L.circle(e.latlng, radius).addTo(mymap);
  
  var coordinates=[e.latlng.lat,e.latlng.lng];
  displayAll(coordinates);
}

mymap.on("locationfound", onLocationFound);

function onLocationError(e) {
  console.log(e.message);
}

mymap.on("locationerror", onLocationError);

 mymap.locate({setView: true, maxZoom: 16});
// console.log(mymap);

// CREATE A TILE LAYER - (Street view, satellite view, etc)
L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets", // street view
    //   id: "mapbox.satellite",          // satellite view
    accessToken:
      "pk.eyJ1IjoiYW1vbnRhbHRvIiwiYSI6ImNqb2Q3Y2I4MDB2OWkzcG4ybnp2bzJnenoifQ.On1P5Xmo3zQb7OQQANE9YA"
  }
).addTo(mymap);

// ADD LOCATION MARKER
// create a layer group for all markers, called markerGroup. Then create a layer for restaurant/event markers
var markerGroup = L.layerGroup().addTo(mymap);
var restaurantGroup = L.layerGroup().addTo(mymap);

// create icons for restaurants (rIcon) and events (eIcon), which inherit properties from L.Icon
var customIcon = L.Icon.extend({
  options: {
    iconSize: [40, 42], // size of the icon
    shadowUrl: "https://unpkg.com/leaflet@1.3.4/dist/images/marker-shadow.png",
    shadowAnchor: [12, 22] // where to anchor shadow image
  }
});

var rIcon = new customIcon({ iconUrl: "icons8-marker-40red.png" });
var eIcon = new customIcon({ iconUrl: "icons8-marker-40blue.png" });

//-------------------------------------------------------------

mymap.on("click", onMapClick);

// URL to look up Latitude & Longitude of an address
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI
const geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?";
const gKey = "AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI";
// or
var g_address = "500+W+120th+St,+New+York,+NY";

function convertAddress(obj, i) {
  // Pass in google GeoCode object, and index if necessary
  // returns an array of latitude, longitude

  if (!i) {
    i = 0;
  }

  // var coords = [
  // set global array to the obtained coordinates so they can be used by other APIs
  globalPlace.coords = [
    obj.results[i].geometry.location.lat, // latitude
    obj.results[i].geometry.location.lng // longitude
  ];

  globalPlace.name = obj.results[i].formatted_address;

  //   console.log("latitude: "+ coords[0]);
  //   console.log("longitude: "+ coords[1]);
  return globalPlace.coords;
}

function addMarker(place, layer) {
  var coords = place.coords;
  var name = place.name;
  var address = place.address;

  var marker = L.marker(coords).addTo(layer);
  marker.bindPopup("<b>" + name + "</b><br>" + address);
}

function addRMarker(place, layer) {
  var coords = place.coords;
  var name = place.name;
  var address = place.address;
  var marker = L.marker(coords, { icon: rIcon }).addTo(layer);
  marker.bindPopup("<b>" + name + "</b><br>" + address);
}

function addEMarker(place, layer) {
  var coords = place.coords;
  var name = place.name;
  var address = place.address;
  var marker = L.marker(coords, { icon: eIcon }).addTo(layer);
  marker.bindPopup("<b>" + name + "</b><br>" + address);
}

function displayAll(coordinates){
  displayRestaurants(coordinates);
  displayEvent(coordinates);
}

function updateMap(geoData) {
  console.log(geoData);
  var coordinates = convertAddress(geoData);

  mymap.setView(coordinates, 14);

  // clear previous markers
  markerGroup.clearLayers();
  restaurantGroup.clearLayers();
  // add new marker
  addMarker(globalPlace, markerGroup);
  displayAll(coordinates);
}