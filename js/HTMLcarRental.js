

function hideStart(){
document.getElementById('yourReservationTable').style.display = 'none';
document.getElementById('JusuRez').style.display = 'none';
document.getElementById('G').style.display = 'none';
}
async function searchReservations() {
    try {
      // Get the values from the date pickers
      var startDate = document.getElementById("startDatePicker").value;
      var endDate = document.getElementById("endDatePicker").value;
      //console.log("testas arrayOfUsableCars")  
      // Call the DBReserCheck function
      var result = await DBReserCheck(startDate, endDate);
      
      
      console.log("rezulatatas searchRes", result);
      // Display the result (you can customize this part based on your needs)
      var resultDiv = document.getElementById("result");
      if(result.length==0)
      {
        document.getElementById('G').style.display = 'none';
        document.getElementById('tableContainer').style.display = 'none';
        resultDiv.innerHTML = `<p>Nerasta laisvų automobilių</p>`;
      }
      else
      {
        document.getElementById('G').style.display = 'block';
        document.getElementById('tableContainer').style.display = 'block';
        resultDiv.innerHTML = ``;
        await updateTableRental(result);
        //resultDiv.innerHTML = `<br>            Rasti automobiliai:`;
      }
      
     // resultDiv.innerHTML = `<p>Viable Cars: ${result.join(', ')}</p>`;
      
        

      //await updateTableRental(await DBCarGetOne(CarId))

    } catch (error) {
      console.error('Error in searchReservations:', error);
    }
  }


// Push Reserve


//If logged in show users reservations

$(function onDocReady() {
hideStart();

var reqLevel=0;
console.log(rezSearchBody); 
updateGlobalUserData()
  .then(level => {
    var roleResult = checkRole(reqLevel);
    if (roleResult) {
        document.getElementById('rezSearchBody').style.display = 'block';
    } else {
        document.getElementById('rezSearchBody').style.display = 'none';
    }
})
.catch(error => {
    //var addCarForm = document.getElementById('rezSearchBody');
    document.getElementById('rezSearchBody').style.display = 'none';
  console.error("Klaida naujinant duomenis:", error);
});


})












/*



//OLD code:

$(function onDocReady() {
    $('#reservationButton').click(openReservationModal)
   var allowedURLs = ["https://www.autovaldymas.link/getcars","https://www.autovaldymas.link/carRental", "http://127.0.0.1:5500/carRental.html"];
    if (allowedURLs.includes(window.location.href)) {
        // If the URL matches, call the getAllCars function
    ReserveListRead();
    yourResListRead();
    UpdateTableYourReservations();  
    
    // Attach event listeners to the checkboxes
document.getElementById('onlyFreeCH').addEventListener('change', function () {
    // ReserveListRead();
     updateCheckboxValues();
     //updateTable(cars); // Update the table based on checkbox changes
 });
 
 document.getElementById('onlyBusyCH').addEventListener('change', function () {
    // ReserveListRead();
     updateCheckboxValues();
     //updateTable(cars); // Update the table based on checkbox changes
 });
 document.getElementById('onlyReservedCH').addEventListener('change', function () {
    // ReserveListRead();
     updateCheckboxValues();
     //updateTable(cars); // Update the table based on checkbox changes
 });
 document.getElementById('onlyOpenCh').addEventListener('change', function () {
     // ReserveListRead();
      updateCheckboxValues();
      //updateTable(cars); // Update the table based on checkbox changes
  });
  



    }    
});

if(getUserFromLocalStorage()){
    //console.log(cognitoUser);

  
//Checkboxai ir jų tikrinimas
var onlyFree = 0;
var onlyReserved = 0;
var onlyBusy = 0;
var carId= 0;
var onlyOpen= 0;

function updateCheckboxValues() {
    onlyFree = document.getElementById('onlyFreeCH').checked ? 1 : 0;
    onlyReserved = document.getElementById('onlyReservedCH').checked ? 1 : 0;
    onlyBusy = document.getElementById('onlyBusyCH').checked ? 1 : 0;
    onlyOpen = document.getElementById('onlyOpenCh').checked ? 1 : 0;
}



    var ReserveListRead = () => {
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
        fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
            .then(response => response.json()) // Assuming the response is in JSON format
            .then(result => {
                // Update the container element with the dynamic table
                updateTableRental(result);
            })
            .catch(error => console.log('error', error));
    };}

*/
    var updateTableRental = (cars) => {
        // Assuming you have a container element with ID 'tableContainer'
        var tableContainer = $('#tableContainer');
        
        // Create a dynamic table
        var tableHTML = '<table border="1">';
        tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th>Pav. dėžė</th><th>Metai</th><th>Galia, kW</th><th>Varantieji</th><th>Rezervuoti</th></tr>';
        console.log("pries",cars);
        console.log("po",cars);
        // Iterate through the cars array and add rows to the table
        cars.forEach(car => {
            if (car.carsDBUsability=="Neužimta"){
            tableHTML += '<tr>';
            tableHTML += '<td>' + car.carsDBModel + '</td>';
            tableHTML += '<td>' + car.CarId + '</td>';
            tableHTML += '<td>' + car.carsDBGearbox + '</td>';
            tableHTML += '<td>' + car.carsDBReleaseYear + '</td>';
            tableHTML += '<td>' + car.carsDBPower + '</td>';
            tableHTML += '<td>' + car.carsDBdrivebase + '</td>';
            //tableHTML += '<td>' + car.carsDBUsability + '</td>';
            tableHTML += '<td>' +'<button id="reservationButton" /onclick="openReservationModal(this)">Rezervuoti</button></td>';
            tableHTML += '</tr>';
            }
        }
        );
        tableHTML += '</table>';
    
        // Update the content of the container element
        tableContainer.html(tableHTML);
    };


