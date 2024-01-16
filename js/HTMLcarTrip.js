$(function onDocReady() {
    var reqLevel=0;
    //console.log(rezSearchBody); 
    updateGlobalUserData()
      .then(level => {
        var roleResult = checkRole(reqLevel);
        if (roleResult) {
            showPage();//document.getElementById('rezSearchBody').style.display = 'block';
        } else {
            //document.getElementById('rezSearchBody').style.display = 'none';
            document.getElementById('historyTekstas').style.display = 'none';
        }
    })
    .catch(error => {
        //var addCarForm = document.getElementById('rezSearchBody');
        //document.getElementById('rezSearchBody').style.display = 'none';
        document.getElementById('historyTekstas').style.display = 'none'
      console.error("Klaida naujinant duomenis:", error);
    });
    
    })
    



var tekstasKeistis = document.getElementById('lentelesArkelione');  




///async function 


async function showPage()
{   
    await initializeApp();
    if (globalTrip==="1") 
    {
        console.log("yes trip"); 
        
        //readReservations();
        showCurrentTrip();
        document.getElementById('historyTekstas').style.display = 'none';
        tekstasKeistis.innerText = 'Jūsų dabartinė kelionė:'; 
        document.getElementById('currentTripInfo').style.display = 'block';
          
    }
    else {
        await tripsList(await DBTripGetAll());
        await possibleTripList(await DBReserGetAll());
        console.log("no trip"); 
        //readReservations();
        //readTrips();
        //tekstasKeistis.innerText = 'Jūsų aktyvios rezervacijos:';   
        document.getElementById('historyTekstas').style.display = 'block';
        document.getElementById('currentTripInfo').style.display = 'none';
        //document.getElementById('historyTekstas').style.display = 'none';


    }//if active trip, show trip info

    //if no active trip show reserve list and last trips
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function showCurrentTrip()
{
    //await delay(400);
    //tripsList(await DBTripGetAll())

    await getUserTrip();
    await delay(350);
    console.log(userCurrentCarId);
    DBCarGetOne(userCurrentCarId)
        .then(result => {
            // Handle the result here
            console.log('testas:', result.carsDBPower);
            carDegalai = result.carsDBFuel;
            carName = result.carsDBModel
        })

    await delay(400);
    var reservationEndDate = await DBReserGetOne(TripReservationID);
    //console.log("tripId masinos end date", await DBReserGetOne(TripReservationID).endDate);
    reservationEndDate=reservationEndDate.endDate;
    var currentTripInfoContainer = $('#currentTripInfo');
    var html = '<p> Pradžia: ' +  userCurrentDate + '</p>';
    html += '<p> Rezervacijos pabaiga: ' +  reservationEndDate + '</p>';
    // Calculate and display time elapsed (you may need to implement this)
     html += '<button onclick="openIssueModal(this)">Problema mašinai</button>';
     html += '<p>Automobilis: '+ carName +'</p>';
     html += '<p>Numeriai: ' + userCurrentCarId +'</p>';
     html += '<p>Kuro tipas: ' + carDegalai +'</p>';
     html += '<button onclick="openEndTripModal()">Baigti kelionę</button>';
    currentTripInfoContainer.html(html);
}


async function openIssueModal(){
    document.getElementById('IssueModal').style.display = 'flex';
}

async function closeIssueModal(){
    document.getElementById('IssueModal').style.display = 'none';

}

async function submitIssue(){
    //preventdef
    event.preventDefault();
    //console.log(userCurrentCarId);
    //console.log(globalUsername);
    var issueDescription = document.getElementById('issueDescription').value;
    //console.log(issueDescription);
    await DBIssuePost(userCurrentCarId, globalUsername, issueDescription) 

    closeIssueModal();
}


async function cancelReservationInTrips(event){
    var ReservationID = $(event).closest('tr').find('td:nth-child(1)').text();
    //console.log("rezervacija", ReservationID);
    await DBReserDelete(ReservationID);
    await possibleTripList(await DBReserGetAll());
}

function possibleTripList(Reservations)
{   
    if (globalTrip==="0"){
    var tableContainer = $('#possibleTripsTable');

    var tableHTML = '<table border="1">';
    var happened = 0;
    tableHTML += '<tr><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th><th>Pradėti?</th><th>Atšaukti</th></tr>';

    Reservations.forEach(reservation => {
        if (reservation.globalUsername === globalUsername){
            if (reservation.ReserveStatus === "Aktyvi" ){
            happened=1;
            tableHTML += '<tr>';
        tableHTML += '<td>' + reservation.ReserveID + '</td>';
        tableHTML += '<td>' + reservation.carId + '</td>';
        tableHTML += '<td>' + reservation.startDate + '</td>';
        tableHTML += '<td>' + reservation.endDate + '</td>';
        tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservationInTrips(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        }
        
    }
    if(!happened)
    {   
        document.getElementById('possibleTripsTable').style.display = 'none';
        document.getElementById('possibleTripsTable').style.display = 'none';
        tekstasKeistis.innerText = 'Jūs neturite aktyvių rezervacijų';   
    }
    else{
        document.getElementById('possibleTripsTable').style.display = 'block';
        document.getElementById('possibleTripsTable').style.display = 'block';
        tekstasKeistis.innerText = 'Jūsų aktyvios rezervacijos:';
    
    }
}
    );

    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    const firstColumnCells = document.querySelectorAll('#possibleTripsTable td:first-child')
firstColumnCells.forEach(cell => {cell.style.display = 'none';});
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}


}


var userCurrentTripID = "testasss";
var userCurrentDate = "testasss";
var userCurrentCarId = "testasss";
var TripReservationID = "tests";

function tripsList(trips)
    {
    console.log("tripsList start", trips);
    var tableContainer = $('#tripHistroyTable');

    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th></tr>';

    trips.forEach(trip => {
        if (trip.globalUsername === globalUsername){
           if (trip.tripStatus === "Aktyvi" ){
           userCurrentTripID = trip.TripsDB;
           userCurrentDate = trip.startDate;
           userCurrentCarId = trip.carId;
           TripReservationID = trip.reservationID
           }           
        tableHTML += '<tr>';
        //tableHTML += '<td>' + trip.TripsDB + '</td>';
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

async function getUserTrip()
{
    var trips = await DBTripGetAll();
    console.log(trips);
    trips.forEach(trip => {
        if (trip.globalUsername === globalUsername){
           if (trip.tripStatus === "Aktyvi" ){
            console.log("mes cia");
           userCurrentTripID = trip.TripsDB;
           userCurrentDate = trip.startDate;
           userCurrentCarId = trip.carId;
           TripReservationID = trip.reservationID
           }           
    }}
    );
    return 
}





function openEndTripModal()
{
    updateGlobalUserData();
    endTripModal.style.display = 'flex';
}

function closeEndTripModal()
{
    document.getElementById('endTripModal').style.display = 'none';
  
}

function openTripModal(event)
{
    ReservationID = $(event).closest('tr').find('td:nth-child(1)').text();
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


async function submitTrip()
{
    userTripChange(1);
    await delay(200);
    console.log("kur mes cia", carId, globalUsername, ReservationID);
    DBTripPost(carId, globalUsername, ReservationID);  
    closeTripModal();
    showPage(); 
    await delay (100);
    location.reload();       
}
async function endTrip()
{   
    userTripChange(0);
        // Instantiate a Headers object
       // console.log(userCurrentTripID);
    var tripData = {
        TripsDB: userCurrentTripID,
        tripStatus: "Completed",
        endDate: getCurrentTime()
        };
    var reserData = {
        ReserveID: TripReservationID,
        ReserveStatus: "Completed"
    }
    await DBTripUpdate(tripData);
    await DBReserUpdate(reserData);
    closeEndTripModal();
    showPage();
 
}
  /*  
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
}*/