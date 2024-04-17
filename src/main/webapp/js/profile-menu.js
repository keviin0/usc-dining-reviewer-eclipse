var state; // implementing a state machine to smoothly transition between the different styles of the profile menu
var min = 0;
var norm = 1;
var loc = 2;
var setting = 3;
// state = 0: minimized view
// state = 1: normal expanded view
// state = 2: location toggle view
// state = 3: setting toggle view

document.addEventListener("DOMContentLoaded", function () {
    
    
    // ---- ARROW MINIMIZE EXPAND FUNCTION ---------//
    // elements for changing profile view
    var arrow = document.querySelector(".dropdown-arrow");
    var menu = document.querySelector(".dropdown-menu");
    var closearrow = document.querySelector(".arrow");
    // arrow that turns to expanded (norm) state
    arrow.addEventListener("click", function () {
        //menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
        menu.style.display = "flex";
        state = norm;
    });
    closearrow.addEventListener("click", function () {
        if (state === norm) {
            // the profile mneu is norm state so when close arrow is clicked we should close the menu
            menu.style.display = "none";
            state = min;
            //
        } else if (state === loc || state === setting) {
            // the menu is displaying location toggle we should return to norm display when arrow is clicked
            state = norm;
            toggleToNormal();
        }
    });
    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && !arrow.contains(event.target)) {
            if (state === loc || state == setting) {
                toggleToNormal();
            }
            state = min;
            menu.style.display = "none";
        }
    });
    
    // --------- LOCATION TOGGLE --------//
    // Get the checkbox element for location
    var locationToggle = document.querySelector(
        "#switch-div input[type='checkbox']"
    );
    // Add event listener for the toggle change - TODO <<<<<<<<<<<<
    locationToggle.addEventListener("change", function () {
        alert("LOCATION TOGGLING NOT IMPLEMENTED YET!");
        if (locationToggle.checked) {
            // location is on!
            console.log("Location turned on!");
        } else {
            // location is off
            console.log("Location turned off!");
        }
    });

    // -------- DARK MODE TOGGLE -----------///
    // Get the checkbox element for dark toggle
    var darkModeToggle = document.querySelector(
        "#darktoggle-div input[type='checkbox']"
    );
    // Check if dark mode is already enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        // Set the checkbox state to checked
        darkModeToggle.checked = true;
        // Change the CSS link to landingpageDark.css
        document.getElementById("darkCSS").disabled = false;
        document.getElementById("lightCSS").disabled = true;
    }
    // Add event listener for the toggle change
    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            // Dark mode enabled
            // Store dark mode state in localStorage
            localStorage.setItem("darkMode", "enabled");
            // Change the CSS link to landingPageDark.css
            document.getElementById("darkCSS").disabled = false;
            document.getElementById("lightCSS").disabled = true;
        } else {
            // Dark mode disabled
            // Remove dark mode state from localStorage
            localStorage.removeItem("darkMode");
            // Change the CSS link to landingPage.css
            document.getElementById("darkCSS").disabled = true;
            document.getElementById("lightCSS").disabled = false;
        }
    });
    
    
    
});

// ------- UPDATE SOMETHING EITHER LOCALSTORAGE, A COOKIE, OR URL PARAM TODO <<<<<<<<<
function logout() {
    // Print into console this text to verify logout function was called
    console.log("logout Initiated!");
}


// SWITCH MENU TO LOCATION VIEW
function locationToggle() {
    state = loc; // LOCATION STATE

    // Get the elements that need to be modified
    var optionWrapper = document.querySelector(".OptionWrapper");
    var titleArea = document.querySelector(".TitleArea");

    var switchdiv = document.getElementById("switch-div");

    // Get all the .Option elements inside .OptionWrapper
    var options = optionWrapper.querySelectorAll(".Option");

    // Loop through each .Option element and hide it
    options.forEach(function (option) {
        option.style.display = "none";
    });

    // show the switch div
    switchdiv.style.display = "flex";

    // Hide the profile icon - doesnt work rn
    var pfp = titleArea.querySelector(".user-pfp");
    pfp.style.display = "hidden";

    // Update the title of the menu to "Location"
    var title = titleArea.querySelector("#expanded-username");
    title.textContent = "Location";
}


// SWITCH MENU TO SETTINGS VIEW
function settingsToggle() {
    state = setting; // LOCATION STATE

    // Get the elements that need to be modified
    var optionWrapper = document.querySelector(".OptionWrapper");
    var titleArea = document.querySelector(".TitleArea");


    // Get all the .Option elements inside .OptionWrapper
    var options = optionWrapper.querySelectorAll(".Option");

    // Loop through each .Option element and hide it
    options.forEach(function (option) {
        option.style.display = "none";
    });

    // add new options - username, email/password, Dark/Light
     options = optionWrapper.querySelectorAll(".Option_Settings");
     // Loop through each .Option element and display it
     options.forEach(function (option) {
         option.style.display = "flex";
     });
    
    // Hide the profile icon - doesnt work rn
    var pfp = titleArea.querySelector(".user-pfp");
    pfp.style.display = "hidden";

    // Update the title of the menu to "Location"
    var title = titleArea.querySelector("#expanded-username");
    title.textContent = "Settings";
}

/* Changes the display of the menu back to normal.
 * Currently only changes username back to placeholder text
 */
function toggleToNormal() {
    

    /// Get the elements that need to be modified
    var optionWrapper = document.querySelector(".OptionWrapper");
    var titleArea = document.querySelector(".TitleArea");
    var locationToggleBtn = document.querySelector(".LocationToggle");
    var switchdiv = document.getElementById("switch-div");

    // Get all the .Option elements inside .OptionWrapper
    var options = optionWrapper.querySelectorAll(".Option");

    // Loop through each .Option element and show it
    options.forEach(function (option) {
        option.style.display = "flex";
    });

    // hide the switch div
    switchdiv.style.display = "none";
    
    // hide setting options
     options = optionWrapper.querySelectorAll(".Option_Settings");
     // Loop through each .Option_Settings element and hide it
     options.forEach(function (option) {
         option.style.display = "none";
     });

    // Update the title of the menu back to "username"
    var title = titleArea.querySelector("#expanded-username");
    title.textContent = "username";

    // Show the profile icon
    var pfp = titleArea.querySelector(".user-pfp");
    pfp.style.display = "block";
    
    state = norm;
}

// changes CSS to darkmode
//function changeCSSLink(cssFile) {
//    var head = document.querySelector("head");
//    var linkElement = document.querySelector("link[href*='landingPage']");
//
//    // Remove the existing CSS link
//    head.removeChild(linkElement);
//
//    // Create a new link element for the specified CSS file
//    var newLinkElement = document.createElement("link");
//    newLinkElement.rel = "stylesheet";
//    newLinkElement.href = cssFile;
//
//    // Append the new link element to the head
//    head.appendChild(newLinkElement);
//}


function ChangeCredentials(){
    alert("CHANGING EMAIL AND PASSWORD NOT IMPLEMENTED YET!");
}
