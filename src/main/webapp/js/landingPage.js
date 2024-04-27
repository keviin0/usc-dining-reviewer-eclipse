<<<<<<< Updated upstream
document.addEventListener('DOMContentLoaded', function() {
    const diningOptions = [
        { name: "Everybody's Kitchen", activityLevel: '20%', waitTime: '20 min.', logo: 'assets/everybodys_kitchen_logo.png' },
        { name: "Parkside", activityLevel: '91%', waitTime: '30 min.', logo: 'assets/parkside_logo.png' },
        { name: "USC Village Dining Hall", activityLevel: '27%', waitTime: '10 min.', logo: 'assets/usc_village_logo.png'}
    ];

    const diningOptionsContainer = document.getElementById('dining-options');

    diningOptions.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');

=======
const userCounts = {};

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 20902230; // Radius of the Earth in feet
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadius * c;
}

function withinRadius(lat1, lon1, lat2, lon2, radius = 250) {
    return calculateDistance(lat1, lon1, lat2, lon2) <= radius;
}

function sendDataToServlet(diningHall) {
    const formData = { diningHall: diningHall };
    $.ajax({
        url: "geoServlet",
        type: "POST",
        data: formData,
        success: function(data) {
            userCounts[diningHall] = JSON.parse(data);
            console.log("Data received:", userCounts[diningHall]);
        },
        error: function(xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}

function getNumUsers(diningHall) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const diningHalls = {
                "EVK": { lat: 34.02283, long: -118.28099 },
                "Parkside": { lat: 34.019405, long: -118.28582 },
                "McCarthy": { lat: 34.022508, long: -118.283215 }
            };
            const hall = diningHalls[diningHall];
            if (hall && withinRadius(hall.lat, hall.long, latitude, longitude)) {
                sendDataToServlet(diningHall);
            } else {
                console.log("User is not within the radius of", diningHall);
            }
        }, function(error) {
            console.error("Error getting location:", error.message);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

function getWaitTime(numUsers) {
    return numUsers * 1.5 + " min";
}

function calculateActivityLevel(numUsers) {
    return numUsers * 2 + "%";
}

document.addEventListener('DOMContentLoaded', function() {
    const diningOptions = [
        { name: "EVK", activityLevel: '13%', waitTime: '20 min', logo: 'assets/everybodys_kitchen_logo.png' },
        { name: "Parkside", activityLevel: '91%', waitTime: '30 min', logo: 'assets/parkside_logo.png' },
        { name: "McCarthy", activityLevel: '27%', waitTime: '10 min', logo: 'assets/usc_village_logo.png' }
    ];
    const diningOptionsContainer = document.getElementById('dining-options');

    diningOptions.forEach(option => {
        const numUsers = getNumUsers(option.name);
        const activityLevelPercent = calculateActivityLevel(numUsers);
        const waitTime = getWaitTime(numUsers);

        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
>>>>>>> Stashed changes
        optionElement.innerHTML = `
            <div class="logo-container">
                <img class="dining-hall-logo" src="${option.logo}" alt="Dining Hall Logo" />
            </div>
            <div class="name">${option.name}</div>
            <div class="status-bar">
                <img src="assets/users.png" alt="Timer" class="icon" />
                <div class="bar-background">
                    <div class="activity-bar" style="width: ${option.activityLevel};"></div>
                </div>
<<<<<<< Updated upstream
                <span class="activity-level">${option.activityLevel}</span>                
            </div>
            <div class="wait-time">
                <span class="wait-time">
                    <img src="assets/clock.png" alt="Timer" class="icon" />
                    <span class="wait-time-text">${option.waitTime}</span>   
                </span>
=======
                <span class="activity-level">${option.activityLevel}</span>
            </div>
            <div class="wait-time">
                <img src="assets/clock.png" alt="Timer" class="icon" />
                <span class="wait-time-text">${option.waitTime}</span>
>>>>>>> Stashed changes
            </div>
        `;
        diningOptionsContainer.appendChild(optionElement);
        const logoImg = optionElement.querySelector('.dining-hall-logo');
        logoImg.addEventListener('click', function() {
            localStorage.setItem('selectedDiningHall', option.name);
            window.location.href = 'dining-menu.html';
        });
    });
<<<<<<< Updated upstream
});
=======
});
>>>>>>> Stashed changes
