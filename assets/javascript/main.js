// Zomato - restaurants
// API key - 495fd465b1df3b6ee70c8cd31b998836

// AJAX specific for Zomato:
function display() {

    $.ajax({
           url: "https://developers.zomato.com/api/v2.1/search?lat=40.7648&lon=-73.9808&radius=1000", 
           // the url above will need to be modified. We will need to pull the latitude and longitude from the map
           method: "GET",
           dataType: "json",
           headers: {
           "user-key": "495fd465b1df3b6ee70c8cd31b998836"
           }
         }).then(function(response) {
           console.log(response);
           console.log
           var results = response.restaurants;
           for (var i = 0; i < results.length; i++) {
             console.log(results[i].restaurant.name)
             console.log(results[i].restaurant.location.address)
             console.log(results[i].restaurant.menu_url)
             console.log(results[i].restaurant.cuisines)
             console.log(results[i].restaurant.price_range)
   
           }
       });
     }
   
   display();

// Google Geolocation / geocoding API Key: AIzaSyDfe8FcVBVkJX2yP6vNEyjLGyxsJ_oJMGI

