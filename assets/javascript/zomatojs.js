function buildZomatoURL(coords) {
  // https://developers.zomato.com/api/v2.1/search?entity_type=zone&count=5&lat=40.6966538&lon=-73.83308439999999
  // &radius=500&sort=real_distance&order=asc

  // base queryURL
  var queryURL = "https://developers.zomato.com/api/v2.1/search?";
  // Begin building an object to contain our API call's query parameters
  var queryParams = { count: 10 };

  // Grab the datavalue from the button clicked
  queryParams.entity_id = 280;
  queryParams.entity_type = "zone";
  queryParams.lat = coords[0];
  queryParams.lon = coords[1];
  queryParams.radius = 1000;
  queryParams.sort="real_distance";
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
          //  console.log(results[i].restaurant.name)
          //  console.log(results[i].restaurant.location.address)
          //  console.log(results[i].restaurant.menu_url)
          //  console.log(results[i].restaurant.cuisines)
          //  console.log(results[i].restaurant.average_cost_for_two)
          var restID = results[i].restaurant.id;

          var restCard = $("<div>");
           var restCardClasses = "restaurantCard restaurantCard"+i;
           restCard.addClass(restCardClasses)
           restCard.attr("id","restur"+i);

            var modalTriggerUL = $("<ul>");
            modalTriggerUL.addClass("collection");
              var modalTriggerLI = $("<li>");
              modalTriggerLI.addClass("collection-item");

          // create elements to display restaurant info
                var displayRestName = $("<a>");
                displayRestName.addClass("resname modal-trigger");
                displayRestName.attr("href","#modal"+i);
                displayRestName.text(results[i].restaurant.name);
                
                var zomatolistdiv = $("<div>");
                zomatolistdiv.attr("id","zomatolist"+i);

                // zomatolistdiv.append(favIconLink);

                // var restAddress = $("<p>");
                // restAddress.addClass("restAddress");
                // restAddress.html(results[i].restaurant.location.address); 

                var restCost = $("<p>");
                restCost.addClass("restCost");
                restCost.html("Cost for two: $" +results[i].restaurant.average_cost_for_two);


              // append restaurant info to LI tags
              modalTriggerLI.append(displayRestName, zomatolistdiv, restCost);

            // append LI tag to UL collection
            modalTriggerUL.append(modalTriggerLI);
           // append UL collection to restCard
           restCard.append(modalTriggerUL);
          // add the restCard to the page
           $("#zomatofile").append(restCard);

          //  Modal info 
            var modalCard = $("<div>");
            modalCard.attr("id","modal"+i);
            modalCard.addClass("modal bottom-sheet");

              var modalContent = $("<div>");
              modalContent.addClass("modal-content");
                
                var modalRestName = $("<a>");
                modalRestName.addClass("restName modalName");
                modalRestName.attr("href", results[i].restaurant.menu_url);
                modalRestName.attr("target", "_blank");
                modalRestName.html(results[i].restaurant.name);                

                var favIconLink = $("<a>");
                favIconLink.attr("href","#!");
                favIconLink.attr("data-id",restID);
                favIconLink.attr("data-type","Restaurant")
                favIconLink.addClass("secondary-content waves-effect waves-light btn-small-flat fav");

                  var favIcon = $("<i>");
                  favIcon.addClass("material-icons");
                  favIcon.text("star");

                favIconLink.append(favIcon);


                var locationIcon = $("<i>");
                locationIcon.addClass("material-icons");
                locationIcon.text("location_on");

                var restAddress = $("<p>");
                restAddress.addClass("restAddress");
                restAddress.html(results[i].restaurant.location.address); 
                restAddress.prepend(locationIcon);

                var cuisineIcon = $("<i>");
                cuisineIcon.addClass("material-icons");
                cuisineIcon.text("restaurant_menu");

                var restCuisine = $("<p>");
                restCuisine.addClass("restCuisine");
                restCuisine.html("Cuisine: "+results[i].restaurant.cuisines);
                restCuisine.prepend(cuisineIcon);

                var costIcon = $("<i>");
                costIcon.addClass("material-icons");
                costIcon.text("attach_money");

                var mRestCost = $("<p>");
                mRestCost.addClass("mRestCost");
                mRestCost.html("Cost for two: $" +results[i].restaurant.average_cost_for_two);
                mRestCost.prepend(costIcon);


              modalContent.append(modalRestName,favIconLink,$("<hr>"),restAddress,restCuisine,mRestCost);

              // var modalFooter = $("<div>");
              // modalFooter.addClass("modal-footer");

                // var modalAgree = $("<a>");
                // modalAgree.addClass("modal-action modal-close waves-effect waves-green btn-flat");
                // modalAgree.attr("href", "#!");
                // modalAgree.text("Agree");

              // modalFooter.append(modalAgree);
            modalCard.append(modalContent)

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
         $('.modal').modal();  // initialize modals
         locations.forEach(function(element) {
          addRMarker(element,restaurantGroup);
         });
     });

         
   }
