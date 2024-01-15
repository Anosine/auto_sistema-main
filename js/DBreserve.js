//Get all
function DBReserGetAll()
{
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}

//Get one
function DBReserGetOne(ReserveID)
{
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation?ReserveID="+ReserveID, requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        // Process the result (array of cars)
        console.log('Result:', result);
        // Update the container element with the dynamic table
        return result;
    })
    .catch(error => console.log('error', error));    
}

//Post
function DBReserPost(carId, globalUsername, startDate, endDate)
{
    var reserveData = {
        ReserveID: generateId(),
        startDate: startDate,
        endDate: endDate,
        carId: carId,
        globalUsername: globalUsername,
        ReserveStatus: "Aktyvi"
      };

    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        body: JSON.stringify(reserveData),
        redirect: 'follow'
    };
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Result:', result);
            })
            .catch(error => console.error('Error:', error));
};

//Update
function DBReserUpdate(updateData)
{
    var raw = JSON.stringify(updateData);
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'PATCH', // Use GET method for retrieving data
        redirect: 'follow',
        body: raw
    };

    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            console.log('Result:', result);
            // Update the container element with the dynamic table
            return result;
        })
        .catch(error => console.log('error', error));    
}


function DBReserDelete(ReserveID)
{
    var raw={ReserveID : ReserveID};
    
    var requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
        
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/Reservation", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log(result);
        result;
    })
    .catch(error => console.log('error', error));  
}  


