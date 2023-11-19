document.addEventListener("DOMContentLoaded", function () {
    // Retrieve reward points from sessionStorage
    const rewardPoints = sessionStorage.getItem('rewardPoints');

    // Display reward points in the coin button
    const coinsButton = document.querySelector('.coins');
    
    if (coinsButton && rewardPoints) {
        coinsButton.value = rewardPoints;
    } else {
        coinsButton.value = '0'; // Default value if reward points are not available
    }
});
