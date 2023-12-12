showPage();

function showPage()
{
    updateGlobalUserData();
    if (globalTrip)
    {
        console.log("yes trip"); 
        showCurrentTrip(globalUsername);
    }
    else {
        console.log("no trip"); 
        possibleTripList(globalUsername);
    }//if active trip, show trip info

    //if no active trip show reserve list and last trips
}

function showCurrentTrip(userID)
{
    //Get current Trip info from TripDB send user
}

function possibleTripList(userID)
{
    //Reservation active list,(carID; Start Date; End date;  start trip button; cancel reservation buttton)
}


function openModalTrip(event)
{
    carId = $(event).closest('tr').find('td:nth-child(2)').text();
    // Pass the carId to the modal for reference
    console.log(carId);
    updateGlobalUserData();
    console.log(globalUsername);





    var modal = document.getElementById('reservationModal');




    reservationModal.style.display = 'flex';
  




}

function closeModalTrip()
{
    document.getElementById('reservationModal').style.display = 'none';
}


function startTrip()
{
     // if in modal start trip start trip, reverse as end trip 
    userTripChange(0);

}

function endTrip()
{   
    userTripChange(1);
    //Ends the trip, changes: 
      //reservation as complete
      //trip as ended
      //car as free
      //calls rate trip
      //if problem create issue
      //c
}

function rateTrip()
{
     //Ar viskas gerai? Jei ne call createIssue
}

function createIssue()
{ 
    //if problem after trip, create IssueDB ticket, username, dateRegistered, description, status
}

function getLocation()
{
    //if user active trip, check location, update current car location.
}