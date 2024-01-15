//Post
function DBCarPost(carsDBId, carsDBModel, carsDBGearbox, 
carsDBReleaseYear, carsDBInsuranceDate, carsDBTechDate, carsDBPower, carsDBdrivebase, carsDBfuelType, carsDBUsability)
{
    var requestData = {
        CarId : carsDBId,
        carsDBModel: carsDBModel,
        carsDBGearbox: carsDBGearbox,
        carsDBReleaseYear: carsDBReleaseYear,
        carsDBInsuranceDate: carsDBInsuranceDate,
        carsDBTechDate: carsDBTechDate,
        carsDBPower: carsDBPower,
        carsDBdrivebase: carsDBdrivebase,
        carsDBFuel: carsDBfuelType,
        carsDBUsability: carsDBUsability
    };
    // Convert the JSON object to a string
    var raw = JSON.stringify(requestData);

    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        body: raw,
        redirect: 'follow'
    };

    // Make API call with parameters and use promises to get response
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
        .then(response => response.text())
        .then(result => {
            return result})

        .catch(error => console.log('error', error));
};

//Get all
function DBCarGetAll()
{
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
.then(response => response.json()) // Assuming the response is in JSON format
.then(result => {
    console.log(result);
    return result;
})
.catch(error => console.log('error', error));
}

//Get 1
function DBCarGetOne(CarId)
{
    var requestOptions = {
        method: 'GET', 
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
    var raw = JSON.stringify(updateData);
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'PATCH', // Use GET method for retrieving data
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

//Delete

function DBCarDelete(CarId)
{
    var raw={CarId : CarId};

    var requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
    
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/CarsDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log(result);
        result;
    })
    .catch(error => console.log('error', error));  
}

//car busy status (CarId, inTrip/free)


//car technical issue (CarId, status (good, taisoma)