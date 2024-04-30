var state; // implementing a state machine to smoothly transition between the different styles of the profile menu
var min = 0;
var norm = 1;
var loc = 2;
var setting = 3;
// state = 0: minimized view
// state = 1: normal expanded view
// state = 2: location toggle view
// state = 3: setting toggle view
var overlayMade = false;
var emailPopup = false;
var passwordPopup = false;

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
        document.getElementById("lightCSS").disabled = true;
        document.getElementById("lightCSS2").disabled = true;

        document.getElementById("darkCSS").disabled = false;
        document.getElementById("darkCSS2").disabled = false;

        // select all usericons
        let usericons = document.querySelectorAll(".usericon");
        // Loop through each usericon element
        usericons.forEach(function (usericon) {
            // Update the src attribute of each usericon element
            console.log("replacing image");
            usericon.src = "assets/users_dark.jpg"; //
        });

        let clockicons = document.querySelectorAll(".clockicon");
        // Loop through each usericon element
        clockicons.forEach(function (clockicon) {
            // Update the src attribute of each usericon element
            console.log("replacing image");
            clockicon.src = "assets/clock_dark.jpg"; //
        });
    }
    // Add event listener for the toggle change
    darkModeToggle.addEventListener("change", function () {
        if (darkModeToggle.checked) {
            // Dark mode enabled
            // Store dark mode state in localStorage
            localStorage.setItem("darkMode", "enabled");
            // Change the CSS link to landingPageDark.css
            // Change the CSS link to landingpageDark.css
            document.getElementById("lightCSS").disabled = true;
            document.getElementById("lightCSS2").disabled = true;

            document.getElementById("darkCSS").disabled = false;
            document.getElementById("darkCSS2").disabled = false;

            // select all usericons
            let usericons = document.querySelectorAll(".usericon");
            // Loop through each usericon element
            usericons.forEach(function (usericon) {
                // Update the src attribute of each usericon element
                console.log("replacing image");
                usericon.src = "assets/users_dark.jpg"; //
            });

            let clockicons = document.querySelectorAll(".clockicon");
            // Loop through each usericon element
            clockicons.forEach(function (clockicon) {
                // Update the src attribute of each usericon element
                console.log("replacing image");
                clockicon.src = "assets/clock_dark.jpg"; //
            });
        } else {
            // Dark mode disabled
            // Remove dark mode state from localStorage
            localStorage.removeItem("darkMode");
            // Change the CSS link to landingpageDark.css
            document.getElementById("lightCSS").disabled = false;
            document.getElementById("lightCSS2").disabled = false;

            document.getElementById("darkCSS").disabled = true;
            document.getElementById("darkCSS2").disabled = true;

            // select all usericons
            let usericons = document.querySelectorAll(".usericon");
            // Loop through each usericon element
            usericons.forEach(function (usericon) {
                // Update the src attribute of each usericon element
                usericon.src = "assets/users.png"; // Replace 'new_image_path.png' with the path of the new image
            });

            let clockicons = document.querySelectorAll(".clockicon");
            // Loop through each usericon element
            clockicons.forEach(function (clockicon) {
                // Update the src attribute of each usericon element
                console.log("replacing image");
                clockicon.src = "assets/clock.png"; //
            });
        }
    });

    // Check if user is logged in
    if (isLoggedin()) {
        // User is logged in, show all menu options
        document.getElementById("reviewsLink").style.display = "flex";
        document.getElementById("settingsToggle").style.display = "flex";
        document.getElementById("logoutButton").innerHTML =
            '<button class="LogOut" onClick="logout()">Log OUT</button>';
        if (localStorage.getItem("admin") === true) {
            document.getElementById("adminsLink").style.display = "flex";
        }
    } else {
        // User is not logged in, hide specific menu options
        document.getElementById("reviewsLink").style.display = "none";
        document.getElementById("settingsToggle").style.display = "none";
        document.getElementById("usernameOption").style.display = "none";
        document.getElementById("credentialsOption").style.display = "none";
        document.getElementById("darkModeOption").style.display = "flex";
        document.getElementById("logoutButton").innerHTML =
            '<button class="LogOut" onClick="login()">Log IN</button>';
        document.getElementById("adminsLink").style.display = "none";
    }
});

