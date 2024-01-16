$(function onDocReady() {
    $('#addCarForm').submit(callAPI)
    //$('#getAllCarsButton').click(getAllCars);
    var allowedURLs = ["https://www.autovaldymas.link/getcars","https://www.autovaldymas.link/carRental", "http://127.0.0.1:5500/getcars.html"];
    if (allowedURLs.includes(window.location.href)) {
        // If the URL matches, call the getAllCars function
        //getAllCars();
    }    
});

DBCarGetAll().then(cars => updateTable(cars));


function updateTable(cars){
    // Assuming you have a container element with ID 'tableContainer'
    var tableContainer = $('#tableContainer');

    // Create a dynamic table
    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>Model</th><th>License Plate</th><th>Gearbox</th><th>Release Year</th><th>Insurance Date</th><th>Tech Date</th><th>Power</th><th>Rezervuoti</th></tr>';

    // Iterate through the cars array and add rows to the table
    cars.forEach(car => {
        tableHTML += '<tr>';
        tableHTML += '<td>' + car.carsDBModel + '</td>';
        tableHTML += '<td>' + car.CarId+ '</td>';
        tableHTML += '<td>' + car.carsDBGearbox + '</td>';
        tableHTML += '<td>' + car.carsDBReleaseYear + '</td>';
        //tableHTML += '<td>' + car.carsDBInsuranceDate + '</td>';
       // tableHTML += '<td>' + car.carsDBTechDate + '</td>';
        tableHTML += '<td>' + car.carsDBPower + '</td>';
        tableHTML += '<td>' + car.carsDBdrivebase + '</td>';
        tableHTML += '<td>' +'<button id="reservationButton">Rezervuoti automobilį</button></td>';
        tableHTML += '</tr>';
    });

    tableHTML += '</table>';

    // Update the content of the container element
    tableContainer.html(tableHTML);
};


