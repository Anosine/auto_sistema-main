//Post
function DBTripPost(carId, globalUsername)
{
    var tripData = {
        TripsDB: generateId(),
        startDate: getCurrentTime(),
        endDate: "",
        carId: carId,
        globalUsername: globalUsername,
        tripStatus: "Aktyvi"
      };
    var myHeaders = new Headers();  
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        headers: myHeaders,
        body: JSON.stringify(tripData),
        redirect: 'follow'
    };
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Result:', result);
            })
            .catch(error => console.error('Error:', error));
};

//Get all
function DBTripGetAll()
{
// Instantiate a Headers object
var myHeaders = new Headers();
// Add content type header to object
myHeaders.append("Content-Type", "application/json");

// Create a JSON object with parameters for API call and store in a variable
var requestOptions = {
    method: 'GET', // Use GET method for retrieving data
    headers: myHeaders,
    redirect: 'follow'
};
console.log("testas");

var data= fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
.then(response => response.json()) // Assuming the response is in JSON format
.then(result => {
    console.log(result);
    return result;
})
.catch(error => console.log('error', error));
return data;
    }

//Get 1
function DBTripGetOne(TripId)
{
    // Instantiate a Headers object
    var myHeaders = new Headers();
    // Add content type header to object
    myHeaders.append("Content-Type", "application/json");

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB?TripsDB="+TripId, requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        // Process the result (array of cars)
        console.log('Result:', result);
        // Update the container element with the dynamic table
        return result;
    })
    .catch(error => console.log('error', error));    
}

//Update / Patch
function DBTripUpdate(updateData)
{
// Instantiate a Headers object
var myHeaders = new Headers();
// Add content type header to object
myHeaders.append("Content-Type", "application/json");
var raw = JSON.stringify(updateData);
// Create a JSON object with parameters for API call and store in a variable
var requestOptions = {
    method: 'PATCH', // Use GET method for retrieving data
    headers: myHeaders,
    redirect: 'follow',
    body: raw
};

return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log('Result:', result);
        // Update the container element with the dynamic table
        return result;
    })
    .catch(error => console.log('error', error));    


}


var tekstasKeistis = document.getElementById('lentelesArkelione');  


function readReservations()
{
    if(cognitoUser){
        // Instantiate a Headers object
    var myHeaders = new Headers();
    // Add content type header to object
    myHeaders.append("Content-Type", "application/json");

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        headers: myHeaders,
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            // Update the container element with the dynamic table
            possibleTripList(result);
        })
        .catch(error => console.log('error', error));
}
}




function readTrips()
{
    var myHeaders = new Headers();
    // Add content type header to object
    myHeaders.append("Content-Type", "application/json");

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        headers: myHeaders,
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            // Update the container element with the dynamic table
            tripsList(result);
        })
        .catch(error => console.log('error', error));
}

var userCurrentTripID = "testasss";
var userCurrentDate = "testasss";
var userCurrentCarId = "testasss";

function tripsList(trips)
{
    var tableContainer = $('#tripHistroyTable');

    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Kelionės ID</th><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th></tr>';

    trips.forEach(trip => {
        if (trip.globalUsername === globalUsername){
           if (trip.tripStatus === "Aktyvi" ){
           userCurrentTripID = trip.TripsDB;
           userCurrentDate = trip.startDate;
           userCurrentCarId = trip.carId;
           }           
        tableHTML += '<tr>';
        tableHTML += '<td>' + trip.TripsDB + '</td>';
        tableHTML += '<td>' + trip.carId + '</td>';
        tableHTML += '<td>' + trip.startDate + '</td>';
        tableHTML += '<td>' + trip.endDate + '</td>';
        //tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        //tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        //}
    }}
    );

    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}



function submitTrip()
{
     // if in modal start trip start trip, reverse as end trip 
    userTripChange(1);
    
    
         
    closeTripModal();
    showPage(); 
    //location.reload();       
}


function endTrip()
{   

    console.log(userCurrentTripID);
    var tripData = {
        TripsDB: userCurrentTripID,
        tripStatus: "Completed",
        endDate: getCurrentTime()
        };
    var myHeaders = new Headers();
        // Add content type header to object
    myHeaders.append("Content-Type", "application/json");
       
    var requestOptions = {
        method: 'PATCH', // Use POST method for sending data
        headers: myHeaders,
        body: JSON.stringify(tripData),
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            // Update the container element with the dynamic table
            tripsList(result);
        })
        .catch(error => console.log('error', error));
    closeEndTripModal();
    //location.reload();
}
    /
}
