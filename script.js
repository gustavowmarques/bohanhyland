document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully");

    /* === Check Dependencies === */
    if (typeof bootstrap !== "undefined") {
        console.log("Bootstrap is loaded!");
    } else {
        console.error("Bootstrap is NOT loaded! The navbar might be affected.");
    }

    if (typeof Swiper !== "undefined") {
        console.log("Swiper is loaded!");
        new Swiper(".mySwiper", {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            effect: "fade",
        });
    } else {
        console.error("Swiper is NOT loaded! Check if the script is included.");
    }

    /* === Navbar Existence Check === */
    const navbar = document.querySelector(".navbar");
    navbar ? console.log("Navbar found in DOM.") : console.error("Navbar NOT found in DOM.");

    /* === Authentication Logic === */
    function showContent() {
        const authSection = document.getElementById("auth");
        const contentSection = document.getElementById("content");
        if (authSection && contentSection) {
            authSection.style.display = "none";
            contentSection.style.display = "block";
        }
    }
    
    if (localStorage.getItem("loggedIn") === "true") {
        showContent();
    }

    /* === Back to Top Button === */
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        window.addEventListener("scroll", function () {
            backToTopBtn.classList.toggle("show", window.scrollY > 300);
        });
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* === Property Listings Filtering === */
    const properties = [
        { id: 1, name: "Luxury Apartment", location: "dublin", price: 500000, img: "./images/luxury.jpg" },
        { id: 2, name: "Cozy House", location: "galway", price: 350000, img: "./images/cozy.jpg" },
        { id: 3, name: "Modern Condo", location: "dublin", price: 420000, img: "./images/modernCondo.jpg" },
        { id: 4, name: "Luxury City Center", location: "limerick", price: 465000, img: "./images/limerick-city.jpg" },
        { id: 5, name: "Big country house in Galway", location: "galway", price: 350000, img: "./images/galway-county.jpg" },
        { id: 6, name: "Country House in Donegal", location: "donegal", price: 250000, img: "./images/donegal-old.jpg" },
    ];

    function displayProperties(filteredProperties) {
        const propertyList = document.getElementById("property-list") || document.getElementById("lettings-list");
        if (propertyList) {
            propertyList.innerHTML = filteredProperties.map(property => `
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
            `).join("");
        }
    }
    
    const applyFiltersBtn = document.getElementById("apply-filters");
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener("click", () => {
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
        displayProperties(properties);
    }

    /* === Mortgage Calculator === */
    if (document.getElementById("mortgage-form")) {
        console.log("Initializing Mortgage Calculator...");
        const amountInput = document.getElementById("amount-input");
        const interestRateInput = document.getElementById("interest-rate-input");
        const lengthOfLoanInput = document.getElementById("length-of-loan-input");
        const calculateBtn = document.getElementById("calculate-btn");
        const resetBtn = document.getElementById("reset-btn");
        const mortgageFinalResult = document.getElementById("mortgage-final-result");

        function calculateMortgagePayment() {
            const borrowedMoney = parseFloat(amountInput.value);
            const lengthOfLoan = parseInt(lengthOfLoanInput.value) * 12;
            const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
            const exponentiationOperator = (1 + interestRate) ** lengthOfLoan;
            const monthlyPayment = (borrowedMoney * interestRate * exponentiationOperator) / (exponentiationOperator - 1);

            mortgageFinalResult.textContent = `🧮 Your monthly mortgage payment: €${monthlyPayment.toFixed(2)}`;
        }
        
        calculateBtn.addEventListener("click", calculateMortgagePayment);
        resetBtn.addEventListener("click", function () {
            resetBtn.style.display = "none";
            mortgageFinalResult.textContent = "";
        });
    }

    /* === Contact Form === */
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if (this.checkValidity()) {
                new bootstrap.Modal(document.getElementById("exampleModal")).show();
                this.reset();
            } else {
                this.reportValidity();
            }
        });
    });
});

// Function to show a floating notification when an item is added
function showNotification(message) {
    const notification = document.getElementById("cart-notification");
    if (!notification) return; // Prevent errors if element is missing

    notification.textContent = message;
    notification.style.display = "block";
    notification.style.opacity = "1";
    notification.classList.add("show"); // Add a visible class

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            notification.style.display = "none";
            notification.classList.remove("show"); // Remove class
        }, 500);
    }, 2000);
}



// Updated addToCart function
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item exists, increase quantity instead of duplicating
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save to local storage
    displayCart(); // Refresh cart UI
    showNotification(`${name} added to cart!`); // Show message
}

// Function to remove an item from the cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the item and decrease the quantity, or remove if quantity is 1
    const updatedCart = cart.map(item => {
        if (item.id === id) {
            if (item.quantity > 1) {
                item.quantity -= 1;
                return item;
            } else {
                return null; // Mark for removal
            }
        }
        return item;
    }).filter(item => item !== null); // Remove marked items

    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart
    displayCart(); // Refresh cart display
}



// Function to display cart items in the modal
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems && cartTotal) {
        cartItems.innerHTML = cart.length
            ? cart.map(item => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${item.name} - €${item.price} x ${item.quantity}
                    <button class="btn btn-danger btn-sm remove-item" data-id="${item.id}">Remove</button>
                </li>
            `).join("")
            : `<li class="list-group-item">Your cart is empty</li>`;

        cartTotal.textContent = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    // Add event listeners to remove buttons dynamically
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}






