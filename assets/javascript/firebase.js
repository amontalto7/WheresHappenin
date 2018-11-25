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

  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
      return(profile.uid);
    });
  } else {
    return "0000";
  }
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

$(document).ready(function() {
  $(".loginLink").on("click", login);
  $(".signoutLink").on("click", signOut);
});


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



window.onload = checkLoginStatus;