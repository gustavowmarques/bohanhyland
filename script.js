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
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        const registerPasswordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");
        const registerEmailInput = document.getElementById("registerEmail");
        const registerMessageBox = document.getElementById("registerMessage");
        const registerButton = document.getElementById("registerButton");

        function validateRegisterForm() {
            const registerPasswordInput = document.getElementById("password");
            const confirmPasswordInput = document.getElementById("confirmPassword");
            const registerMessageBox = document.getElementById("registerMessage");
            const registerButton = document.getElementById("registerButton");
        
            if (!registerPasswordInput || !confirmPasswordInput || !registerMessageBox || !registerButton) {
                console.error("❌ Missing form elements in register.html. Check IDs!");
                return;
            }
        
            const passwordValue = registerPasswordInput.value.trim();
            const confirmPasswordValue = confirmPasswordInput.value.trim();
        
            // Password strength check
            if (passwordValue.length < 8) {
                registerMessageBox.textContent = "❌ Password too weak (Must be at least 8 characters)";
                registerMessageBox.style.color = "red";
                registerButton.disabled = true;
                return;
            }
        
            // Password match check
            if (passwordValue !== confirmPasswordValue) {
                registerMessageBox.textContent = "❌ Passwords do not match!";
                registerMessageBox.style.color = "red";
                registerButton.disabled = true;
                return;
            }
        
            // If everything is correct, enable the register button
            registerMessageBox.textContent = "";
            registerButton.disabled = false;
        }
        

        registerPasswordInput.addEventListener("input", validateRegisterForm);
        confirmPasswordInput.addEventListener("input", validateRegisterForm);

        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            registerMessageBox.textContent = "✅ Registration successful!";
            registerMessageBox.style.color = "green";
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

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
});
