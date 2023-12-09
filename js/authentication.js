//Tikrina ar naudotojas yra prisijungęs, jei yra patikrina jo rolę.

//Config
var poolData = {
    UserPoolId: 'eu-west-1_xMUJNas4X',
    ClientId: '73m7mlkjaajhdqi0ie9u570qht'
  }; 
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
AWS.config.region = 'eu-west-1'; 


$(document).ready(function () {
 // Check if the user is authenticated
 var cognitoUser = getUserFromLocalStorage();
 if (cognitoUser) {
    profileImageElement.src = 'images/userLogged.jpg'
   // User is authenticated, call the function
   getAllCars();
 } else {
     profileImageElement.src = 'images/user.jpg'
   // User is not authenticated, handle accordingly (e.g., redirect to login page)
   console.log('User not authenticated');
 }

}); 

function getUserFromLocalStorage() {
 // Implement this function to retrieve the user from local storage or session
 // Use the Cognito SDK to check if the user is authenticated
 // For example:
 var cognitoUser = userPool.getCurrentUser();

 return cognitoUser;
}

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Assume the user is already authenticated and you have a CognitoUser object
var cognitoUser = userPool.getCurrentUser();

if (cognitoUser !== null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.log(err);
        return;
      }
  
      // Fetch user attributes
      cognitoUser.getUserAttributes(function (err, attributes) {
        if (err) {
          console.log(err);
         
          return;
          
        }
  
        // Display user attributes in the profile-container
        var profileContainer = document.getElementById('profile-container');
        attributes.forEach(function (attribute) {
          var attributeName = attribute.getName();
          var attributeValue = attribute.getValue();
  
          // Display each attribute in the container
          var attributeElement = document.createElement('div');
          attributeElement.innerHTML = `<strong>${attributeName}:</strong> ${attributeValue}`;
          profileContainer.appendChild(attributeElement);
        });
  
        // Allow the user to update their attributes
        var updateButton = document.createElement('button');
        updateButton.innerHTML = 'Update Profile';
        updateButton.addEventListener('click', function () {
          // Redirect or open a modal for the user to update their profile
          // Example: window.location.href = 'updateProfile.html';
          console.log('Update profile button clicked');
        });
        profileContainer.appendChild(updateButton);
      });
    });
  }