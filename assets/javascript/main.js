// Zomato - restaurants
// API key - 495fd465b1df3b6ee70c8cd31b998836

var globalPlace = {
  coords : [],
  name : ""
}

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

function buildZomatoURL(coords) {
  // base queryURL
  var queryURL = "https://developers.zomato.com/api/v2.1/search?";
  // Begin building an object to contain our API call's query parameters
  var queryParams = { count: 5 };

  // Grab the datavalue from the button clicked
  queryParams.lat = coords[0];
  queryParams.lon = coords[1];
  queryParams.radius = 500;

  // get the limit
  //   queryParams.limit = limit;

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nZomato URL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}


function displayRestaurants(coords) {
  var queryURL = buildZomatoURL(coords)
  console.log("zomato URL: "+ queryURL);
  $.ajax({
    //  url: "https://developers.zomato.com/api/v2.1/search?count=10&lat=40.7648&lon=-73.9808&radius=1000",
         url: queryURL,
         method: "GET",
         dataType: "json",
         headers: {
         "user-key": "495fd465b1df3b6ee70c8cd31b998836"
         }
       }).then(function(response) {
         console.log(response);
         console.log
         var results = response.restaurants;
         console.log(results);
         $("#zomato").empty();
         var locations = [];
         for (var i = 0; i < results.length; i++) {
           console.log(results[i].restaurant.name)
          //  console.log(results[i].restaurant.location.address)
          //  console.log(results[i].restaurant.menu_url)
          //  console.log(results[i].restaurant.cuisines)
          //  console.log(results[i].restaurant.average_cost_for_two)
 
           // newCard.text(results[i].restaurant.name);
           var restCard = $("<div class='restaurantCard'>");
           restCard.append("<a id='restName' href="+results[i].restaurant.menu_url+">"+results[i].restaurant.name+ "</a>");
           restCard.append("<div class='restAddress'>Address: "+results[i].restaurant.location.address+"</div>");
           restCard.append("<div class='restCuisine'>Cuisine: "+results[i].restaurant.cuisines+"</div>");
           restCard.append("<div class='restCost'>Cost for two: "+results[i].restaurant.average_cost_for_two+"</div>");
 
           $("#zomato").append(restCard);

           // Add latitude / longitude info from each restaurant into an array of coordinates
           var lat = results[i].restaurant.location.latitude;
           var lng = results[i].restaurant.location.longitude;
           var name = results[i].restaurant.name;
            var rCoords = [lat,lng];

            var restaurantInfo = {
              coords : rCoords,
              name : name
            }

            locations.push(restaurantInfo);

          //  addMarker(coordinates,restaurantGroup);
 
         }
         locations.forEach(function(element) {
          addMarker(element,restaurantGroup);
         });
     });
   }

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
  

// Google Geolocation / geocoding API Key: AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI

