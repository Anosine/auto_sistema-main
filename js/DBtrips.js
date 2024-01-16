//Post
function DBTripPost(carId, globalUsername, reserveID)
{
    var tripData = {
        TripsDB: generateId(),
        startDate: getCurrentTime(),
        endDate: "",
        carId: carId,
        globalUsername: globalUsername,
        reservationID: reserveID,
        tripStatus: "Aktyvi"
      };

    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        body: JSON.stringify(tripData),
        redirect: 'follow'
    };
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Result:', result);
            })
            .catch(error => console.error('Error:', error));
};

//Get all
function DBTripGetAll()
{
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };

    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log(result);
        return result;
    })
    .catch(error => console.log('error', error));
    }

//Get 1
function DBTripGetOne(TripId)
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
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB?TripsDB="+TripId, requestOptions)
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
function DBTripUpdate(updateData)
{
    var raw = JSON.stringify(updateData);
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'PATCH', // Use GET method for retrieving data
        redirect: 'follow',
        body: raw
    };

    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            console.log('Result:', result);
            // Update the container element with the dynamic table
            return result;
        })
        .catch(error => console.log('error', error));    
}

//Delete
function DBTripDelete(TripId)
{
    var raw={TripsDB : TripId};
    
    var requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
        
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/TripsDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log(result);
        result;
    })
    .catch(error => console.log('error', error));  
}  


//EndsTrip
function DBTripEnd(TripID)
{   
    var tripData = {
        TripsDB: TripID,
        tripStatus: "Completed",
        endDate: getCurrentTime()
        };
    DBTripUpdate(tripData);
}

