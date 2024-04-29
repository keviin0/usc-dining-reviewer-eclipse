const userCounts = {};

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 20902256; // Radius of the Earth in feet
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

function sendDataToServlet(diningHall, around) {
    return new Promise((resolve, reject) => {
        let username = localStorage.getItem("username");
        let checker = localStorage.getItem("guestID");
        if (username === null) {
            if (checker === null) {
                username = Math.floor(10000000 + Math.random() * 90000000).toString();
                localStorage.setItem("guestID", username);
            } else {
                username = checker;
            }
        }
        const formData = {
            username: username,
            diningHall: diningHall,
            Around: around
        };
        $.ajax({
            url: "GeoServlet",
            type: "POST",
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(data) {
                resolve(JSON.parse(data));
                console.log("Data received:", diningHall, JSON.parse(data));
            },
            error: function(xhr, status, error) {
                console.error('Error:', status, error);
                reject('AJAX error: ' + error);
            }
        });
    });
}

function getNumUsers(diningHall) {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const diningHalls = {
                    "EVK": { lat: 34.0213, long: -118.2822 },
                    "Parkside": { lat: 34.0187, long: -118.2911 },
                    "McCarthy": { lat: 34.0257, long: -118.2862 }
                };
                let around = false;
                const hall = diningHalls[diningHall];
                if (hall && withinRadius(hall.lat, hall.long, latitude, longitude)) {
					around = true;
                    resolve(sendDataToServlet(diningHall, around));
                } else {
                    resolve(sendDataToServlet(diningHall, around));
                }
            }, function(error) {
                console.error("Error getting location:", error.message);
                reject("Geolocation error: " + error.message);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            reject("Geolocation not supported");
        }
    });
}

function getWaitTime(numUsers) {
    return numUsers * 1.5 + " min";
}

function calculateActivityLevel(numUsers) {
    return numUsers * 2 + "%";
}

document.addEventListener('DOMContentLoaded', async function() {
    const diningOptions = [
        { name: "EVK", logo: 'assets/everybodys_kitchen_logo.png' },
        { name: "Parkside", logo: 'assets/parkside_logo.png' },
        { name: "McCarthy", logo: 'assets/usc_village_logo.png' }
    ];
    const diningOptionsContainer = document.getElementById('dining-options');

    for (const option of diningOptions) {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.dataset.name = option.name;
        optionElement.innerHTML = `
            <div class="logo-container">
                <img class="dining-hall-logo" src="${option.logo}" alt="Dining Hall Logo" />
            </div>
            <div class="name">${option.name}</div>
            <div class="status-bar">
                <img src="assets/users.png" alt="Users Icon" class="icon" />
                <div class="bar-background">
                    <div class="activity-bar" style="width: 0%;"></div>
                </div>
                <span class="activity-level">Calculating...</span>
            </div>
            <div class="wait-time">
                <img src="assets/clock.png" alt="Clock Icon" class="icon" />
                <span class="wait-time-text">Calculating...</span>
            </div>
        `;
        diningOptionsContainer.appendChild(optionElement);
    }

    for (const option of diningOptions) {
        try {
            const numUsers = await getNumUsers(option.name);
            const activityLevelPercent = calculateActivityLevel(numUsers);
            const waitTime = getWaitTime(numUsers);

            const optionElements = Array.from(diningOptionsContainer.children);
            const targetElement = optionElements.find(el => el.dataset.name === option.name);
            if (targetElement) {
                targetElement.querySelector('.activity-bar').style.width = activityLevelPercent;
                targetElement.querySelector('.activity-level').innerText = activityLevelPercent;
                targetElement.querySelector('.wait-time-text').innerText = waitTime;

                const logoImg = targetElement.querySelector('.dining-hall-logo');
                logoImg.addEventListener('click', function() {
                    localStorage.setItem('selectedDiningHall', option.name);
                    window.location.href = 'dining-menu.html';
                });
            }

        } catch (error) {
            console.error('Failed to get user count for', option.name, 'with error:', error);
            const optionElements = Array.from(diningOptionsContainer.children);
            const targetElement = optionElements.find(el => el.dataset.name === option.name);
            if (targetElement) {
                targetElement.querySelector('.activity-level').innerText = "Error";
                targetElement.querySelector('.wait-time-text').innerText = "Error";
            }
        }
    }
});


