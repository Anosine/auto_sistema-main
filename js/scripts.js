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

// Function to close the reservation modal
function closeReservationModal() {
  document.getElementById('reservationModal').style.display = 'none';
}