//Close Reservation modal
function closeReservationModal() {
    document.getElementById('reservationModal').style.display = 'none';
}

function openReservationModal(event) {
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    carModel = $(event).closest('tr').find('td:nth-child(1)').text();
    console.log(carModel);
    //console.log(carId);
    updateGlobalUserData();
    reservationModal.style.display = 'flex';
  }
/*

*/

function submitReservation() {
    // Get values from the modal form
    var startDate = document.getElementById('startDatePicker').value;
    var endDate = document.getElementById('endDatePicker').value;
    //var selectedCarId = document.getElementById('selectedCarId').value;
    
    // Construct the reservation object
    var reservationData = {
      ReserveID: generateId(),
      startDate: startDate,
      endDate: endDate,
      carId: carId,
      carsDBModel: carModel,
      globalUsername: globalUsername,
      ReserveStatus: "Aktyvi"
    };
    console.log(reservationData);
 
    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        body: JSON.stringify(reservationData),
        redirect: 'follow'
    };    
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Result:', result);
            })
            .catch(error => console.error('Error:', error));
    



















    // Make API call to save reservation to Reservation database
    //saveReservation(reservationData);
    //markCarAsReserved(carId);
    
    //updateTableRental(result);        
    // Close the reservation modal
    closeReservationModal();
    //ReserveListRead();  
    searchReservations();
    yourResListRead();     
    console.log(startDate, carId, endDate);
}



yourResListRead();
function yourResListRead () {

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            if (result.length>0){
            updateTableYourReservations(result);}
        })
        .catch(error => console.log('error', error));
}



async function updateTableYourReservations(Reservations) {
    // Assuming you have a container element with ID 'tableContainer'
    var tableContainer = $('#yourReservationTable');

    // Create a dynamic table
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Numeriai</th><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th><th>Atšaukti</th></tr>';
    await updateGlobalUserData();
    //console.log(globalUsername);
   
    //Tik atviras rezervacijas rodyti
    var happened = 0;
    // Iterate through the cars array and add rows to the table
    Reservations.forEach(reservation => {
        
        if (reservation.globalUsername === globalUsername){
            //console.log(reservation);
            if (reservation.ReserveStatus === "Aktyvi" ){
                happened = 1;
                console.log("bandommmm");
                document.getElementById('JusuRez').style.display = 'block';
                document.getElementById('yourReservationTable').style.display = 'block';   
                document.getElementById('NeturitRez').style.display = 'none';  
        tableHTML += '<tr>';
        tableHTML += '<td>' + reservation.ReserveID + '</td>';
        tableHTML += '<td>' + reservation.carId + '</td>';
        tableHTML += '<td>' + reservation.carsDBModel + '</td>';
        tableHTML += '<td>' + reservation.startDate + '</td>';
        tableHTML += '<td>' + reservation.endDate + '</td>';
        //tableHTML += '<td>' + reservation.ReserveStatus + '</td>';
        tableHTML += '<td>' +'<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        }
    }
    
    }
    );
    if(!happened)
        {    //console.log("mums kazkas2");
            document.getElementById('JusuRez').style.display = 'none';
                document.getElementById('yourReservationTable').style.display = 'none';   
                document.getElementById('NeturitRez').style.display = 'block';    
        }
        else{
            //console.log("mums kazkas");
            document.getElementById('JusuRez').style.display = 'block';
                document.getElementById('yourReservationTable').style.display = 'block';   
                document.getElementById('NeturitRez').style.display = 'none';  
        
        }
    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);

    const firstColumnCells = document.querySelectorAll('#yourReservationTable td:first-child')
firstColumnCells.forEach(cell => {cell.style.display = 'none';});
};



async function cancelReservation(event){
    var ReservationID = $(event).closest('tr').find('td:nth-child(1)').text();
    await DBReserDelete(ReservationID);
}







//console.log(startDate, carId, endDate);
/*document.getElementById('tableContainer').addEventListener('click', function (event) {
    if (event.target.classList.contains('reservationButton')) {
      // Extract carId from the closest <tr> element
      var carId = event.target.closest('tr').querySelector('td:nth-child(2)').innerText;
      openReservationModal(carId);
      console.log(carId);
    }
  });

*/