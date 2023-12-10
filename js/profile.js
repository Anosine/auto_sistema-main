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
      attributes.forEach(function (attribute) {
        var attributeName = attribute.getName();
        var attributeValue = attribute.getValue();

        // Update the corresponding container with user information
        switch (attributeName) {
          case 'name':
            nameContainer.style.display = 'block';
            document.getElementById('name').innerText = attributeValue;
            editNameInput.value = attributeValue; // Set initial value for editing
            break;
          case 'family_name':
            lastNameContainer.style.display = 'block';
            document.getElementById('lastName').innerText = attributeValue;
            editLastNameInput.value = attributeValue; // Set initial value for editing
            break;
          case 'email':
            emailContainer.style.display = 'block';
            document.getElementById('email').innerText = attributeValue;
            editEmailInput.value = attributeValue; // Set initial value for editing
            break;
          case 'custom:Role':
            roleContainer.style.display = 'block';
            document.getElementById('role').innerText = attributeValue;
            editRoleInput.value = attributeValue; // Set initial value for editing
            break;
          // Add additional cases for other attributes as needed
        }
      });
    });
  });
}

function editProfile() {
  var editProfileButton = document.getElementById('editProfileButton');
  editProfileButton.style.display = 'none';
  // Show the edit form and hide the display containers
  nameContainer.style.display = 'none';
  lastNameContainer.style.display = 'none';
  emailContainer.style.display = 'none';
  roleContainer.style.display = 'none';
  
  editForm.style.display = 'block';
}

function saveChanges() {
  // Get the edited values from the form
 
  var editedName = editNameInput.value.trim();
  var editedLastName = editLastNameInput.value.trim();
  var editedEmail = editEmailInput.value.trim();
  var editedRole = editRoleInput.value.trim();

  // Validate the edited values (you may add more validation as needed)
  if (!editedName || !editedLastName || !editedEmail || !editedRole) {
    alert('Please fill in all fields.');
    return;
  }

  // Prepare an array of attribute updates
  var attributeUpdates = [
    {
      Name: 'name',
      Value: editedName,
    },
    {
      Name: 'family_name',
      Value: editedLastName,
    },
    {
      Name: 'email',
      Value: editedEmail,
    },
    {
      Name: 'custom:Role',
      Value: editedRole,
    }
    // Add additional attributes as needed
  ];

  // Update the user attributes in Cognito
  cognitoUser.updateAttributes(attributeUpdates, function (err, result) {
    if (err) {
      console.log(err);
      alert('Failed to update profile. Please try again.');
      return;
    }

    // Update the UI to reflect the changes
    document.getElementById('name').innerText = editedName;
    document.getElementById('lastName').innerText = editedLastName;
    document.getElementById('email').innerText = editedEmail;
    document.getElementById('role').innerText = editedRole;

    // Hide the edit form and show the display containers
    nameContainer.style.display = 'block';
    lastNameContainer.style.display = 'block';
    emailContainer.style.display = 'block';
    roleContainer.style.display = 'block';
    editForm.style.display = 'none';

    alert('Profile updated successfully!');
    var editProfileButton = document.getElementById('editProfileButton');
    editProfileButton.style.display = 'inline-block';
  });
}