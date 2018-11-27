// Initialize Firebase
var config = {
  apiKey: "AIzaSyBMEhgfhFIrC_YYgYVR2a2eA86TgGmsTgA",
  authDomain: "whereshappening-1541645493962.firebaseapp.com",
  databaseURL: "https://whereshappening-1541645493962.firebaseio.com",
  projectId: "whereshappening-1541645493962",
  storageBucket: "whereshappening-1541645493962.appspot.com",
  messagingSenderId: "538548590479"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
const database = firebase.database();

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  firebase.auth().signInWithRedirect(provider);

}

function getCurrentUser(){
  var user = firebase.auth().currentUser;
  console.log(user);
  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    })
  } else {
    // sign in as an anonymous user
    // firebaseAuth.signInAnonymously();
    // firebaseAuth.signInAnonymously().addOnCompleteListener(){   
      // getCurrentUser();
    // }
    return "0000";  // if no user is signed in and the recursive function failed, we return 0000;
  }
  return(user.uid);
  // return(user.providerData.uid);
}


function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      $(".loginLink").css("display", "block");
      $(".signoutLink").css("display", "none");
      // clear "Welcome" area
      $(".userWelcome").empty();
    })
    .catch(function(error) {
      console.log(error);
    });
}

function app(user) {
  // console.log(user);

  $(".loginLink").css("display", "none");
  $(".signoutLink").css("display", "block");
  var fullName = user.displayName;
  var splitName = fullName.split(" ");

  var welcomeText = $("<span>").text("Welcome ");
  welcomeText.append(splitName[0]+"!");
  $(".userWelcome").append(welcomeText)
}

function checkLoginStatus() {

  function newLoginHappened(user) {
    if (user) {
      // User is signed in
      app(user);
    } else {
      $(".loginLink").css("display", "block");
      $(".signoutLink").css("display", "none");
    }
  }


  firebase.auth().onAuthStateChanged(newLoginHappened);
}


function addFavoriteToFB(e){

  var UID = getCurrentUser();
  var itemType = $(e).attr("data-type");
  var itemID = $(e).attr("data-id"); 
  database.ref("/Favorites/"+UID).push({
        id  : itemID,
        type: itemType
  });
}

function removeFavorite(e){
  var UID = getCurrentUser();
  var itemType = $(e).attr("data-type");
  // database.ref("/Favorites/"+UID+"/"+itemType).remove()
}


$(document).ready(function() {
  $(".loginLink").on("click", login);
  $(".signoutLink").on("click", signOut);


  var userID = getCurrentUser()
  database.ref("/Favorites/"+userID)
    // .orderByChild("trainName")
    .on("value", function(snapshot) {
      var fvs = snapshot.val();
      console.log(fvs);

      if (snapshot.child("Event").exists()) {
        // TODO - AJAX CALL - get event by ID
        var eventID = snapshot.val().id;
        // alert(eventID);

      }
      if (snapshot.child("Restaurant").exists()) {
        // TODO - AJAX CALL - get restaurent by ID

      }

    });



});





window.onload = checkLoginStatus;