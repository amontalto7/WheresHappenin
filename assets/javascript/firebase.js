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
  var state = $(".loginLink").attr("data-state");
  if (state === "signedout"){

  function newLoginHappened(user) {
    if (user) {
      // User is signed in
      $(".loginLink").attr("data-state","signedin");
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }

  firebase.auth().onAuthStateChanged(newLoginHappened);

} else {
  signOut();
}

}

function signOut() {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      $(".loginLink").empty();
      $(".loginLink").html("<a href='#'>Login</a>");
      $(".loginLink").attr("data-state","signedout");
      // $(".userInfo").empty();
    })
    .catch(function(error) {
      console.log(error);
    });
}

function app(user) {
  console.log(user);
  // $(".loginLink").html("Welcome "+user.displayName+"! " + "<a href='#'>Sign out</a>");
  var welcomeText = $("<span>").text("Welcome! ");
  var signOut = $("<a href='#'>").text("Sign Out");
  $(".loginLink").append(welcomeText);
  $(".loginLink").append(signOut);

  // var userText = $("<p>").text("Welcome ");
  // var uName = $("<span>").text(user.displayName + "!");
  // userText.append(uName);
  // $(".userInfo").append(userText);
  // $("#clientName").html(user.displayName + "!");
}

$(document).ready(function() {
  $(".loginLink").on("click",login);
  // $("#signoutLink").on("click",signOut);
});

