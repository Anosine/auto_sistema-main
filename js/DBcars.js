//Post
function DBCarPost(carsDBId, carsDBModel, carsDBLicensePlate, carsDBGearbox, 
carsDBReleaseYear, carsDBInsuranceDate, carsDBTechDate, carsDBPower, carsDBdrivebase, carsDBfuelType)
{
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
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
        .then(response => response.text())
        .then(result => alert(JSON.parse(result).body))
        .catch(error => console.log('error', error));
};

//Get all
function DBCarGetAll()
{
    console.log("testas");
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

var data= fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
.then(response => response.json()) // Assuming the response is in JSON format
.then(result => {
    console.log(result);
    return result;
})
.catch(error => console.log('error', error));
return data;
    }

//Get 1
function DBCarGetOne(CarId)
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
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB?CarId="+CarId, requestOptions)
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
function DBCarUpdate(updateData)
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

return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        // Process the result (array of cars)
        console.log('Result:', result);
        // Update the container element with the dynamic table
        return result;
    })
    .catch(error => console.log('error', error));    


}

//car busy status (CarId, inTrip/free)


//car technical issue (CarId, status (good, taisoma)