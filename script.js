document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page filename

    if (currentPage === "login.html" && localStorage.getItem("loggedIn") === "true") {
        window.location.href = "members-portal.html"; // Redirect only from the login page
    }
    
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

        /* === Property Listings Filtering === */
        const properties = [
            { id: 1, name: "Luxury Apartment", location: "dublin", price: 500000, img: "./images/luxury.jpg" },
            { id: 2, name: "Cozy House", location: "galway", price: 350000, img: "./images/cozy.jpg" },
            { id: 3, name: "Modern Condo", location: "dublin", price: 420000, img: "./images/modern-condo.jpg" },
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

    const contactForm = document.getElementById("contactUsForm");
    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const submitButton = contactForm.querySelector("button[type='submit']");

        function validateForm() {
            const isValid = contactForm.checkValidity();
            submitButton.disabled = !isValid;
        }

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener("input", validateForm);
        });

        contactForm.addEventListener("submit", function (event) {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.classList.add("was-validated");
            }
        });

        submitButton.disabled = true;
    }

    /* === Register Form Validation === */
    if (currentPage === "register.html") {
    console.log("Script loaded successfully");

    // Select registration form elements
    const registerForm = document.getElementById("registerForm");
    if (!registerForm) {
        console.error("❌ Register form not found in register.html!");
        return; // Exit if the form does not exist
    }

    const registerEmailInput = document.getElementById("registerEmail");
    const registerPasswordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const registerMessageBox = document.getElementById("registerMessage");
    const registerButton = document.getElementById("registerButton");

    // Debugging logs to verify elements
    console.log("📌 Checking if all required elements exist:");
    console.log("registerEmailInput:", registerEmailInput);
    console.log("registerPasswordInput:", registerPasswordInput);
    console.log("confirmPasswordInput:", confirmPasswordInput);
    console.log("registerMessageBox:", registerMessageBox);
    console.log("registerButton:", registerButton);

    if (!registerEmailInput || !registerPasswordInput || !confirmPasswordInput || !registerMessageBox || !registerButton) {
        console.error("❌ One or more form elements are missing. Fix register.html IDs!");
        return;
    }

    // Function to validate password strength and matching
    function validateRegisterForm() {
        const passwordValue = registerPasswordInput.value.trim();
        const confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue.length < 8) {
            registerMessageBox.textContent = "❌ Password too weak (Must be at least 8 characters)";
            registerMessageBox.style.color = "red";
            registerButton.disabled = true;
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            registerMessageBox.textContent = "❌ Passwords do not match!";
            registerMessageBox.style.color = "red";
            registerButton.disabled = true;
            return;
        }

        registerMessageBox.textContent = "";
        registerButton.disabled = false;
    }

    // Attach real-time validation
    registerPasswordInput.addEventListener("input", validateRegisterForm);
    confirmPasswordInput.addEventListener("input", validateRegisterForm);

    // Handle form submission
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page refresh

        if (!registerEmailInput || !registerPasswordInput || !confirmPasswordInput || !registerMessageBox || !registerButton) {
            console.error("❌ Missing form elements. Cannot register user.");
            return;
        }

        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            registerMessageBox.textContent = "❌ User already exists! Please log in.";
            registerMessageBox.style.color = "red";
            return;
        }

        // Save new user
        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        registerMessageBox.textContent = "✅ Registration successful! Redirecting to login...";
        registerMessageBox.style.color = "green";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });    

    }
   
    function logout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("loggedInUser");
    
        // Redirect to login page
        window.location.href = "login.html";
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
    
    if (currentPage === "order.html") {

    /* === Cart Functions === */
    function addToCart(id, name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }

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
    }

    function removeItemFromCart(itemId) {
        // Retrieve the current cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
        // Remove the item with the matching id
        cart = cart.filter(item => item.id !== parseInt(itemId));
        
        // Update the localStorage with the new cart array
        localStorage.setItem("cart", JSON.stringify(cart));
        
        // Re-render the cart display to reflect the removal
        displayCart();
    }
    
// Select the parent element containing the cart items
const cartItemsList = document.getElementById("cart-items");
if (cartItemsList) {
    // Attach a click event listener to the cart-items container
    cartItemsList.addEventListener("click", function (e) {
        // Check if the clicked element has the 'remove-item' class
        if (e.target && e.target.classList.contains("remove-item")) {
            // Retrieve the data-id attribute from the clicked button
            const id = e.target.getAttribute("data-id");
            // Call the function to remove the item from the cart
            removeItemFromCart(id);
        }
    });
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(id, name, price);
    });
});

document.getElementById('checkout-btn').addEventListener('click', checkout);



function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
        // (Implement your checkout logic here. For now, we’ll simply clear the cart.)
        localStorage.removeItem("cart");
        displayCart(); // Update the cart display
        alert("Checkout completed successfully!");
    } else {
        alert("Your cart is empty!");
    }
}
}

});

function login() {
    // Get input values
    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Retrieve stored users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if credentials match
    const validUser = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (validUser) {
        // Store login state
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));

        message.textContent = "✅ Login successful! Redirecting...";
        message.style.color = "green";

        // Redirect to members-portal.html after delay
        setTimeout(() => {
            window.location.href = "members-portal.html";
        }, 1500);
    } else {
        message.textContent = "❌ Invalid email or password!";
        message.style.color = "red";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully");

    function togglePasswordVisibility(checkboxId, passwordFieldId) {
        const checkbox = document.getElementById(checkboxId);
        const passwordField = document.getElementById(passwordFieldId);

        if (checkbox && passwordField) {
            checkbox.addEventListener("change", function () {
                passwordField.type = this.checked ? "text" : "password";
            });
        }
    }

    // Apply function to all password fields
    togglePasswordVisibility("showPassword1", "password");       // Main password field (Register)
    togglePasswordVisibility("showPassword2", "confirmPassword"); // Confirm Password (Register)
    togglePasswordVisibility("showPassword3", "password");       // Password field (Login)
});
