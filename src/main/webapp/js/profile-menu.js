document.addEventListener("DOMContentLoaded", function() {
    var arrow = document.querySelector(".dropdown-arrow");
    var menu = document.querySelector(".dropdown-menu");

    arrow.addEventListener("click", function() {
        //menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
        menu.style.display = "flex";
        
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!menu.contains(event.target) && !arrow.contains(event.target)) {
            menu.style.display = "none";
        }
    });
});

function logout(){
    // Print "logout worked!" text
    console.log("logout worked!");
}

function locationToggle(){
    // Get the elements that need to be modified
    var optionWrapper = document.querySelector(".OptionWrapper");
    var titleArea = document.querySelector(".TitleArea");
    var locationToggleBtn = document.querySelector(".LocationToggle");

    // Hide the current contents of the menu
    optionWrapper.style.display = "none";

    // Update the title of the menu to "Location"
    var title = titleArea.querySelector("#expanded-username");
    title.textContent = "Location";

    // Show the location toggle button
    locationToggleBtn.style.display = "block";
}