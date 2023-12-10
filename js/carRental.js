$(function onDocReady() {
    $('#reservationButton').click(openReservationModal)
   // var allowedURLs = ["https://www.autovaldymas.link/getcars","https://www.autovaldymas.link/carRental", "http://127.0.0.1:5500/carRental.html"];
    //if (allowedURLs.includes(window.location.href)) {
        // If the URL matches, call the getAllCars function
    ReserveListRead();
    //}    
});
if(getUserFromLocalStorage()){
    //  console.log('testas');
  }


var onlyFree = 0;
var onlyReserved = 0;
var onlyBusy = 0;

function updateCheckboxValues() {
    onlyFree = document.getElementById('onlyFreeCH').checked ? 1 : 0;
    onlyReserved = document.getElementById('onlyReservedCH').checked ? 1 : 0;
    onlyBusy = document.getElementById('onlyBusyCH').checked ? 1 : 0;
}



    var ReserveListRead = () => {
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
    
    
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
    
        //console.log(requestOptions)
        // Make API call to get all cars and use promises to handle the response
        fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
            .then(response => response.json()) // Assuming the response is in JSON format
            .then(result => {
                // Process the result (array of cars)
                 //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        //REIK išritni
        
             //  console.log(result);
                
                // Update the container element with the dynamic table
                updateTable(result);
            })
            .catch(error => console.log('error', error));
    };

    var updateTable = (cars) => {
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
            tableHTML += '<td>' +'<button id="reservationButton" onclick="openReservationModal()">Rezervuoti automobilį</button></td>';
            tableHTML += '</tr>';
            }
        }
        );
    
        tableHTML += '</table>';
    
        // Update the content of the container element
        tableContainer.html(tableHTML);
    };

//Open Reservation modal
function openReservationModal() {
    reservationModal.style.display = 'flex';
}
//Close Reservation modal
function closeReservationModal() {
    document.getElementById('reservationModal').style.display = 'none';
}



// Attach event listeners to the checkboxes
document.getElementById('onlyFreeCH').addEventListener('change', function () {
    updateCheckboxValues();
    updateTable(cars); // Update the table based on checkbox changes
});

document.getElementById('onlyBusyCH').addEventListener('change', function () {
    updateCheckboxValues();
    updateTable(cars); // Update the table based on checkbox changes
});
document.getElementById('onlyReservedCH').addEventListener('change', function () {
    updateCheckboxValues();
    updateTable(cars); // Update the table based on checkbox changes
});

// Initial setup
updateCheckboxValues();
updateTable(cars);