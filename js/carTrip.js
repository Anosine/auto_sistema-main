$(document).ready(function () {
    console.log("showpage called");
    showPage();
    
  });



var tekstasKeistis = document.getElementById('lentelesArkelione');  

async function showPage()
{   
    await initializeApp();
    if (globalTrip==="1") 
    {
        console.log("yes trip"); 
        readTrips();
        readReservations();
        showCurrentTrip(globalUsername);
        tekstasKeistis.innerText = 'Jūsų dabartinė kelionė:';   
    }
    else {
        console.log("no trip"); 
        readReservations();
        readTrips();
        tekstasKeistis.innerText = 'Jūsų aktyvios rezervacijos:';   
    }//if active trip, show trip info

    //if no active trip show reserve list and last trips
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function showCurrentTrip(userID)
{
    //Get current Trip info from TripDB send user
    //await readTrips();
    readTrips();
    var carDegalai = "Benzinas2"
    var carName = "test"
    
    await delay(400);
    getonecar(userCurrentCarId)
        .then(result => {
            // Handle the result here
            console.log('testas:', result.carsDBPower);
            carDegalai = result.carsDBFuel;
            carName = result.carsDBModel
        })
    await delay(400);
    var currentTripInfoContainer = $('#currentTripInfo');
    var html = '<p> Pradžia: ' +  userCurrentDate + '</p>';
    // Calculate and display time elapsed (you may need to implement this)
     html += '<button onclick="endTrip()">Problema mašinai</button>';
     html += '<p>Automobilis: '+ carName +'</p>';
     html += '<p>Numeriai: ' + userCurrentCarId +'</p>';
     html += '<p>Kuro tipas: ' + carDegalai +'</p>';
     html += '<button onclick="openEndTripModal(this)">Baigti kelionę</button>';
    currentTripInfoContainer.html(html);
}






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

function possibleTripList(Reservations)
{   
    if (globalTrip==="0"){
    var tableContainer = $('#possibleTripsTable');

    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Rezervacijos ID</th><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th><th>Pradėti?</th><th>Atšaukti</th></tr>';

    Reservations.forEach(reservation => {
        if (reservation.globalUsername === globalUsername){
            if (reservation.ReserveStatus === "Aktyvi" ){
        
            tableHTML += '<tr>';
        tableHTML += '<td>' + reservation.ReserveID + '</td>';
        tableHTML += '<td>' + reservation.carId + '</td>';
        tableHTML += '<td>' + reservation.startDate + '</td>';
        tableHTML += '<td>' + reservation.endDate + '</td>';
        tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        }
    }
    else {
        
    }

}
    );

    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}


}


function readTrips()
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
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            // Update the container element with the dynamic table
            tripsList(result);
        })
        .catch(error => console.log('error', error));
}
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







function openEndTripModal(event)
{
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    // Pass the carId to the modal for reference
    updateGlobalUserData();
    console.log(globalUsername);

    endTripModal.style.display = 'flex';
  
}

function closeEndTripModal(event)
{
    document.getElementById('endTripModal').style.display = 'none';
  
}

function openTripModal(event)
{
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    // Pass the carId to the modal for reference
    console.log("carId");
    console.log(carId);
    updateGlobalUserData();
    console.log(globalUsername);

    tripModal.style.display = 'flex';
  
} 
function closeTripModal()
{
    document.getElementById('tripModal').style.display = 'none';
}


function submitTrip()
{
     // if in modal start trip start trip, reverse as end trip 
    userTripChange(1);
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
    
         
    closeTripModal();
    showPage(); 
    //location.reload();       
}





function endTrip()
{   
    userTripChange(0);
    if(cognitoUser){
        // Instantiate a Headers object
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
    //TripDB change complete

    //ReservationDB change ended

    //CarsDB change status free

   
    //Ends the trip, changes: 
      //reservation as complete
      //trip as ended
      //car as free
      //calls rate trip
      //if problem create issue
      //c
}

function rateTrip()
{
     //Ar viskas gerai? Jei ne call createIssue
}

function createIssue()
{ 
    //if problem after trip, create IssueDB ticket, username, dateRegistered, description, status
}

function getLocation()
{
    //if user active trip, check location, update current car location.
}