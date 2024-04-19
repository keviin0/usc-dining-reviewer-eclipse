



const userCounts = {};
// object to store number of users for each dinning hall

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 20902230; // Radius of the Earth in feet
    
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);
    
    // Calculate differences between coordinates
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;
    
    // Calculate distance using Haversine formula
    const a = Math.sin(deltaLat / 2) * 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    
    return distance;
};


function toRadians(degrees) {
    return degrees * Math.PI / 180;
};



function withinRadius(lat1, lon1, lat2, lon2, radius = 250) {
    // Calculate distance between two points
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    
    // Check if the distance is within the specified radius
    return distance <= radius;
};
 // This will print true or false

//EVK COORDINATES 
// Latitude: 34.022383
//Longitude: -118.280999

//PARKSIDE COORDINATES
//Latitude: 34.019405
//Longitude: -118.28582

//MCCARTHY
//Latitude: 34.022508
//Longitude: -118.283215

function getNumUsers(diningHall){
	let numUsers; 
	let diningHallLat;
	let diningHallLong; 
	let latitude;
	let longitude; 
	if ("geolocation" in navigator) {
    // Get current position
    navigator.geolocation.getCurrentPosition(
        // Success callback function
        function(position) {
            // Access latitude and longitude from the position object
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            // Do something with the latitude and longitude
            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);
        },
        // Error callback function
        function(error) {
            console.error("Error getting location:", error.message);
        }
    )
    
   
} else {
    console.error("Geolocation is not supported by this browser.");
}
	if(diningHall == "Everybody's Kitchen")
{
	diningHallLat = 34.02283;
    diningHallLong = -118.28099; 
}
if(diningHall == "Parkside")
{
	diningHallLat = 34.019405;
	diningHallLong = -118.28582; 
}
if(diningHall == "USC Village Dining Hall")
{
	diningHallLat = 34.022508;
	diningHallLong = -118.283215; 
}

if(withinRadius(diningHallLat,diningHallLong,latitude,longitude))
{
	//CURRENT USER IS WITHING RADIUS OF DINNING HALL
	userCounts[diningHall] = userCounts[diningHall] ? userCounts[diningHall] + 1 : 1;
	
}
	numUsers = userCounts[diningHall] || 0;
	return numUsers;
};


function getWaitTime(numUsers)
{
	let waitTime; 
	
	waitTime = numUsers*1.5; 
	
	return waitTime + " min";
};

function calculateActivityLevel(numUsers) {
    let activityLevelPercent;

    // Determine the activity level based on the number of users
   activityLevelPercent = numUsers*2; 

    return activityLevelPercent + "%";
};

document.addEventListener('DOMContentLoaded', function() {
    const diningOptions = [
        { name: "Everybody's Kitchen", activityLevel: '13%', waitTime: '20 min.', logo: 'assets/everybodys_kitchen_logo.png' },
        { name: "Parkside", activityLevel: '91%', waitTime: '30 min.', logo: 'assets/parkside_logo.png' },
        { name: "USC Village Dining Hall", activityLevel: '27%', waitTime: '10 min.', logo: 'assets/usc_village_logo.png'}
    ];
    console.log("here 1");
    

    const diningOptionsContainer = document.getElementById('dining-options');
   
        diningOptions.forEach(option => {
            const numUsers = getNumUsers(option.name);
            const activityLevelPercent = calculateActivityLevel(numUsers);
            const waitTime = getWaitTime(numUsers);
            
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
             optionElement.innerHTML = `
            <div class="logo-container">
                <img class="dining-hall-logo" src="${option.logo}" alt="Dining Hall Logo" />
            </div>
            <div class="name">${option.name}</div>
            <div class="status-bar">
                <img src="assets/users.png" alt="Timer" class="icon" />
                <div class="bar-background">
                    <div class="activity-bar" style="width: ${activityLevelPercent};"></div>
                </div>
                <span class="activity-level">${activityLevelPercent}</span>                
            </div>
            <div class="wait-time">
                <span class="wait-time">
                    <img src="assets/clock.png" alt="Timer" class="icon" />
                    <span class="wait-time-text">${waitTime}</span>   
                </span>
            </div>
        `;

        diningOptionsContainer.appendChild(optionElement);
    });
            
   
   
});  	
    
    
        
        //const numUsers = getNumUsers(option.name);
      //  console.log("Num users is " + numUsers + " at " + option.name)
       
       
        
       
        
        
 
		 
		 
       







