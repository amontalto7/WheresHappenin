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
  var startDate = "2018-11-24T00%3A00%3A00";
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
    console.log(response);

    var results = response.events;
    console.log(results);

    $("#eventbrite").empty();
    var locations = [];
    var venueIDs = [];
    var eventNames = [];
    var displayFive = results.slice(0, 5);
    for (var i = 0; i < displayFive.length; i++) {
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
      eventCard.append(
        "<a id='eventName' href=" + results[i].url + ">" + name + "</a>"
      );
      eventCard.append("<div class='eventStart'>Time: " + startTime + "</div>");

      $("#eventbrite").append(eventCard);

    }
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
  });
}

// displayEvent();
