//Get all
function DBIssueGetAll()
{
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };

    // Make API call to get all cars and use promises to handle the response
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/IssueDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            return result;
        })
        .catch(error => console.log('error', error));
}

//Get one
function DBIssueGetOne(IssueID)
{
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'GET', // Use GET method for retrieving data
        redirect: 'follow'
    };
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/IssueDB?IssueID="+IssueID, requestOptions)
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
function DBIssuePost(carId, globalUsername, Issue)
{
    var data = {
        IssueID: generateId(),
        createdDate: getCurrentTime(),
        fixedDate: "",
        carId: carId,
        globalUsername: globalUsername,
        issueStatus: "Aktyvi",
        issueDesc: Issue
      };

    var requestOptions = {
        method: 'POST', // Use POST method for sending data
        body: JSON.stringify(data),
        redirect: 'follow'
    };
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/IssueDB", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Handle the result as needed
                console.log('Result:', result);
            })
            .catch(error => console.error('Error:', error));
};

//Update
function DBIssueUpdate(updateData)
{
    var raw = JSON.stringify(updateData);
    // Create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'PATCH', // Use GET method for retrieving data
        redirect: 'follow',
        body: raw
    };
    return fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/IssueDB", requestOptions)
        .then(response => response.json()) // Assuming the response is in JSON format
        .then(result => {
            console.log('Result:', result);
            // Update the container element with the dynamic table
            return result;
        })
        .catch(error => console.log('error', error));    
}

//Delete
function DBIssueDelete(IssueID)
{
    var raw={IssueID : IssueID};
    
    var requestOptions = {
        method: 'DELETE',
        body: JSON.stringify(raw),
        redirect: 'follow'
    };
        
    fetch("https://z5mqqjq6dg.execute-api.eu-west-1.amazonaws.com/test1/IssueDB", requestOptions)
    .then(response => response.json()) // Assuming the response is in JSON format
    .then(result => {
        console.log(result);
        result;
    })
    .catch(error => console.log('error', error));  
}  
//Issue fixed
function DBIssueFixed(IssueID)
{
    var data = {
        IssueID: IssueID,
        fixedDate: getCurrentTime(),
        issueStatus: "Sutvarkyta"
      };
    DBIssueUpdate(data);
}
