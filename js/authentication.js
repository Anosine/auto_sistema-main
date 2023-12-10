//Tikrina ar naudotojas yra prisijungęs, jei yra patikrina jo rolę.

//Config iš Config.js failo
var poolData = {
  UserPoolId: _config.cognito.userPoolId,
  ClientId: _config.cognito.userPoolClientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
AWS.config.region = _config.cognito.region; 


$(document).ready(function () {
 // Check if the user is authenticated
 var cognitoUser = getUserFromLocalStorage();
 if (cognitoUser) {

    // User is authenticated, change what is displayed:
    profileImageElement.src = 'images/userLogged.jpg'
    logoutIcon.style.display = 'inline-block';
    logoutLink.style.display = 'inline-block';

    profileIcon.style.display = "inline-block";
    profileLink.style.display = "inline-block";

    loginIcon.style.display = "none";
    loginLink.style.display = "none";

    var allowedURLs = ["https://www.autovaldymas.link/getcars", "http://127.0.0.1:5500/getcars.html"];
    if (allowedURLs.includes(window.location.href)) {
    getAllCars();
    }
   
 } else {
     profileImageElement.src = 'images/user.jpg'
     logoutIcon.style.display = 'none';
     logoutLink.style.display = 'none';

     profileIcon.style.display = "none";
     profileLink.style.display = "none";

     loginIcon.style.display = "inline-block";
     loginLink.style.display = "inline-block";
   // User is not authenticated, handle accordingly (e.g., redirect to login page)
   console.log('User not authenticated');
 }

}); 

function getUserFromLocalStorage() {
 // Tikrina ar yra toks vartotojas
 var cognitoUser = userPool.getCurrentUser();

 return cognitoUser;
}


// Atsijungimas:
logoutLink.addEventListener('click', logout);
function logout() {
  // Sign out the user
  cognitoUser.signOut();

  // Redirect to the login page or perform any other desired action
  window.location.href = 'login.html';
}