// ------- UPDATE SOMETHING EITHER LOCALSTORAGE, A COOKIE, OR URL PARAM TODO <<<<<<<<<
function logout() {
    // Print into console this text to verify logout function was called
    localStorage.clear();
    window.location.href = "login.html";
    console.log("logout Initiated!");
}

function login() {
    // Print into console this text to verify login function was called
    window.location.href = "login.html";
    console.log("login Initiated!");
}

// SWITCH MENU TO LOCATION VIEW
function locationToggle() {
    state = loc; // LOCATION STATE

    // just incase user is not logged in
    document.getElementById("darkModeOption").style.display = "none";

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

    // Update the title of the menu to "Settings"
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

    if (isLoggedin()) {
        // Loop through each .Option element and show it
        options.forEach(function (option) {
            option.style.display = "flex";
        });
        // hide setting options
        options = optionWrapper.querySelectorAll(".Option_Settings");
        // Loop through each .Option_Settings element and hide it
        options.forEach(function (option) {
            option.style.display = "none";
        });
    } else {
        document.getElementById("location-div").style.display = "flex";
        document.getElementById("darkModeOption").style.display = "flex";
    }

    // hide the switch div
    switchdiv.style.display = "none";

    // Update the title of the menu back to "username"
    var title = titleArea.querySelector("#expanded-username");
    title.textContent = "username";

    // Show the profile icon
    var pfp = titleArea.querySelector(".user-pfp");
    pfp.style.display = "block";

    state = norm;
}

function isLoggedin() {
    // get the user logged in state here
    if (localStorage.getItem("username") === null) return false;
    else return true;
}

function ChangeUsername() {
    // Create overlay element
    if (overlayMade === false) {
        var overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.setAttribute("id", "overlay");

        // Insert overlay before the container element
        let container = document.querySelector(".container");
        container.parentNode.insertBefore(overlay, container);
        overlayMade = true;
    } else {
        // overlay is made just show it
        var olay = document.getElementById("overlay");
        olay.style.display = "block"; // Display the overlay
    }

    // check if popup exists
    if (!document.getElementById("emailPopup")) {
        // Create the popup content
        console.log("creating email popup");
        var popupContent = `<div class="popup" id="emailPopup">
            <div class="popup-content">
                <span class="close" id="closeButton" onclick="closePopup()"">&times;</span>
                <p>Change Your Email:</p>
                <form id="emailChange-form">
                <input type="text" class="roundbox" id="changeEmail">
                <div class="submitchange-div">
                    <input type="submit" id="submitChangeEmail">
                </div>
                </form>
            </div>
        </div>`;
        // Create a new div element
        var popupContainer = document.createElement("div");
        // Set the HTML content of the new div element to the popup content
        popupContainer.innerHTML = popupContent;
        // Insert the popup before the container element
        let container = document.querySelector(".container");
        container.parentNode.insertBefore(popupContainer, container);

        document
            .getElementById("emailChange-form")
            .addEventListener("submit", emailChange);
    } else {
        console.log("revealing email popup");
        var emailpop = document.getElementById("emailPopup");
        emailpop.style.display = "flex";
    }
}

