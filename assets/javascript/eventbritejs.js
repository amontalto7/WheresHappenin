 
 // Eventbrite API key TIAV75OSYBH2MPVU3O2B
 // use token=TIAV75OSYBH2MPVU3O2B

 function buildEventSearchURL(coords) {
  // https://www.eventbriteapi.com/v3/events/search/?location.within=1km&
  // location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&
  // token=TIAV75OSYBH2MPVU3O2B
  var queryURL = "https://www.eventbriteapi.com/v3/events/search/?";
  var dateformat = 'YYYY-MM-DD';
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
 
 var queryParams = "location.within=1km&location.latitude="
                  + coords[0] +
                  "&location.longitude=" 
                  + coords[1] +
                 "&start_date.range_start=" + startDate +
                 "&token=" +token; 
 
  console.log("---------------\nEventBright Search URL: " + queryURL + "\n---------------");
  console.log(queryURL + queryParams);
  return queryURL + queryParams;

 }

 function displayEvent(coords) {

  var queryURL = buildEventSearchURL(coords)

    $.ajax({
          // url: "https://www.eventbriteapi.com/v3/events/search/?location.within=1km&location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&token=TIAV75OSYBH2MPVU3O2B",
           url: queryURL,
           method: "GET",
           dataType: "json",
         }).then(function(response) {
           console.log(response);
       
         var results = response.events;
         console.log(results);
  
         
      $("#eventbrite").empty();
      var locations = [];
    for (var i = 0; i < 5; i++) {
    //  console.log(results[i].name.text)
    //  console.log(results[i].url)
    //  console.log(results[i].start.local)

      var startTime = moment(results[i].start.local).format('MMMM Do YYYY, h:mm')

      var eventCard = $("<div class='eventsCard'>");

      var name = results[i].name.text
      eventCard.append("<a id='eventName' href="+results[i].url+">"+name+ "</a>");
      eventCard.append("<div class='eventStart'>Time: "+startTime+"</div>");

      $("#eventbrite").append(eventCard);

        var venue = results[i].venue_id

        // Add latitude / longitude info from each event into an array of coordinates
        var lat = "0"// need ajax call for venue id
        var lng = "0"// need ajax call for venue id
        

        var eCoords = [lat,lng];

         var eventInfo = {
           coords : eCoords,
           name : name,
           address : address
         }

        //  locations.push(restaurantInfo);

    };

    });

  };
   
    // displayEvent();


 