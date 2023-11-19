document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the email from sessionStorage
    const userEmail = sessionStorage.getItem("userEmail");

    // Autofill the email field with the stored value
    const emailField = document.getElementById("email");
    if (emailField) {
        emailField.value = userEmail;

        // Make an API request to get user information based on the email
        getUserInfo(userEmail);
        getAdditionalProfileInfo(userEmail);
        getLanguagesUsed(userEmail);
    }

    // Additional functionality...
    // (You can add more code here if needed)

    // Example: Log the autofilled email to the console
    console.log("Autofilled email:", userEmail);

    const logoutButton = document.querySelector(".logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

function logout() {
    // Clear user session
    sessionStorage.removeItem("userEmail");

    // Redirect to the login page
    window.location.href = "index.html";
}


async function getAdditionalProfileInfo(email) {
    try {
        const response = await fetch(`https://profile-14jc.onrender.com/getProfileByEmail?email=${email}`);
        if (response.ok) {
            const additionalInfo = await response.json();

            // Autofill additional profile information
            const genderField = document.getElementById("gender");
            const phoneNumberField = document.getElementById("phone_number");
            const githubLinkField = document.getElementById("github_link");
            const otherLinkField = document.getElementById("other_link");
            const linkedinLinkField = document.getElementById("linked_link");

            if (genderField) {
                genderField.value = additionalInfo.gender || "";
            }

            if (phoneNumberField) {
                phoneNumberField.value = additionalInfo.phone_number || "";
            }

            if (githubLinkField) {
                githubLinkField.value = additionalInfo.github_link || "";
            }

            if (otherLinkField) {
                otherLinkField.value = additionalInfo.other_link || "";
            }

            if (linkedinLinkField) {
                linkedinLinkField.value = additionalInfo.linked_link || "";
            }
        } else {
            console.error("Failed to fetch additional profile information");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to make an API request to get user information
async function getUserInfo(email) {
    try {
        const response = await fetch(`https://lisu.onrender.com/getUserInfo?email=${email}`);
        if (response.ok) {
            const userInfo = await response.json();

            // Autofill first name and last name fields
            const firstNameField = document.getElementById("firstname");
            const lastNameField = document.getElementById("lastname");

            if (firstNameField && lastNameField) {
                firstNameField.value = userInfo.first_name;
                lastNameField.value = userInfo.last_name;
            }
            
        } else {
            console.error("Failed to fetch user information");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function getLanguagesUsed(email) {
    try {
        const response = await fetch(`https://tag-9cb3.onrender.com/getTags?user_email=${email}`);
        if (response.ok) {
            const languagesUsed = await response.json();
            console.log(languagesUsed)
            const languagesUsedField = document.getElementById("languages_used");

            if (languagesUsedField) {
                languagesUsedField.value = languagesUsed.join(', '); // Display languages as a comma-separated list
            }
        } else {
            console.error("Failed to fetch code languages used");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}





async function saveProfileData(profileData) {
    try {
        const response = await fetch("https://profile-14jc.onrender.com/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        });

        if (response.ok) {
            alert("Changes successful!");
            console.log("Profile data saved successfully");
        } else {
            console.error("Failed to save profile data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to handle the submit button click
function submitProfile() {
    console.log("wkmd");
    // Retrieve form values
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phone_number").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const otherLink = document.getElementById("other_link").value;
    const githubLink = document.getElementById("github_link").value;
    const linkedLink = document.getElementById("linked_link").value;
    // Prepare the profile data
    const profileData = {
        useremail: email,
        gender: gender,
        phone_number: phoneNumber,
        github_link: githubLink,
        linked_link: linkedLink,
        other_link: otherLink,
    };

    // Make an API request to save the profile data
    saveProfileData(profileData);
}
