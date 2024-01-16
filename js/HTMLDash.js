$(function onDocReady() {
    var reqLevel=0;
    //console.log(rezSearchBody); 
    var maintekstas = document.getElementById('maintekstas');  
    //var techTekstas = document.getElementById('techTekstas');
    updateGlobalUserData()
      .then(level => {
        var roleResult = checkRole(reqLevel);
        if (roleResult) {
            showPage();
            //showPage();//document.getElementById('rezSearchBody').style.display = 'block';
        } else {
            maintekstas.innerText = 'Prieinama tik darbuotojams';
            //techTekstas.innerText = '';
            //document.getElementById('rezSearchBody').style.display = 'none';
            //document.getElementById('historyTekstas').style.display = 'none';
        }
    })
    .catch(error => {
        //var addCarForm = document.getElementById('rezSearchBody');
        //document.getElementById('rezSearchBody').style.display = 'none';
       /// document.getElementById('historyTekstas').style.display = 'none'
       maintekstas.innerText = 'Prieinama tik darbuotojams';
      //techTekstas.innerText = '';
      //console.error("Klaida naujinant duomenis:", error);
    });
    
    })
    



//var tekstasKeistis = document.getElementById('lentelesArkelione');  




///async function 


async function showPage()
{   
    //await initializeApp();
    await carList(await DBCarGetAll());
    //issueHistoryList(await DBIssueGetAll());
    //technikineList(await DBCarGetAll());

    //if no active trip show reserve list and last trips
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function carList(cars){
        var tableContainer = $('#carsList');
        var tableHTML = '<table border="1">';
        tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th>Užimtumas</th><th>Var. ratai</th><th>Tech. galiojimo data</th><th>Pagaminimo metai</th><th>Kuro tipas</th></tr>';
        console.log("mes bandom");
        cars.forEach(car => {
            console.log("meslabiaub");
            tableHTML += '<tr>';
            tableHTML += '<td>' + car.carsDBModel + '</td>';
            tableHTML += '<td>' + car.CarId + '</td>';
            
            tableHTML += '<td>' + car.carsDBdrivebase + '</td>';
            tableHTML += '<td>' + car.carsDBUsability + '</td>';
            tableHTML += '<td>' + car.carsDBTechDate + '</td>';
            tableHTML += '<td>' + car.carsDBReleaseYear + '</td>';
            

            tableHTML += '<td>' + car.carsDBFuel + '</td>';
           // tableHTML += '<td>' + car.startDate + '</td>';
            //t/ableHTML += '<td>' + car.endDate + '</td>';
            //tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
            //tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservationInTrips(this)">Atšaukti</button></td>';
            tableHTML += '</tr>';
            
            
        }
   
        );
        //document.getElementById('carsList').style.display = 'block';
        tableHTML += '</table>';
    
        // Update the content of the container element
        tableContainer.html(tableHTML);
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





async function technikineList(cars)
    {
    //console.log("tripsList start", trips);
    var tableContainer = $('#technikinesTable'); 
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th colspan="2">Technikinės apžiūros pabaiga</th><th>Atnaujinti techikinę</th></tr>';
    //var allCars = await DBCarGetAll();
    //while (i<allCars.length)
    //{

    ///}
    var techHapp =0;    
    cars.forEach(async car => {
        //var carModel = await DBCarGetOne(carId).carsDBModel;
        //console.log("mes");
        //+getCurrentTime

        const currentTime = new Date(getCurrentTime());
        const techDate = new Date(car.carsDBTechDate);

        const monthDifference = ( (techDate.getFullYear()* 12 +
      + techDate.getMonth())- (currentTime.getFullYear()* 12+ currentTime.getMonth() ));
        console.log(monthDifference);
        //return monthDifference <= 2;
        if(monthDifference <= 3){
        techHapp =1;      
        //console.log("me2s"); 
        tableHTML += '<tr>';
        //await delay(1000);
        //tableHTML += '<td>' + issue.IssueID + '</td>';
        tableHTML += '<td>' + car.carsDBModel + '</td>';
        tableHTML += '<td>' + car.CarId + '</td>';
        tableHTML += '<td colspan="2">' + car.carsDBTechDate + '</td>';
        tableHTML += '<td>' + '<button id="naujintTech" /onclick="openTechModal(this)">Naujinti</button></td>';
        //tableHTML += '<td>' +  '</td>';
        //tableHTML += '<td class="action-buttons">' +'<button onclick="openServiceModal(this)"><span class="material-icons-outlined">construction</span></button> '+'                          <button onclick="openFixedModal(this)"><span class="material-icons-outlined">done</span></button>'+ '</td>';
        //tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        //tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        //}
    }}
    );
    if(!techHapp)
        {    //console.log("mums kazkas2");
            document.getElementById('techTekstas').style.display = 'none';
            document.getElementById('technikinesTable').style.display = 'none';   
  
        }
        else{
            //console.log("mums kazkas");
            document.getElementById('techTekstas').style.display = 'block';
                document.getElementById('technikinesTable').style.display = 'block';   
        
    }
    
    //const timeLength = getTimeLength(startDateStr, endDateStr);
    //console.log(timeLength);
    
    
    await delay(600);
    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    const firstColumnCells = document.querySelectorAll('#issuesTable td:first-child')
firstColumnCells.forEach(cell => {cell.style.display = 'none';});
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}



function openTechModal(event){
    document.getElementById('TechModal').style.display = 'flex';
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    //console.log(carId);
    //submitTech(carId);
    //TechModal.style.display = 'flex';
}

async function closeTechModal(){
    document.getElementById('TechModal').style.display = 'none';

}

async function submitTech(CarId){
    var newTechDate = document.getElementById("TechDatePicker").value;
    //console.log(newTechDate);
    var techData = {
        CarId: CarId,
        carsDBTechDate: newTechDate
    };
    await DBCarUpdate(techData);
    await technikineList(await DBCarGetAll());
    closeTechModal();
}

async function issueHistoryList(issues)
    {
    //console.log("tripsList start", trips);
    var tableContainer = $('#issuesHistoryTable'); 
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th colspan="2">Problema</th><th>Kaštai, €</th><th>Išsprendimo data</th><th>Trukmė sprendimo</th></tr>';
    //var allCars = await DBCarGetAll();
    //while (i<allCars.length)
    //{

    ///}

    issues.forEach(async issue => {
        //var carModel = await DBCarGetOne(carId).carsDBModel;
        //console.log("mes");
        if (issue.issueStatus=="Išspręsta"){      
            console.log("me2s"); 
        tableHTML += '<tr>';
        const carData = await DBCarGetOne(issue.carId);
        const carUse = carData.carsDBUsability;
        
        const carModel = carData.carsDBModel;
        console.log("carID", carModel);
        //await delay(1000);
        //tableHTML += '<td>' + issue.IssueID + '</td>';
        tableHTML += '<td>' + carModel + '</td>';
        tableHTML += '<td>' + issue.carId + '</td>';
        tableHTML += '<td colspan="2">' + issue.issueDesc + '</td>';
        //tableHTML += '<td>' +  '</td>';
        tableHTML += '<td>' + issue.fixingCosts + '</td>';
        tableHTML += '<td>' + issue.fixedDate + '</td>';
        tableHTML += '<td >' + getTimeLength(issue.createdDate, issue.fixedDate) + '</td>';
        //tableHTML += '<td class="action-buttons">' +'<button onclick="openServiceModal(this)"><span class="material-icons-outlined">construction</span></button> '+'                          <button onclick="openFixedModal(this)"><span class="material-icons-outlined">done</span></button>'+ '</td>';
        //tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        //tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        //}
    }}
    );
    
    
    //const timeLength = getTimeLength(startDateStr, endDateStr);
    //console.log(timeLength);
    
    
    await delay(600);
    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    const firstColumnCells = document.querySelectorAll('#issuesTable td:first-child')
firstColumnCells.forEach(cell => {cell.style.display = 'none';});
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}


async function issueList(issues)
    {
    //console.log("tripsList start", trips);
    var tableContainer = $('#issuesTable'); 
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th colspan="2">Problema</th><th>Registracijos data</th><th>Automobilio būsena</th><th>Veiksmai</th></tr>';
    //var allCars = await DBCarGetAll();
    //while (i<allCars.length)
    //{
    var issueKeistis = document.getElementById('issueKeistis');  
    
    ///}
    var happened = 0;
    issues.forEach(async issue => {
        //var carModel = await DBCarGetOne(carId).carsDBModel;
        console.log("mes");
        if (issue.issueStatus=="Aktyvi"){      
        happened=1;
        tableHTML += '<tr>';
        const carData = await DBCarGetOne(issue.carId);
        const carUse = carData.carsDBUsability;
        
        const carModel = carData.carsDBModel;
        console.log("carID", carModel);
        //await delay(1000);
        tableHTML += '<td>' + issue.IssueID + '</td>';
        tableHTML += '<td>' + carModel + '</td>';
        tableHTML += '<td>' + issue.carId + '</td>';
        tableHTML += '<td colspan="2">' + issue.issueDesc + '</td>';
        //tableHTML += '<td>' +  '</td>';
        tableHTML += '<td >' + issue.createdDate + '</td>';
        tableHTML += '<td>' + carUse + '</td>';
        tableHTML += '<td class="action-buttons">' +'<button onclick="openServiceModal(this)"><span class="material-icons-outlined">construction</span></button> '+'                          <button onclick="openFixedModal(this)"><span class="material-icons-outlined">done</span></button>'+ '</td>';
        //tableHTML += '<td>' + '<button id="startTripButton" /onclick="openTripModal(this)">Pradėti kelionę</button></td>';
        //tableHTML += '<td>' + '<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
            
        //}
    }}
    );
    if(!happened)
        {    console.log("mums kazkas2");
            document.getElementById('issuesTable').style.display = 'none';
            document.getElementById('issuesTable').style.display = 'none';
            issueKeistis.innerText = 'Nėra aktyvių problemų :)';   
        }
        else{
            console.log("mums kazkas");
            document.getElementById('issuesTable').style.display = 'block';
            document.getElementById('issuesTable').style.display = 'block';
            issueKeistis.innerText = 'Aktyvios problemos:';
        
        }
    
    await delay(600);
    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
    const firstColumnCells = document.querySelectorAll('#issuesTable td:first-child')
firstColumnCells.forEach(cell => {cell.style.display = 'none';});
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}


var carId;
var IssueID;

async function openServiceModal(event)
{   
    carId = $(event).closest('tr').find('td:nth-child(3)').text();
    //console.log(carId);
    ServiceModal.style.display = 'flex';
}
function carInService(carId)
{   console.log(carId);
    DBmarkCarAsInService(carId);
}

async function closeServiceModal()
{
    ServiceModal.style.display = 'none';
}


async function openFixedModal(event)
{   
    carId = $(event).closest('tr').find('td:nth-child(3)').text();
    IssueID = $(event).closest('tr').find('td:nth-child(1)').text();
    //console.log(IssueID);
    FixedModal.style.display = 'flex';
}
async function carFixed()
{
    event.preventDefault();
    var costs = document.getElementById('costs').value;    
    var naujinam = {
        IssueID: IssueID,
        fixedDate: getCurrentTime(),
        fixingCosts: costs,
        issueStatus: "Išspręsta",
      };
    DBIssueUpdate(naujinam);
    DBmarkCarAsFree(carId);
    closeFixedModal();
}
async function closeFixedModal()
{
    FixedModal.style.display = 'none';
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
  