// Zomato - restaurants
// API key - 495fd465b1df3b6ee70c8cd31b998836
// $(document).ready(function(){
// $('.modal').modal();
// })

var globalPlace = {
  coords: [],
  name: "",
  address: ""
};

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
  // https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=5&lat=40.6966538&lon=-73.83308439999999
  // &radius=500&sort=real_distance&order=asc

  // base queryURL
  var queryURL = "https://developers.zomato.com/api/v2.1/search?";
  // Begin building an object to contain our API call's query parameters
  var queryParams = { count: 100 };

  // Grab the datavalue from the button clicked
  queryParams.entity_id = 280;
  queryParams.entity_type = "zone";
  queryParams.lat = coords[0];
  queryParams.lon = coords[1];
  queryParams.radius = 1000;
  // queryParams.sort="real_distance";
  queryParams.collection_id = 1;
  queryParams.sort = "rating";
  queryParams.order = "asc;";

  // get the limit
  //   queryParams.limit = limit;

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nZomato URL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

function displayRestaurants(coords) {
  var queryURL = buildZomatoURL(coords);
  console.log("zomato URL: " + queryURL);
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
           var restCard = $("<div id=restur1 class='restaurantCard"+[i]+"'>");
           restCard.append("<li class='collection-item modal-trigger' href='#modal"+[i]+"'><a id='resname'>"+results[i].restaurant.name+ " </a> <div id='zomatolist"+[i]+"> <a href='#!' class='secondary-content waves-effect waves-light btn-small-flat'><i class='material-icons'>favorite_border</i></a>");
           restCard.append("<div class='restAddress'>Address: "+results[i].restaurant.location.address+"</div>");
           restCard.append("<div class='restCuisine'>Cuisine: "+results[i].restaurant.cuisines+"</div>");
           restCard.append("<div class='restCost'>Cost for two: "+results[i].restaurant.average_cost_for_two+"</div></li>");
           
           $("#zomatofile").append(restCard);

          //  Modal info 
          var modalCard = $("<div id='modal"+[i]+"' class='modal bottom-sheet'>");
          modalCard.append("<div class='modal-content'> <a id='restName' href=" + results[i].restaurant.menu_url + ">" +results[i].restaurant.name +"</a></div>");
          modalCard.append("<div class='modal-footer'><a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Agree</a></div>")

          $("#modalCards").append(modalCard);


          

        




           
           // Add latitude / longitude info from each restaurant into an array of coordinates
           var lat = results[i].restaurant.location.latitude;
           var lng = results[i].restaurant.location.longitude;
           var name = results[i].restaurant.name;
           var address = results[i].restaurant.location.address;

           var rCoords = [lat,lng];

            var restaurantInfo = {
              coords : rCoords,
              name : name,
              address : address
            }

            locations.push(restaurantInfo);

          //  addMarker(coordinates,restaurantGroup);
 
         }
         locations.forEach(function(element) {
          addRMarker(element,restaurantGroup);
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
      console.log("queryUrl: " + queryURL);

      $.ajax({
        url: queryURL,
        headers: {
          Accept: "image/*"
        },
        method: "GET"
      }).then(updateMap);
    }
  });

  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    //  alert("Ready");
      console.log(modal, trigger);
    },
    complete: function() { //alert('Closed');
    } // Callback for Modal close
  }
);

  // function to handle clicking on Favorite icon
  $(document).on("click", ".fav", function() {
    if ($(this).attr("data-state") === "hate") {
      $(this).empty();
      $(this).text("favorite");
      $(this).attr("data-state", "love");
      // addFavorite($(this).attr("data-id"));
    } else {
      $(this).empty();
      $(this).text("favorite-border");
      $(this).attr("data-state", "hate");
      // removeFavorite($(this).attr("data-id"));
    }
  });
});

// Google Geolocation / geocoding API Key: AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI
