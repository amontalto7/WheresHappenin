function display() {

 $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?count=10&lat=40.7648&lon=-73.9808&radius=1000",
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
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].restaurant.name)
          console.log(results[i].restaurant.location.address)
          console.log(results[i].restaurant.menu_url)
          console.log(results[i].restaurant.cuisines)
          console.log(results[i].restaurant.average_cost_for_two)

          var restCard = $("<div class='restaurantCard'>");
          // newCard.text(results[i].restaurant.name);
          restCard.append("<a id='restName' href="+results[i].restaurant.menu_url+">"+results[i].restaurant.name+ "</a>");
          restCard.append("<div class='restAddress'>Address: "+results[i].restaurant.location.address+"</div>");
          restCard.append("<div class='restCuisine'>Cuisine: "+results[i].restaurant.cuisines+"</div>");
          restCard.append("<div class='restCost'>Cost for two: "+results[i].restaurant.average_cost_for_two+"</div>");

          $("#zomato").append(restCard);

        

        }
    });
  }

display();


