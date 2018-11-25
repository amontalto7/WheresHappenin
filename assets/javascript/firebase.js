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

function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");

  firebase.auth().signInWithRedirect(provider);

  // function newLoginHappened(user) {
  //   if (user) {
  //     // User is signed in
  //     app(user);
  //   }
  // }
  // firebase.auth().onAuthStateChanged(newLoginHappened);
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
    })
    .catch(function(error) {
      console.log(error);
    });
}

$(document).ready(function() {
  $(".loginLink").on("click", login);
  $(".signoutLink").on("click", signOut);
  // firebase.auth().onAuthStateChanged(newLoginHappened);
});



function app(user) {
  console.log(user);

  $(".loginLink").css("display", "none");
  $(".signoutLink").css("display", "block");
  // $(".loginLink").html("Welcome "+user.displayName+"! " + "<a href='#'>Sign out</a>");
  var fullName = user.displayName;
  var splitName = fullName.split(" ");

  var welcomeText = $("<span>").text("Welcome! ");
  welcomeText.append(splitName[0]);
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
  // firebase.auth().getRedirectResult().then(function(result) {
  //     if (result.credential) {
  //       // This gives you a Google Access Token.
  //       var token = result.credential.accessToken;
  //       console.log(token);
  //     }
  //     var user = result.user;
  //     console.log("User info:");
  //     console.log(user);
  //   })
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     console.log(errorCode);
  //     console.log(errorMessage);
  //     console.log(email);
  //     console.log(credential);
  //   });



}

window.onload = checkLoginStatus;
