let debounceTimer;
const userEmail = sessionStorage.getItem("userEmail");


// Function to show the overlay
function on() {
    document.getElementById("overlay").style.display = "block";
}

// Function to hide the overlay
function off() {
    document.getElementById("overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    displayUserCodes();
    displayRewardPoints();
    const pushCodeButton = document.querySelector(".Push");
    if (pushCodeButton) {
        pushCodeButton.addEventListener("click", on);
    }

    const searchQueryInput = document.getElementById("searchQuery");
    const searchResultsBox = document.getElementById("searchResultsBox");

    if (searchQueryInput) {
        searchQueryInput.addEventListener("input", function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(searchCodes, 300);
        });

        document.addEventListener("click", function (event) {
            if (!event.target.matches("#searchQuery")) {
                searchResultsBox.style.display = "none";
            }
        });
    }

    const codeListContainer = document.getElementById("codeList");
    codeListContainer.addEventListener("click", function (event) {
        console.log("wdhdw");
        const clickedElement = event.target;

        // Check if a list item was clicked
        if (clickedElement.tagName === "LI") {
            const codeDescription = clickedElement.textContent.split(" - ")[1];
            
            // Fetch code details and navigate to details.html
            getCodeDetailsAndNavigate(userEmail, codeDescription);
        }
    });

    displayUserCodes();
});

async function displayUserCodes() {
    const userEmail = sessionStorage.getItem("userEmail");
    const codeListContainer = document.getElementById("codeList");

    if (!userEmail || !codeListContainer) {
        console.log("User not logged in or code list container not found.");
        return;
    }

    try {
        const response = await fetch(`https://push-hf0t.onrender.com/getUserCodes?email=${userEmail}`);
        if (response.ok) {
            const codes = await response.json();
            renderCodeList(codes, codeListContainer);
        } else {
            console.error("Failed to fetch user codes.");
        }
    } catch (error) {
        console.error("Error fetching user codes:", error);
    }
}

function renderCodeList(codes, codeListContainer) {
    codeListContainer.innerHTML = "";

    if (codes && codes.length > 0) {
        codes.forEach((code) => {
            const codeItem = document.createElement("li");
            codeItem.textContent = `${code.code_name} - ${code.code_description}`;
            codeListContainer.appendChild(codeItem);
        });
    } else {
        const noCodesMessage = document.createElement("li");
        noCodesMessage.textContent = "No codes found.";
        codeListContainer.appendChild(noCodesMessage);
    }
}

async function searchCodes() {
    const searchQuery = document.getElementById("searchQuery").value;
    const searchResultsBox = document.getElementById("searchResultsBox");

    try {
        const response = await fetch(`https://push-hf0t.onrender.com/search?query=${searchQuery}`);
        if (response.ok) {
            const searchResults = await response.json();
            renderSearchResultsBox(searchResults);
        } else {
            console.error("Failed to fetch search results.");
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

function renderSearchResultsBox(results) {
    const searchResultsBox = document.getElementById("searchResultsBox");
    searchResultsBox.innerHTML = "";

    if (results && results.length > 0) {
        results.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("search-result-item");
            resultItem.textContent = `${result.user_email} - ${result.code_description}`;
            resultItem.addEventListener("click", function () {
                getCodeDetailsAndNavigate(result.user_email, result.code_description);
            });
            searchResultsBox.appendChild(resultItem);
        });
        searchResultsBox.style.display = "block";
    } else {
        searchResultsBox.style.display = "none";
    }
}

async function getCodeDetailsAndNavigate(userEmail, codeDescription) {
    try {
        const response = await fetch(`https://push-hf0t.onrender.com/getCodeDetails?user_email=${userEmail}&code_description=${codeDescription}`);
        if (response.ok) {
            const codeDetails = await response.json();

            // Save code details in sessionStorage
            sessionStorage.setItem("codeDetails", JSON.stringify(codeDetails));

            // Navigate to details.html
            window.location.href = "details.html";
        } else {
            console.error("Failed to fetch code details.");
        }
    } catch (error) {
        console.error("Error fetching code details:", error);
    }
}

async function displayRewardPoints() {
    const coinsButton = document.querySelector(".coins");

    if (!userEmail || !coinsButton) {
        console.log("User not logged in or coins button not found.");
        return;
    }

    try {
        const response = await fetch(`https://reward-pjiz.onrender.com/reward/get?user_email=${userEmail}`);
        if (response.ok) {
            const data = await response.json();

            // Assuming the server response has a 'reward_points' property
            const rewardPoints = data.reward_points;
            sessionStorage.setItem("rewardPoints",rewardPoints);

            // Display the reward points in the "coins" button
            console.log(rewardPoints.toString())
            coinsButton.value = rewardPoints.toString();
        } else {
            console.error("Failed to fetch reward points.");
        }
    } catch (error) {
        console.error("Error fetching reward points:", error);
    }
}



function showMessage(message, isSuccess = true) {
    const messageElement = document.getElementById("pushMessage");
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.style.color = isSuccess ? "green" : "red";
    }
}


async function pushCode() {
    const loader = document.getElementById("loader");
    const overlay = document.getElementById("overlay");
    const userEmail = sessionStorage.getItem("userEmail");

    if (!userEmail) {
        alert("User not logged in. Please log in to push code.");
        return;
    }

    const codeName = document.getElementById("codeNameInput").value;
    const codeDescription = document.getElementById("codeDescriptionInput").value;
    const codeLanguage = document.getElementById("codeLanguageInput").value; // Get the code language from the input field
    const codeContent = document.querySelector(".code textarea").value;

    const codeData = {
        user_email: userEmail,
        code_name: codeName,
        code_description: codeDescription,
        code_language: codeLanguage,
        code_content: codeContent,
    };

    try {
        loader.style.display = "block";
        overlay.style.display = "block";

        // Call the /reward/post endpoint to reward 10 points
        const rewardResponse = await fetch(`https://reward-pjiz.onrender.com/reward/post?user_email=${userEmail}`, {
            method: "POST"
        });

        if (rewardResponse.ok) {
            // Points rewarded successfully
            console.log("Points rewarded successfully!");

            // Display a message that 10 points have been rewarded
            showMessage("10 points rewarded successfully!", true);
        } else {
            // Points rewarding failed
            console.error("Points rewarding failed.");
            showMessage("Points rewarding failed", false);
        }

        // Call the /pushCode endpoint to push the code details
        const response = await fetch("https://push-hf0t.onrender.com/pushCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(codeData),
        });

        if (response.ok) {
            // Post the code language to your API endpoint
            const codeLanguagePostResponse = await fetch("https://tag-9cb3.onrender.com/addTag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_email: userEmail, code_language: codeLanguage }),
            });

            if (codeLanguagePostResponse.ok) {
                console.log("Code language posted successfully!");
            } else {
                console.error("Code language posting failed.");
            }

            console.log("Code pushed successfully!");

            // Display a message that code pushed successfully
            showMessage("Code pushed successfully!", true);
            off();

            // Fetch and display user's codes after pushing
            displayUserCodes();
        } else {
            // Code pushing failed
            console.error("Code pushing failed.");
            showMessage("Code pushing failed", false);
        }
    } catch (error) {
        console.error("Error pushing code details:", error);
        showMessage("An error occurred while pushing code details", false);
    }
    finally {
        // Hide loader, whether the operation succeeded or failed
        loader.style.display = "none";
        overlay.style.display = "none";
    }
}

