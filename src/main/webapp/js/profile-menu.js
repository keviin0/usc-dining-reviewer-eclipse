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