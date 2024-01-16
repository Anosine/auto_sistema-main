// SIDEBAR TOGGLE
let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

//TOGGLE MENU
function menuToggle(){
  const toggleMenu = document.querySelector('.menu');
  toggleMenu.classList.toggle('active')
}

//GET DATE AND TIME
function getCurrentTime() {
  var currentTime = new Date();

  // get components
  var year = currentTime.getFullYear();
  var month = currentTime.getMonth()+1;
  var day = currentTime.getDate()
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Adding zeroes
  month = (month < 10) ? '0' + month : month;
  day = (day < 10) ? '0' + day : day;
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  // string of date and time
  var formattedTime = year + '-'+ month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  return formattedTime;
}

function getTimeLength(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const diff = Math.abs(endDate - startDate);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days === 0) {
      return '<1 d.';
  }

  return days + ' d.';
}
//
function generateId(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


function showNotification(message) {
    var notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    // Hide the notification after 3 seconds (adjust as needed)
    setTimeout(function () {
        notification.style.display = 'none';
    }, 3000);
}

/* PERKELTAS Į carRental.js
//rezervation modal
// Function to open the reservation modal
document.addEventListener('DOMContentLoaded', function() {
  const reservationButton = document.querySelector('#reservationButton');
  const reservationModal = document.querySelector('#reservationModal');

  reservationButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior of the button
    reservationModal.style.display = 'flex';
  });
});

/ Function to close the reservation modal
function closeReservationModal() {
  document.getElementById('reservationModal').style.display = 'none';
}*/