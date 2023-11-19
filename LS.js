var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.right = "4px";
    y.style.left = "-520px";
}

function register() {
    x.style.right = "-510px";
    y.style.left = "5px";
}

// Assuming your LS.js is executed after a successful login on ls.html

// Retrieve user email from the login form


// Redirect to main.html

document.addEventListener("DOMContentLoaded", function () {
    // ... (Your existing code)

    // Trigger login on pressing Enter in the login form
    document.getElementById("loginPassword").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default form submission
            document.getElementById("loginButton").click(); // Trigger the login button click
        }
    });

    // Trigger register on pressing Enter in the register form
    document.getElementById("password").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent the default form submission
            document.getElementById("registerButton").click(); // Trigger the register button click
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");

    function showLoader() {
        loader.style.display = "flex";
    }

    function hideLoader() {
        loader.style.display = "none";
    }

    const registerButton = document.getElementById("registerButton");
    const loginButton = document.getElementById("loginButton");

    registerButton.addEventListener("click", async function (e) {
        e.preventDefault();
        showLoader();

        const userData = {
            first_name: document.getElementById("firstname").value,
            last_name: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };

        console.log("Sending registration data to the API...");

        const response = await fetch("https://lisu.onrender.com/addUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        hideLoader();

        if (response.ok) {
            window.location.href = "ls.html#login"; // Redirect to login after successful registration
        } else {
            // Handle registration failure
        }
    });

    loginButton.addEventListener("click", async function (e) {
        e.preventDefault();
        showLoader();

        const loginData = {
            email: document.getElementById("loginUsername").value,
            password: document.getElementById("loginPassword").value,
        };

        console.log("Sending login data to the API...");

        const response = await fetch("https://lisu.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        hideLoader();

        if (response.ok) {
            const userEmail = document.getElementById("loginUsername").value;
            sessionStorage.setItem("userEmail", userEmail);
            console.log("Autofilled email:", userEmail);
            window.location.href = "main.html"; // Redirect to main after successful login
        } else {
            // Handle login failure
        }
    });
});