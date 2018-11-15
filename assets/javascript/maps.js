// DOCUMENTATION: https://leafletjs.com/reference-1.3.4.html
// note: Leaflet uses items from MapBox
// MapBox default public token: pk.eyJ1IjoiYW1vbnRhbHRvIiwiYSI6ImNqb2Q3OTZvNDJsb3ozcG5sbXB3OTh5c2YifQ.uPEo7wdSsxNN4g5APp1Z4Q
// MapBox token for this WheresHappenin project: USE THIS ONE
// pk.eyJ1IjoiYW1vbnRhbHRvIiwiYSI6ImNqb2Q3Y2I4MDB2OWkzcG4ybnp2bzJnenoifQ.On1P5Xmo3zQb7OQQANE9YA

var mymap = L.map("mapid").setView([51.505, -0.09], 13);
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
// First, create a layer group for all markers, called markerGroup
var markerGroup = L.layerGroup().addTo(mymap);
var restaurantGroup = L.layerGroup().addTo(mymap);
// Then, add a new marker to the group, which gets added to the map
// var marker = L.marker([51.5, -0.09]).addTo(markerGroup);
// console.log("Marker Group:");
// console.log(markerGroup);
// If you want to remove all markers, clear the layer
//   markerGroup.clearLayers();

//-------------------------------------------------------------

// MAP EVENTS (test by clicking on the map)
var locationPopup = L.popup();

function onMapClick(e) {
  locationPopup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

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
  coordinates = [
    obj.results[i].geometry.location.lat, // latitude
    obj.results[i].geometry.location.lng // longitude
  ];

  //   console.log("latitude: "+ coords[0]);
  //   console.log("longitude: "+ coords[1]);
  return coordinates;
}

function addMarker(coords,layer) {
  var marker = L.marker(coords).addTo(layer);
  
}

function updateMap(geoData) {
  //   console.log(geoData);
  coordinates = convertAddress(geoData);

  mymap.setView(coordinates, 14);

  // clear previous markers
  markerGroup.clearLayers();
  restaurantGroup.clearLayers();
  // add new marker
  addMarker(coordinates,markerGroup);
  displayRestaurants();

  // alert (coordinates[0]+" : "+ coordinates[1]);
}

// var myUrl = buildQueryURL(g_address);
// var zipUrl = buildQueryURL("11418");

// var queryURL = myUrl;

