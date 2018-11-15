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
// Then, add a new marker to the group, which gets added to the map
var marker = L.marker([51.5, -0.09]).addTo(markerGroup);
// console.log("Marker Group:");
// console.log(markerGroup);
// If you want to remove all markers, clear the layer
//   markerGroup.clearLayers();

//-------------------------------------------------------------
// ADD CIRCLE  - Maybe we can use this to highlight the selected radius
var circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500
}).addTo(mymap);

// ADD POLYGON
var polygon = L.polygon(
  [[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]
  // {color: 'green'}   // Color is blue by default
).addTo(mymap);

// POPUPS  (text information when clicking on elements)
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// General stand-alone popup when map loads
var popup = L.popup()
  .setLatLng([51.5, -0.09])
  .setContent("I am a standalone popup.")
  .openOn(mymap);

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

// var localUrl =

function buildQueryURL(address) {
  // base queryURL
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?";
  var API_KEY = "AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI";
  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { key: API_KEY };

  // Grab the datavalue from the button clicked
  queryParams.address = address;

  // get the limit
  //   queryParams.limit = limit;

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

function convertAddress(obj, i) {
  // Pass in google GeoCode object, and index if necessary
  // returns an array of latitude, longitude

  if (!i) {
    i = 0;
  }

  var coords = [
    obj.results[i].geometry.location.lat, // latitude
    obj.results[i].geometry.location.lng // longitude
  ];
  //   console.log("latitude: "+ coords[0]);
  //   console.log("longitude: "+ coords[1]);
  return coords;
}

function updateMap(geoData) {
  //   console.log(geoData);
  var coords = convertAddress(geoData);

  mymap.setView(coords, 14);

  // clear previous markers
  markerGroup.clearLayers();
  // add new marker
  var marker = L.marker(coords).addTo(markerGroup);
}

// var myUrl = buildQueryURL(g_address);
// var zipUrl = buildQueryURL("11418");

// var queryURL = myUrl;

$(document).ready(function() {
  // $("#search").on("click", function() {
    $("#search").on("keypress", function(e) {
    // alert(e.which);
    var key = e.which;
    if (key === 13) {
      event.preventDefault();
      // if enter key
      // var myAddress = $("#addressBox")
      var myAddress = $("#search")
        .val()
        .trim();

     var queryURL = buildQueryURL(myAddress);
      console.log('queryUrl: ' + queryURL);

      $.ajax({
        url: queryURL,
        headers: {
          Accept: "image/*"
        },
        method: "GET"
      }).then(updateMap);
    }
  });
});
