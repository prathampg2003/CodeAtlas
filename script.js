function register() {
    // Redirect to ls.html when the "Sign Up" button is clicked
    window.location.href = "ls.html#register";
}

function login() {
    // Redirect to ls.html when the "Log in" button is clicked
    window.location.href = "ls.html#login";
}
document.addEventListener("DOMContentLoaded", function () {
    const aboutText = document.getElementById("aboutText");

    aboutText.innerHTML = aboutText.innerText.split(" ").map(word => {
        return `<span>${word}</span>`;
    }).join(" ");
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash === "#login") {
        // Show the login form
        var loginForm = document.getElementById("login");
        var registerForm = document.getElementById("register");
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else if (window.location.hash === "#register") {
        // Show the signup form
        var loginForm = document.getElementById("login");
        var registerForm = document.getElementById("register");
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
});

function scrollToAboutSection() {
    // Find the "page3" section by its ID
    const aboutSection = document.getElementById("about-section");

    if (aboutSection) {
        // Use the scrollIntoView() method with smooth behavior and an optional block property
        aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function scrollToContactUs() {
    // Find the "page3" section by its ID
    const aboutSection = document.getElementById("contact-us");

    if (aboutSection) {
        // Use the scrollIntoView() method with smooth behavior
        aboutSection.scrollIntoView({ behavior: "smooth" });
    }
}

// Function to trigger the fade-in animation
function triggerFadeInAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
        element.style.animation = 'fadeInRight 1s ease forwards';
    });
}

// Trigger the animation when the page loads
window.addEventListener('load', triggerFadeInAnimation);


