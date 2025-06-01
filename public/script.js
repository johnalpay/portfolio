window.onload = () => {
  const clock = document.getElementById("clock");
  const user = document.cookie.split('; ').find(row => row.startsWith('user='));
  const authForm = document.getElementById("authForm");
  const logoutForm = document.getElementById("logoutForm");
  const profileBox = document.getElementById("profileBox");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const profileName = document.getElementById("profileName");

  function updateClock() {
    const now = new Date();
    clock.textContent = now.toLocaleString();
  }

  setInterval(updateClock, 1000);
  updateClock();

  if (user) {
    const name = decodeURIComponent(user.split('=')[1]);
    authForm.style.display = 'none';
    logoutForm.style.display = 'flex';
    profileBox.style.display = 'block';
    usernameDisplay.textContent = name;
    profileName.textContent = name;
  }
};
