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
  function newLoginHappened(user) {
    if (user) {
      // User is signed in
      app(user);
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);    
    }
  }
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);

  $(".loginLink").css("display","none");
  $(".signoutLink").css("display","block");
  firebase.auth().onAuthStateChanged(newLoginHappened);


}

function signOut() {
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      $(".loginLink").css("display","block");
      $(".signoutLink").css("display","none");
      // clear "Welcome" area
    })
    .catch(function(error) {
      console.log(error);
    });
}

function app(user) {
  console.log(user);
  // $(".loginLink").html("Welcome "+user.displayName+"! " + "<a href='#'>Sign out</a>");
  var welcomeText = $("<span>").text("Welcome! ");
  welcomeText.append(user.displayName);

}

$(document).ready(function() {
  $(".loginLink").on("click",login);
  $(".signoutLink").on("click",signOut);

});

