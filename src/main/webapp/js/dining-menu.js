document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.querySelector('.filter-button');
    const filterOptions = document.querySelector('.filter-options');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButton.addEventListener('click', function() {
        filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
    });
    
    filterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const selectedAllergens = Array.from(filterCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            menuItems.forEach(function(item) {
                const itemAllergens = Array.from(item.querySelectorAll('.food-allergens span'))
                    .map(span => span.classList[0].split('-')[1]);

                if (selectedAllergens.length === 0 || selectedAllergens.every(allergen => itemAllergens.includes(allergen))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});