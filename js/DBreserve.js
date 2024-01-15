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
            //console.log(result);
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
        console.log("ištrintas sėkmingai Reservacija" , result);
        yourResListRead();
        result;
    })
    .catch(error => console.log('error', error));  
}  


//console.log(DBReserGetOne("lqttfzomr8x3hmo28hb"));

//DBReserGetOne("lqttfzomr8x3hmo28hb").then(cars => console.log(cars));
//DBReserCheck("2022-01-19", "2022-02-19");


async function DBReserCheck(start, end) {
    try {
      // Assuming DBCarGetAll returns a promise, use await to wait for the result
      var allCarIdArray = await getCarIds(await DBCarGetAll());
      //console.log(allCarIdArray);
      var reservedCarsArray = [];
      var currentReservations = await DBReserGetAll(); // Assuming this function fetches all reservations
      //console.log("rezer",currentReservations);
      currentReservations.forEach(reservation => {
        //console.log(reservation);
        var reservationStartDate = reservation.startDate; // Accessing property using dot notation
        var reservationEndDate = reservation.endDate;
        var reservationCarId = reservation.carId;
        var reservationActive = reservation.ReserveStatus // Assuming CarId is at index 2
        //console.log(reservation.startDate);
        // Check if the reservation overlaps with the desired time frame

        var overlap =
  (new Date(start) > new Date(reservationEndDate))  || (new Date(end) < new Date(reservationStartDate)); 
        if (!overlap && !reservedCarsArray.includes(reservationCarId)&&reservationActive) {
            reservedCarsArray.push(reservationCarId);
         }
      });
      var viableCarsArray = allCarIdArray.filter(carId => !reservedCarsArray.includes(carId));  
      console.log("viable CarsArray", viableCarsArray);
        
      //console.log(viableCarsArray);
      //console.log(reservedCarsArray);
      return await processCar(viableCarsArray);
    } catch (error) {
      console.error('Error in DBReserCheck:', error);
      return [];
    }
  }



  async function processCar(carIdArray) {
    var arrayOfUsableCars = [];
    var i =0;
    while (i<carIdArray.length){
    var carData = await DBCarGetOne(carIdArray[i]);
    //console.log("cardata", carData);
    if (carData.carsDBUsability=="Neužimta")
    {
    arrayOfUsableCars.push(carData);
    }
    i++ 
    //updateTableRental(carData);
  }
  console.log(arrayOfUsableCars);
  return arrayOfUsableCars;
}
//DBReserCheck("2020-11-26", "2022-01-01");

/*function DBReserCheck(start, end){
//start example 2024-01-19 [3] - place in DBresergetall() array
//end example 2024-02-19 [5] - place in DBresergetall() array
//Car Id example LTJ777 - [2] - palce in DBresergetall() array
var allCarIdArray = getCarIds(DBCarGetAll);
var viableCarsArray=[]
var currentReservations = DBReserGetAll();








return viableCarsArray
}*/


