# Where's Happenin'
### Columbia Engineering Full Stack Bootcamp - GIPHY project - Homework # 6

This is a web app written with **AJAX**, **jQuery**, **Javascript**, **HTML** and **CSS**.

On load, it will attempt to use your current location to pull restaurants and events in your area.
Alternatively, you can search for a loction (either zip, city, exact address, etc), use date picker to select date range, which will pull restaurants from zomato and events from eventbrite.

It will then list details of each restaurant/event under the map, and populate the map with a marker representing it. 

Click on the name of a restaurant or event, and a modal shows displaying more information, and allows you to save it to your favorites, which stores the IDs of each restaurant / event in firebase.

Ideally, it should pull your favorites if you log in and populate the favorites section with your saved places.