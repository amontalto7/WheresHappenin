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

  function addFavoriteToFB(e){

    var UID = getCurrentUser();
    var itemType = $(e).attr("data-type");
    var itemID = $(e).attr("data-id"); 
    database.ref("/Favorites/"+UID+"/"+itemType).push({
          id  : itemID
    });
  }

  function removeFavorite(e){
    var UID = getCurrentUser();
    var itemType = $(e).attr("data-type");
    // database.ref("/Favorites/"+UID+"/"+itemType).remove()
  }

  // function to handle clicking on Favorite icon
  $(document).on("click", ".fav", function() {
    var isFavorite = $(this).hasClass("favorited");
    if (isFavorite) {
      removeFavorite(this);
    } else {
      addFavoriteToFB(this);
    }

    $(this).toggleClass("favorited");
  });
});

// Google Geolocation / geocoding API Key: AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI
