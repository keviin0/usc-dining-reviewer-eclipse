document.addEventListener("DOMContentLoaded", function() {
    var arrow = document.querySelector(".dropdown-arrow");
    var menu = document.querySelector(".dropdown-menu");

    arrow.addEventListener("click", function() {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    // Close the dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!menu.contains(event.target) && !arrow.contains(event.target)) {
            menu.style.display = "none";
        }
    });
});