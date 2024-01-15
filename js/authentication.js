var globalUsername = "test";
var globalName= "test";
var globalRole= "test";
var globalTrip= "test";



// Config from Config.js file
var poolData = {
  UserPoolId: _config.cognito.userPoolId,
  ClientId: _config.cognito.userPoolClientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
AWS.config.region = _config.cognito.region;

// Get the user from local storage
var cognitoUser = getUserFromLocalStorage();

$(document).ready(function () {
  // Check if the user is authenticated
  if (cognitoUser) {
    // User is authenticated, change what is displayed:
    profileImageElement.src = 'images/userLogged.jpg'
    logoutIcon.style.display = 'inline-block';
    logoutLink.style.display = 'inline-block';

    profileIcon.style.display = "inline-block";
    profileLink.style.display = "inline-block";

    loginIcon.style.display = "none";
    loginLink.style.display = "none";

  } else {
    // User is not authenticated, handle accordingly (e.g., update the top banner)
    var topBanner = document.getElementById('topBanner');
    topBanner.innerText = 'Jums reikia prisijungti';

    profileImageElement.src = 'images/user.jpg'
    logoutIcon.style.display = 'none';
    logoutLink.style.display = 'none';

    profileIcon.style.display = "none";
    profileLink.style.display = "none";

    loginIcon.style.display = "inline-block";
    loginLink.style.display = "inline-block";

    console.log('User not authenticated');
  }
});

function checkRole(level)
{
  console.log ("Role", globalRole, ". Level=", level);
  if (globalRole>=level)
    return 1;
  else
    return 0;
}

function getUserFromLocalStorage() {
  // Check if there is a user in local storage
  var cognitoUser = userPool.getCurrentUser();
  //console.log(cognitoUser);
  return cognitoUser;
}

function updateGlobalUserData() {
  return new Promise((resolve, reject) => {
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          console.error('Error refreshing user session:', err);
          reject(err);
          return;
        }

        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Error fetching user attributes:', err);
            reject(err);
            return;
          }

          globalUsername = cognitoUser.username;
          globalName = findAttributeValue(attributes, 'name');
          globalRole = findAttributeValue(attributes, 'custom:Role');
          globalTrip = findAttributeValue(attributes, 'custom:Trip');
          console.log('User attributes:', attributes);
          console.log('Global user information updated:', {
            username: globalUsername,
            name: globalName,
            role: globalRole,
            trip: globalTrip,
          });

          resolve({
            username: globalUsername,
            name: globalName,
            role: globalRole,
            trip: globalTrip,
          });
        });
      });
    } else {
      reject(new Error('User not authenticated'));
    }
  });
}

// Function to initialize the application
async function initializeApp() {
  try {
    await updateGlobalUserData();
    console.log('Global username:', globalUsername);
    console.log('Global name:', globalName);
    console.log('Global role:', globalRole);
    console.log('Global trip:', globalTrip);

    // Update the top banner with user information
    var topBanner = document.getElementById('topBanner');
    topBanner.innerText = globalName ? 'Esate prisijungę': 'Jums reikia prisijungti';
  } catch (error) {
    console.error('Error initializing the application:', error.message);
  }
}

function userTripChange(trip)
{
  console.log(cognitoUser);
  var profileTrip = [];
  if (trip===1) {
    profileTrip.push({
      Name: 'custom:Trip',
      Value: '1' // Assuming the value should be a string
    });
  } else {
    profileTrip.push({
      Name: 'custom:Trip',
      Value: '0' // Assuming the value should be a string
    });
  }

  cognitoUser.updateAttributes(profileTrip, function (err, result) {
    if (err) {
      console.log(err);
      alert('Failed to update profile. Please try again.');
      return;
    }
    // Handle successful update if needed
  });
}

function findAttributeValue(attributes, name) {
  var attribute = attributes.find(attr => attr.getName() === name);
  return attribute ? attribute.getValue() : null;
}

// Atsijungimas:
function logout() {
  // Sign out the user
  cognitoUser.signOut();

  // Redirect to the login page or perform any other desired action
  window.location.href = 'login.html';
}
