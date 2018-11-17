 
 // Eventbrite API key TIAV75OSYBH2MPVU3O2B
 // use token=TIAV75OSYBH2MPVU3O2B

 function displayEvent() {

    $.ajax({
           url: "https://www.eventbriteapi.com/v3/events/search/?location.within=1km&location.latitude=40.7648&location.longitude=-73.9808&start_date.range_start=2018-11-20T00%3A00%3A00&token=TIAV75OSYBH2MPVU3O2B",
           method: "GET",
           dataType: "json",
         }).then(function(response) {
           console.log(response);
       
         var results = response.events;
         console.log(results);
  
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].name.text)
      console.log(results[i].url)
      console.log(results[i].start.local)

      var startTime = moment(results[i].start.local).format('MMMM Do YYYY, h:mm')

      var eventCard = $("<div class='eventsCard'>");

      eventCard.append("<a id='eventName' href="+results[i].url+">"+results[i].name.text+ "</a>");
      eventCard.append("<div class='eventStart'>Time: "+startTime+"</div>");

      $("#eventbrite").append(eventCard);

    };

    });

  };
   
    displayEvent();


 