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
                <span class="activity-level">${option.activityLevel}</span>                
            </div>
            <div class="wait-time">
                <span class="wait-time">
                    <img src="assets/clock.png" alt="Timer" class="icon" />
                    <span class="wait-time-text">${option.waitTime}</span>   
                </span>
            </div>
        `;

        diningOptionsContainer.appendChild(optionElement);
    });
});