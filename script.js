// Check if the user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") === "true") {
      showContent();
    }
  });
  
  function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username && password) {
      // Check if the user already exists
      if (localStorage.getItem(username)) {
        displayMessage("User already exists! Please log in.");
      } else {
        // Store the new user in localStorage
        localStorage.setItem(username, password);
        displayMessage("Registration successful! You can now log in.");
      }
    } else {
      displayMessage("Please fill in all fields.");
    }
  }
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username && password) {
      const storedPassword = localStorage.getItem(username);
  
      if (storedPassword === password) {
        localStorage.setItem("loggedIn", "true");
        showContent();
      } else {
        displayMessage("Invalid username or password.");
      }
    } else {
      displayMessage("Please fill in all fields.");
    }
  }
  
  function logout() {
    localStorage.setItem("loggedIn", "false");
    document.getElementById("content").style.display = "none";
    document.getElementById("auth").style.display = "block";
    displayMessage("You have logged out.");
  }
  
  function showContent() {
    document.getElementById("auth").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
  
  function displayMessage(message) {
    document.getElementById("message").textContent = message;
  }

  