$(function onDocReady() {
    $('#addCarForm').submit(callAPI)
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
        carsDBdrivebase: carsDBdrivebase
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