function emailChange(event) {
    event.preventDefault();
    // Get the form element
    var newEmail = document.getElementById("changeEmail").value;
    if (!validateEmail(newEmail)) {
        return; // if it is not USC.EDU end it here
    }

    newEmail = encodeURIComponent(newEmail);
    var oldEmail = localStorage.getItem("username");

    // Serialize data into a URI-encoded string
    var formData = "newEmail=" + newEmail + "&oldEmail=" + oldEmail;
    console.log(formData);

    // Check if form data is not empty
    if (oldEmail.length > 0 && newEmail.length > 0) {
        // Fetch request options
        var options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set the content type to application/x-www-form-urlencoded
            },
            body: formData // Pass the serialized form data as the body
        };

        // Fetch request to send form data to the servlet
        var errFlag = 0;
        fetch("changeEmailServlet", options)
            .then((response) => {
                if (!response.ok) {
                    errFlag = 1;
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful response from servlet
                console.log("Response from servlet:", data.status);
                if (errFlag != 1) {
                    alert("Email changed!");
                    localStorage.setItem("username", newEmail);
                    closePopup();
                } else {
                    alert(data.status);
                }
            })
            .catch((error) => {
                // Handle error
                alert(error);
                console.error("Error sending form data to servlet:", error);
            });
    } else {
        // Handle case where form data is empty
        console.error("Form data is empty");
        alert("Form data cannot be empty!");
    }
}

// Function to close the popup
function closePopup() {
    overlay.style.display = "none";
    var popup = document.getElementById("emailPopup");
    var popup2 = document.getElementById("passPopup");
    if (popup != null) {
        popup.style.display = "none";
    }
    if (popup2 != null) {
        popup2.style.display = "none";
    }
}

function ChangeCredentials() {
    // Create overlay element
    if (!document.getElementById("overlay")) {
        var overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.setAttribute("id", "overlay");

        // Insert overlay before the container element
        let container = document.querySelector(".container");
        container.parentNode.insertBefore(overlay, container);
        overlayMade = true;
    } else {
        // overlay is made just show it
        var olay = document.getElementById("overlay");
        olay.style.display = "block"; // Display the overlay
    }

    // check if popup exists
    if (!document.getElementById("passPopup")) {
        // Create the popup content
        console.log("creating pass popup");
        var popupContent = `<div class="popup" id="passPopup">
            <form id="passChange-form">
            <div class="popup-content">
                <span class="close" id="closeButton2" onclick="closePopup()"">&times;</span>
                <p>Change Your Password:</p>
                <input type="text" class="roundbox" id="changePass">
                <div class="submitchange-div">
                    <input type="submit" id="submitChangePass">
                </div>
                </form>
            </div>
        </div>`;
        // Create a new div element
        var popupContainer = document.createElement("div");
        // Set the HTML content of the new div element to the popup content
        popupContainer.innerHTML = popupContent;
        // Insert the popup before the container element
        let container = document.querySelector(".container");
        container.parentNode.insertBefore(popupContainer, container);

        document
            .getElementById("passChange-form")
            .addEventListener("submit", passChange);
    } else {
        console.log("revealing pass popup");
        var passpop = document.getElementById("passPopup");
        passpop.style.display = "flex";
    }
}

function validateEmail(email) {
    const regPat = /^[a-zA-Z0-9]+@usc\.edu$/;
    if (regPat.test(email)) {
        return true;
    } else {
        alert("Please Enter a Valid USC Email");
        return false;
    }
}

function passChange(event) {
    event.preventDefault();
    // Get the form element
    var newpass = document.getElementById("changePass").value;
    newpass = encodeURIComponent(newpass);
    var email = localStorage.getItem("username");

    // Serialize data into a URI-encoded string
    var formData = "newPass=" + newpass + "&email=" + email;
    console.log(formData);

    // Check if form data is not empty
    if (newpass.length > 0) {
        // Fetch request options
        var options = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Set the content type to application/x-www-form-urlencoded
            },
            body: formData // Pass the serialized form data as the body
        };

        // Fetch request to send form data to the servlet
        var errFlag = 0;
        fetch("changePassServlet", options)
            .then((response) => {
                if (!response.ok) {
                    errFlag = 1;
                }
                return response.json();
            })
            .then((data) => {
                // Handle successful response from servlet
                console.log("Response from servlet:", data.status);
                if (errFlag != 1) {
                    alert("Password changed!");
                    closePopup();
                } else {
                    alert(data.status);
                }
            })
            .catch((error) => {
                // Handle error
                alert(error);
                console.error("Error sending form data to servlet:", error);
            });
    } else {
        // Handle case where form data is empty
        console.error("Form data is empty");
        alert("Form data cannot be empty!");
    }
}
