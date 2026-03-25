// Navbar JavaScript

function updateNavbar() {
  const userNav = document.getElementById('userNav');
  const user = getUser();

  if (user && userNav) {
    userNav.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span>${user.name}</span>
        <a href="dashboard.html">Dashboard</a>
        <a href="javascript:logout()">Logout</a>
      </div>
    `;
  } else if (userNav) {
    userNav.innerHTML = '<a href="login.html">Login</a>';
  }
}

// Update navbar on page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
});
