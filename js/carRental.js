

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


    var updateTableRental = (cars) => {
        // Assuming you have a container element with ID 'tableContainer'
        var tableContainer = $('#tableContainer');
    
        // Create a dynamic table
        var tableHTML = '<table border="1">';
        tableHTML += '<tr><th>Automobilis</th><th>Numeriai</th><th>Pav. dėžė</th><th>Metai</th><th>Galia</th><th>Varantieji</th><th>Užimtumas</th><th>Rezervuoti</th></tr>';
       
       
       
        var OnlyChecked
        if (onlyFree) {
            OnlyChecked = "Neužimta";
        }
        else if (onlyBusy) {
            OnlyChecked = "Užimta";
        }
        else if (onlyReserved) {
            OnlyChecked = "Rezervuota";
        }
        else {
            OnlyChecked = "all";
        }

        // Iterate through the cars array and add rows to the table
        cars.forEach(car => {
            if (car.carsDBUsability === OnlyChecked || OnlyChecked === "all"  ){
            tableHTML += '<tr>';
            tableHTML += '<td>' + car.carsDBModel + '</td>';
            tableHTML += '<td>' + car.CarId + '</td>';
            tableHTML += '<td>' + car.carsDBGearbox + '</td>';
            tableHTML += '<td>' + car.carsDBReleaseYear + '</td>';
            tableHTML += '<td>' + car.carsDBPower + '</td>';
            tableHTML += '<td>' + car.carsDBdrivebase + '</td>';
            tableHTML += '<td>' + car.carsDBUsability + '</td>';
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





console.log(globalName);

}



function openReservationModal(event) {
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    // Pass the carId to the modal for reference
    console.log(carId);
    updateGlobalUserData();
    console.log(globalUsername);





    var modal = document.getElementById('reservationModal');




    reservationModal.style.display = 'flex';
  
    // You can further customize the modal content based on the selected carId
  }




function submitReservation() {
    // Get values from the modal form
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    //var selectedCarId = document.getElementById('selectedCarId').value;
    console.log (startDate, endDate)
    // Validate the form data (add your own validation logic)
    
    // Construct the reservation object
    var reservationData = {
      ReserveID: generateId(),
      startDate: startDate,
      endDate: endDate,
      carId: carId,
      globalUsername: globalUsername,
      ReserveStatus: "Aktyvi"
    };
    console.log(reservationData);
    var myHeaders = new Headers();
    // Add content type header to object
    myHeaders.append("Content-Type", "application/json");
 
    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        headers: myHeaders,
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
    markCarAsReserved(carId);
    
    //updateTableRental(result);        
    // Close the reservation modal
    closeReservationModal();
    ReserveListRead();  
    yourResListRead();     
    console.log(startDate, carId, endDate);
}



var yourResListRead = () => {
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
            updateTableYourReservations(result);
        })
        .catch(error => console.log('error', error));
};}


var updateTableYourReservations = (Reservations) => {
    // Assuming you have a container element with ID 'tableContainer'
    var tableContainer = $('#yourReservationTable');

    // Create a dynamic table
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Rezervacijos ID</th><th>Automobilis</th><th>Pradžia</th><th>Pabaiga</th><th>Aktyvi</th><th>Atšaukti</th></tr>';
    updateGlobalUserData();
    console.log(globalUsername);
   
    //Tik atviras rezervacijas rodyti
    
    // Iterate through the cars array and add rows to the table
    Reservations.forEach(reservation => {
        if (reservation.globalUsername === globalUsername){
            if (reservation.ReserveStatus === "Aktyvi" || onlyOpen === 0  ){
        
            tableHTML += '<tr>';
        tableHTML += '<td>' + reservation.ReserveID + '</td>';
        tableHTML += '<td>' + reservation.carId + '</td>';
        tableHTML += '<td>' + reservation.startDate + '</td>';
        tableHTML += '<td>' + reservation.endDate + '</td>';
        tableHTML += '<td>' + reservation.ReserveStatus + '</td>';
        tableHTML += '<td>' +'<button id="cancelReservationButton" /onclick="cancelReservation(this)">Atšaukti</button></td>';
        tableHTML += '</tr>';
        }
    }}
    );

    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
};

function cancelReservation(event)
{
    ReservationID = $(event).closest('tr').find('td:nth-child(1)').text();
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    var reservationData = {
        ReserveID: ReservationID,
        ReserveStatus: "Cancelled"
      };
      console.log(reservationData);
      var myHeaders = new Headers();
      // Add content type header to object
      myHeaders.append("Content-Type", "application/json");
   
      var requestOptions = {
          method: 'PATCH', // Use POST method for sending data
          headers: myHeaders,
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
    markCarAsFree(carId);
    ReserveListRead();  
    yourResListRead();  
    // Make API call to update CarsDB to mark the car as reserved
  // This depends on your CarsDB structure and API endpoint
    

}






















function generateId(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

function saveReservation(reservationData) {
    // Make API call to your Reservation database
    // Use fetch or any other preferred method to send data to the server
    // ...
  
    // Example using fetch:
    // fetch("your_reservation_api_endpoint", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(reservationData),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Reservation saved:', data))
    // .catch(error => console.error('Error saving reservation:', error));
  }

function markCarAsReserved(carId) {
    var reservationData = {
        CarId: carId,
        carsDBUsability: "Rezervuota"
      };
      console.log(reservationData);
      var myHeaders = new Headers();
      // Add content type header to object
      myHeaders.append("Content-Type", "application/json");
   
      var requestOptions = {
          method: 'PATCH', // Use POST method for sending data
          headers: myHeaders,
          body: JSON.stringify(reservationData),
          redirect: 'follow'
      };    
      fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
              .then(response => response.json())
              .then(result => {
                  // Handle the result as needed
                  console.log('Result:', result);
              })
              .catch(error => console.error('Error:', error));
      
    // Make API call to update CarsDB to mark the car as reserved
  // This depends on your CarsDB structure and API endpoint
}

function markCarAsFree(carId) {
    var reservationData = {
        CarId: carId,
        carsDBUsability: "Neužimta"
      };
      console.log(reservationData);
      var myHeaders = new Headers();
      // Add content type header to object
      myHeaders.append("Content-Type", "application/json");
   
      var requestOptions = {
          method: 'PATCH', // Use POST method for sending data
          headers: myHeaders,
          body: JSON.stringify(reservationData),
          redirect: 'follow'
      };    
      fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
              .then(response => response.json())
              .then(result => {
                  // Handle the result as needed
                  console.log('Result:', result);
              })
              .catch(error => console.error('Error:', error));
      
    // Make API call to update CarsDB to mark the car as reserved
  // This depends on your CarsDB structure and API endpoint
}

function deleteReservation(ReservationID) {
    
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