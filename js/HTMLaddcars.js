
//0- bent darbuotojas, 1- bent technikas, 2-admin
var reqLevel=2;

updateGlobalUserData()
  .then(level => {
    var roleResult = checkRole(reqLevel);
    // Now you can use roleResult in the if condition or any other part of your code
    if (roleResult) {
      var addCarForm = document.getElementById('pridedFormaMas');
      addCarForm.style.display = 'block';
    } else {
        var addCarForm = document.getElementById('pridedFormaMas');
        addCarForm.style.display = 'none';
    }
})
.catch(error => {
  addCarForm.style.display = 'none';
  console.error("Klaida naujinant duomenis:", error);
});

function submitCar(event)
{
    event.preventDefault();
    var carsDBId = document.getElementById('carsDBId').value;
    var carsDBModel = document.getElementById('carsDBModel').value;
    var carsDBReleaseYear = document.getElementById('carsDBReleaseYear').value;
    var carsDBInsuranceDate = document.getElementById('carsDBInsuranceDate').value;
    var carsDBTechDate = document.getElementById('carsDBTechDate').value;
    var carsDBPower = document.getElementById('carsDBPower').value;
    var carsDBUsability = "Neužimta";

    var carsDBfuel = document.getElementById('carsDBfuel');
    var selectedFuel = carsDBfuel.options[carsDBfuel.selectedIndex].value;

    var carsDBgearbox = document.getElementById('carsDBgearbox');
    var selectedGearbox = carsDBgearbox.options[carsDBgearbox.selectedIndex].value;

    var carsDBtrain = document.getElementById('carsDBtrain');
    var selectedTrain = carsDBtrain.options[carsDBtrain.selectedIndex].value;
    
    if(carsDBId)
    {
    DBCarPost(carsDBId, carsDBModel, selectedGearbox, carsDBReleaseYear, carsDBInsuranceDate, carsDBTechDate, carsDBPower, selectedTrain, selectedFuel, carsDBUsability) 
    showNotification("Automobilis pridėtas");
    }

}
