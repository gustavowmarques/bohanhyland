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

  document.addEventListener("DOMContentLoaded", function () {
    console.log("Back to Top script loaded"); // Debugging check

    const backToTopBtn = document.getElementById("backToTopBtn");

    if (!backToTopBtn) {
        console.error("Error: #backToTopBtn not found!"); // Debugging
        return;
    }

    // Show the button when scrolling past 300px
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Scroll smoothly to the top when clicking the button
    backToTopBtn.addEventListener("click", function () {
        console.log("Button clicked - Scrolling to top");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
const lettings = [
  { id: 1, name: "City Centre Apartment", location: "dublin", price: 2200, img: "Images/cityApartment.jpg" },
  { id: 2, name: "Suburban House", location: "cork", price: 1800, img: "Images/Suburban House.jpg" },
  { id: 3, name: "Modern Loft", location: "galway", price: 1600, img: "Images/Modern Loft.jpg" }
];

function displayLettings(filteredLettings) {
  const lettingsList = document.getElementById("lettings-list");
  lettingsList.innerHTML = "";
  
  filteredLettings.forEach(property => {
      const propertyCard = `
          <div class="col-md-4 mb-3">
              <div class="card">
                  <img src="${property.img}" class="card-img-top" alt="${property.name}">
                  <div class="card-body">
                      <h5 class="card-title">${property.name}</h5>
                      <p class="card-text">Location: ${property.location}</p>
                      <p class="card-text">Monthly Rent: €${property.price.toLocaleString()}</p>
                  </div>
              </div>
          </div>
      `;
      lettingsList.innerHTML += propertyCard;
  });
}

document.getElementById("apply-filters").addEventListener("click", () => {
  const selectedLocation = document.getElementById("filter-location").value;
  const maxPrice = document.getElementById("filter-price").value;
  
  let filtered = lettings;
  if (selectedLocation !== "all") {
      filtered = filtered.filter(p => p.location === selectedLocation);
  }
  if (maxPrice) {
      filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  displayLettings(filtered);
});

window.onload = () => displayLettings(lettings);
const properties = [
  { id: 1, name: "Luxury Apartment", location: "dublin", price: 500000, img: "Images/luxury.jpg" },
  { id: 2, name: "Cozy House", location: "galway", price: 350000, img: "Images/cozy.jpeg" },
  { id: 3, name: "Modern Condo", location: "dublin", price: 420000, img: "Images/modernCondo.jpg" }
];

function displayProperties(filteredProperties) {
  const propertyList = document.getElementById("property-list");
  propertyList.innerHTML = "";
  
  filteredProperties.forEach(property => {
      const propertyCard = `
          <div class="col-md-4 mb-3">
              <div class="card">
                  <img src="${property.img}" class="card-img-top" alt="${property.name}">
                  <div class="card-body">
                      <h5 class="card-title">${property.name}</h5>
                      <p class="card-text">Location: ${property.location}</p>
                      <p class="card-text">Price: €${property.price.toLocaleString()}</p>
                  </div>
              </div>
          </div>
      `;
      propertyList.innerHTML += propertyCard;
  });
}

document.getElementById("apply-filters").addEventListener("click", () => {
  const selectedLocation = document.getElementById("filter-location").value;
  const maxPrice = document.getElementById("filter-price").value;
  
  let filtered = properties;
  if (selectedLocation !== "all") {
      filtered = filtered.filter(p => p.location === selectedLocation);
  }
  if (maxPrice) {
      filtered = filtered.filter(p => p.price <= maxPrice);
  }
  
  displayProperties(filtered);
});

window.onload = () => displayProperties(properties);
