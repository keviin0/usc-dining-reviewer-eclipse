document.addEventListener('DOMContentLoaded', function() {
    const breakfastMenuContainer = document.querySelector('.breakfast-menu');
    const lunchMenuContainer = document.querySelector('.lunch-menu');
    const filterButton = document.getElementById('filterButton');
    const filterOptions = document.querySelector('.filter-options');
    const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');

    filterButton.addEventListener('click', () => {
        filterOptions.style.display = filterOptions.style.display === 'flex' ? 'none' : 'flex';
    });

    // Example JSON data for menu items
    const menuData = {
    "breakfast": [
        {
            "dishName": "Vegan Pancakes",
            "allergens": ["gluten"],
            "isVegan": true,
            "isVegetarian": true
        },
        {
            "dishName": "Omelette with Cheese",
            "allergens": ["egg", "dairy"],
            "isVegan": false,
            "isVegetarian": true
        },
        {
            "dishName": "Granola with Yogurt",
            "allergens": ["dairy", "nuts"],
            "isVegan": false,
            "isVegetarian": true
        },
        {
            "dishName": "Bagel with Smoked Salmon",
            "allergens": ["fish", "gluten"],
            "isVegan": false,
            "isVegetarian": false
        }
    ],
    "lunch": [
        {
            "dishName": "Halal Beef Sandwich",
            "allergens": ["gluten", "halal"],
            "isVegan": false,
            "isVegetarian": false
        },
        {
            "dishName": "Veggie Burger",
            "allergens": ["gluten"],
            "isVegan": true,
            "isVegetarian": true
        },
        {
            "dishName": "Chicken Caesar Salad",
            "allergens": ["dairy", "egg", "fish"],
            "isVegetarian": false
        },
        {
            "dishName": "Tomato Basil Soup",
            "allergens": [],
            "isVegan": true,
            "isVegetarian": true
        }
    ]
};

    function createMenuItem(dish) {
	    const menuItem = document.createElement('div');
	    menuItem.className = 'menu-item';
	
	    const foodImageBox = document.createElement('div');
	    foodImageBox.className = 'food-image-box';
	    const image = document.createElement('img');
	    image.src = 'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg';  // Placeholder image URL
	    image.alt = 'Placeholder Image';
	    foodImageBox.appendChild(image);
	
	    const foodDetails = document.createElement('div');
	    foodDetails.className = 'food-details';
	
	    const foodTitle = document.createElement('div');
	    foodTitle.className = 'food-title';
	    foodTitle.textContent = dish.dishName;
	
	    const foodLinks = document.createElement('div');
	    foodLinks.className = 'food-links';
	    const ingredientsLink = document.createElement('a');
	    ingredientsLink.href = "ingredients.html";
	    ingredientsLink.textContent = "Ingredients";
	    const reviewLink = document.createElement('a');
	    reviewLink.href = "review.html";
	    reviewLink.textContent = "Reviews";
	    reviewLink.addEventListener('click', function(event) {
	        event.preventDefault();
	        localStorage.setItem('selectedDish', JSON.stringify(dish));
	        window.location.href = 'reviews.html';
	    });
	    foodLinks.appendChild(ingredientsLink);
	    foodLinks.appendChild(document.createTextNode(" | "));
	    foodLinks.appendChild(reviewLink);
	
	    const allergensContainer = document.createElement('div');
	    allergensContainer.className = 'legend-item';
	    dish.allergens.forEach(allergen => {
	        const span = document.createElement('span');
	        span.className = `allergen-${allergen}`;
	        allergensContainer.appendChild(span);
	    });
	
	    foodDetails.appendChild(foodTitle);
	    foodDetails.appendChild(foodLinks);
	    foodDetails.appendChild(allergensContainer);
	
	    menuItem.appendChild(foodImageBox);
	    menuItem.appendChild(foodDetails);
	
	    return menuItem;
	}
    
    filterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const selectedAllergens = Array.from(filterCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(function(item) {
                const itemAllergens = Array.from(item.querySelectorAll('.allergens span'))
                    .map(span => span.classList[0].split('-')[1]);

                if (selectedAllergens.length === 0 || selectedAllergens.some(allergen => itemAllergens.includes(allergen))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    menuData.breakfast.forEach(dish => breakfastMenuContainer.appendChild(createMenuItem(dish)));
    menuData.lunch.forEach(dish => lunchMenuContainer.appendChild(createMenuItem(dish)));
});
