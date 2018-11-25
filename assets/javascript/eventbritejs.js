// Eventbrite API key TIAV75OSYBH2MPVU3O2B
// use token=TIAV75OSYBH2MPVU3O2B

function buildEventSearchURL(coords) {
  // https://www.eventbriteapi.com/v3/events/search/?location.within=1km&
  // location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&
  // token=TIAV75OSYBH2MPVU3O2B
  var queryURL = "https://www.eventbriteapi.com/v3/events/search/?";
  var dateformat = "YYYY-MM-DD";
  // var startdate = moment().add(1, 'week');
  // startdate.format(dateformat);
  // startdate = startdate + "T00%3A00%3A00";
  var startDate = "2018-11-28T00%3A00%3A00";
  const token = "TIAV75OSYBH2MPVU3O2B";

  // var queryParams = {
  //   location : {
  //     within: "1km",
  //     latitude : coords[0],
  //     longitude: coords[1]
  //   },
  //   start_date : {
  //     range_start : today
  //   },
  //   token: token
  // };

  var queryParams =
    "location.within=3km&location.latitude=" +
    coords[0] +
    "&location.longitude=" +
    coords[1] +
    "&start_date.range_start=" +
    startDate +
    "&token=" +
    token;

  console.log(
    "---------------\nEventBright Search URL: " + queryURL + "\n---------------"
  );
  console.log(queryURL + queryParams);
  return queryURL + queryParams;
}

function displayEvent(coords) {
  var queryURL = buildEventSearchURL(coords);

  $.ajax({
    // url: "https://www.eventbriteapi.com/v3/events/search/?location.within=1km&location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&token=TIAV75OSYBH2MPVU3O2B",
    url: queryURL,
    method: "GET",
    dataType: "json"
  }).then(function(response) {
  //  console.log(response);

    var results = response.events;
    console.log("events:");
   console.log(results);

    $("#eventbrite").empty();
    var locations = [];
    var venueIDs = [];
    var eventNames = [];
    // var displayFive = results.slice(0, 5);
    for (var i = 0; i < 10; i++) {
      //  console.log(results[i].name.text)
      //  console.log(results[i].url)
      //  console.log(results[i].start.local)

      var startTime = moment(results[i].start.local).format(
        "MMMM Do YYYY, h:mm"
      );

      var eventCard = $("<div>");
      eventCard.addClass("eventsCard");

      var name = results[i].name.text;
      var vID = results[i].venue_id;
      var venueInfo = {
        venueID : vID,
        eventName : name
      };
      venueIDs.push(venueInfo);

      var modalTriggerUL = $("<ul>");
      modalTriggerUL.addClass("collection");
        var modalTriggerLI = $("<li>");
        modalTriggerLI.addClass("collection-item");

    // create elements to display event info
          var displayEventName = $("<a>");
          displayEventName.addClass("eventName modal-trigger");
          displayEventName.attr("href","#emodal"+i);
          displayEventName.text(name);

          var eventListDiv = $("<div>");
          eventListDiv.attr("id","eventList"+i);


          eventListDiv.append(favIconLink);

          var eventStartTime = $("<p>");
          eventStartTime.addClass("eventStart");
          eventStartTime.text("Time: " + startTime);

            // append event info to LI tags
          modalTriggerLI.append(displayEventName,eventListDiv,eventStartTime);
            // append LI tag to UL collection
          modalTriggerUL.append(modalTriggerLI);
           // append UL collection to eventCard

        eventCard.append(modalTriggerUL);

      // eventCard.append("<li class='collection-item'><a id='eventName' href=" + results[i].url + ">" + name + "</a> <div id='eventList"+[i]+"> <a class='secondary-content waves-effect waves-light btn-small-flat'><i class='material-icons'>favorite_border</i></a>");
      // eventCard.append("<div class='eventStart'>Time: " + startTime + "</div> </li>");


      $("#eventbrite").append(eventCard);

                //  Modal info 
                var modalCard = $("<div>");
                modalCard.attr("id","emodal"+i);
                modalCard.addClass("modal bottom-sheet");
    
                  var modalContent = $("<div>");
                  modalContent.addClass("modal-content");
                    
                    var modalEventName = $("<a>");
                    modalEventName.addClass("eventName");
                    modalEventName.attr("href", results[i].url);
                    modalEventName.attr("target", "_blank");
                    modalEventName.text(name);                

                    var favIconLink = $("<a>");
                    favIconLink.attr("href","#!");
                    favIconLink.addClass("secondary-content waves-effect waves-light btn-small-flat fav");
        
                      var favIcon = $("<i>");
                      favIcon.addClass("material-icons");
                      favIcon.text("star");
        
                    favIconLink.append(favIcon);
        
    
                  modalContent.append(modalEventName, favIconLink);
    
                  // var modalFooter = $("<div>");
                  // modalFooter.addClass("modal-footer");
    
                  //   var modalAgree = $("<a>");
                  //   modalAgree.addClass("modal-action modal-close waves-effect waves-green btn-flat");
                  //   modalAgree.attr("href", "#!");
                  //   modalAgree.text("Agree");
    
                  // modalFooter.append(modalAgree);
                // modalCard.append(modalContent,modalFooter)
    
              $("#modalCards").append(modalCard);
    




// Get the cost
// for reference event with cost: https://www.eventbriteapi.com/v3/events/49212779749/ticket_classes/?token=TIAV75OSYBH2MPVU3O2B 

// -----------------
// EVENT ID IS HERE:
  var eventID = results[i].id;
// -----------------

  //    $.ajax({
  //   url: "https://www.eventbriteapi.com/v3/events/" + eventID + "/ticket_classes/?token=TIAV75OSYBH2MPVU3O2B",
  //   url: "https://www.eventbriteapi.com/v3/events/49212779749/ticket_classes/?token=TIAV75OSYBH2MPVU3O2B",
  //      method: "GET",
  //      dataType: "json"
  //    }).then(function(response) {
  //     console.log(response);
  //    var priceEvent = response.ticket_classes[0].cost.display;
  //     console.log(priceEvent)

   //   if (priceEvent === null ) {
    //   eventCard.append("<div class='eventPrice'>Price: " + priceEvent + "</div>") }
    // else {
    // eventCard.append("<div class='eventPrice'>Price: free</div>") }
   
  //    })
  // }  

  
  
// console.log("VenueInfo");
// console.log(venueIDs);
    // 2nd ajax call to get venue information
    venueIDs.forEach(function(element) {
      // console.log("Element");
      // console.log(element);
    // for (var i = 0; i < venueIDs.length; i++) {
      $.ajax({
        // url: "https://www.eventbriteapi.com/v3/events/search/?location.within=1km&location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&token=TIAV75OSYBH2MPVU3O2B",
        url:
          "https://www.eventbriteapi.com/v3/venues/" +
          element.venueID +
          "/?token=TIAV75OSYBH2MPVU3O2B",
        method: "GET",
        dataType: "json"
      }).then(function(response) {
       console.log(response);

        var latitude = response.latitude;
        var longitude = response.longitude;
        var address = response.address.localized_address_display;
        var venuename = response.name;

        // console.log(latitude);
        // console.log(longitude);

        var eCoords = [latitude, longitude];
        var eventInfo = {
          coords: eCoords,
          name: element.eventName + " @ " + venuename,
          address: address
        };
        // locations.push(eventInfo);
        // add markers to map

        addEMarker(eventInfo, restaurantGroup);
      });
    });
  };
  $('.modal').modal();  // initialize modals
});
}

// displayEvent();
