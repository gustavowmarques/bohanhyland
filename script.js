document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully");

    if (typeof bootstrap !== "undefined") {
        console.log("Bootstrap is loaded!");
    } else {
        console.error("Bootstrap is NOT loaded! The navbar might be affected.");
    }

    // Ensure navbar elements exist
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        console.log("Navbar found in DOM.");
    } else {
        console.error("Navbar NOT found in DOM.");
    }

    /* === User Authentication Logic === */
    if (localStorage.getItem("loggedIn") === "true") {
        showContent();
    }

    function showContent() {
        const authSection = document.getElementById("auth");
        const contentSection = document.getElementById("content");

        if (authSection && contentSection) {
            authSection.style.display = "none";
            contentSection.style.display = "block";
        }
    }

    function displayMessage(message) {
        const messageElement = document.getElementById("message");
        if (messageElement) {
            messageElement.textContent = message;
        }
    }

    // === Back to Top Button Logic ===
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (backToTopBtn) {
        console.log("Back to Top button found");

        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", function () {
            console.log("Back to Top button clicked");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    } else {
        console.error("Error: #backToTopBtn not found!");
    }

    // === Property Listings Filtering Logic ===
    const properties = [
        { id: 1, name: "Luxury Apartment", location: "dublin", price: 500000, img: "./Images/luxury.jpg" },
        { id: 2, name: "Cozy House", location: "galway", price: 350000, img: "./Images/cozy.jpg" },
        { id: 3, name: "Modern Condo", location: "dublin", price: 420000, img: "./Images/modernCondo.jpg" },
        { id: 4, name: "Luxury City Center", location: "limerick", price: 465000, img: "./Images/limerickcity.jpg" },
        { id: 5, name: "Big country house in Galway", location: "galway", price: 350000, img: "./Images/galwaycountry.jpg" },
        { id: 6, name: "Country House in Donegal", location: "donegal", price: 250000, img: "./Images/donegalold.jpg" },
    ];

    function displayProperties(filteredProperties) {
        const propertyList = document.getElementById("property-list") || document.getElementById("lettings-list");
        if (propertyList) {
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

        // Initial display of properties
        displayProperties(properties);
    }

    // === Mortgage Calculator Logic (Only Runs on Pages that Contain It) ===
    if (document.getElementById("mortgage-form")) {
        console.log("Mortgage calculator found. Initializing...");

        const amountInput = document.getElementById("amount-input");
        const interestRateInput = document.getElementById("interest-rate-input");
        const lengthOfLoanInput = document.getElementById("length-of-loan-input");
        const calculateBtn = document.getElementById("calculate-btn");
        const resetBtn = document.getElementById("reset-btn");
        const mortgageFinalResult = document.getElementById("mortgage-final-result");

        if (amountInput && interestRateInput && lengthOfLoanInput && calculateBtn && resetBtn && mortgageFinalResult) {
            function calculateMortgagePayment() {
                const borrowedMoney = parseFloat(amountInput.value);
                const lengthOfLoan = parseInt(lengthOfLoanInput.value) * 12; // Convert years to months
                const interestRate = parseFloat(interestRateInput.value);

                if (isNaN(borrowedMoney) || isNaN(lengthOfLoan) || isNaN(interestRate)) {
                    mortgageFinalResult.textContent = "Please enter valid numbers!";
                    mortgageFinalResult.classList.add("error-message");
                    return;
                }

                const calculatedInterest = interestRate / 100;
                const interestReady = calculatedInterest / 12;
                const exponentiationOperator = (1 + interestReady) ** lengthOfLoan;
                const monthlyPayment = (borrowedMoney * interestReady * exponentiationOperator) / (exponentiationOperator - 1);

                mortgageFinalResult.textContent = `🧮 Your monthly mortgage payment will be: €${monthlyPayment.toFixed(2)}`;
                mortgageFinalResult.classList.add("success-message");
                calculateBtn.classList.add("form-success");
                calculateBtn.setAttribute("disabled", "disabled");
                resetBtn.style.display = "block";
            }

            calculateBtn.addEventListener("click", function () {
                if (amountInput.validity.valid && interestRateInput.validity.valid && lengthOfLoanInput.validity.valid) {
                    calculateMortgagePayment();
                } else {
                    mortgageFinalResult.textContent = "There is an error in the form, please check it! 😥";
                    mortgageFinalResult.classList.add("error-message");
                    calculateBtn.classList.add("form-error");
                }
            });

            resetBtn.addEventListener("click", function () {
                resetBtn.style.display = "none";
                mortgageFinalResult.textContent = "";
                calculateBtn.removeAttribute("disabled");
                calculateBtn.classList.remove("form-success");
            });

        } else {
            console.error("Error: One or more mortgage calculator elements are missing in the DOM!");
        }
    } else {
        console.log("Mortgage calculator not found on this page. Skipping initialization.");
    }
});
