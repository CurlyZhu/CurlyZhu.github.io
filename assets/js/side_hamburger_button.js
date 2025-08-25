const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidenav');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.textContent = hamburger.classList.contains('active') ? '✕' : '☰';
}

// Toggle sidebar when hamburger is clicked
hamburger.addEventListener('click', toggleSidebar);