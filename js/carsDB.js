$(function onDocReady() {
    $('#addCarForm').submit(callAPI)
    //$('#getAllCarsButton').click(getAllCars);
    var allowedURLs = ["https://www.autovaldymas.link/getcars","https://www.autovaldymas.link/carRental", "http://127.0.0.1:5500/getcars.html"];
    if (allowedURLs.includes(window.location.href)) {
        // If the URL matches, call the getAllCars function
        //getAllCars();
    }    
});

function callAPI(event)  {
    var carsDBId = $('#carsDBId').val();
    var carsDBModel = $('#carsDBModel').val();
    var carsDBLicensePlate = $('#carsDBLicensePlate').val();
    var carsDBGearbox = $('#carsDBGearbox').val();
    var carsDBReleaseYear = $('#carsDBReleaseYear').val();
    var carsDBInsuranceDate = $('#carsDBInsuranceDate').val();
    var carsDBTechDate = $('#carsDBTechDate').val();
    var carsDBPower = $('#carsDBPower').val();
    var carsDBdrivebase = $('#carsDBdrivebase').val();
    var carsDBfuelType = $('#carsDBfuelType').val();

    // Create a JSON object with the variables
    var requestData = {
        CarId : carsDBId,
        carsDBModel: carsDBModel,
        carsDBLicensePlate: carsDBLicensePlate,
        carsDBGearbox: carsDBGearbox,
        carsDBReleaseYear: carsDBReleaseYear,
        carsDBInsuranceDate: carsDBInsuranceDate,
        carsDBTechDate: carsDBTechDate,
        carsDBPower: carsDBPower,
        carsDBdrivebase: carsDBdrivebase,
        carsDBfuelType: carsDBfuelType
    };

    // Convert the JSON object to a string
    var raw = JSON.stringify(requestData);

    // Instantiate a Headers object
    var myHeaders = new Headers();
    // Add content type header to object
    myHeaders.append("Content-Type", "application/json");

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // Make API call with parameters and use promises to get response
    fetch("https://x10uh2luad.execute-api.eu-west-1.amazonaws.com/alpha", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
};

var getAllCars = () => {
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
            // Process the result (array of cars)
 
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
    tableHTML += '<tr><th>Model</th><th>License Plate</th><th>Gearbox</th><th>Release Year</th><th>Insurance Date</th><th>Tech Date</th><th>Power</th><th>Rezervuoti</th></tr>';

    // Iterate through the cars array and add rows to the table
    cars.forEach(car => {
        tableHTML += '<tr>';
        tableHTML += '<td>' + car.carsDBModel + '</td>';
        tableHTML += '<td>' + car.carsDBLicensePlate + '</td>';
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
