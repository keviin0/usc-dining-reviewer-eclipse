document.addEventListener('DOMContentLoaded', function() {
	var menuContainer = document.querySelector(".menu");
	const filterButton = document.querySelector('.filter-button');
	const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
	const filterOptions = document.querySelector('.filter-options');
	
	filterButton.addEventListener('click', function() {
        filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
    });
    
	$(document).ready(function() {
	    var payload = {
	        diningHall: localStorage.getItem("selectedDiningHall")
	    };
	
	    $.ajax({
	        url: 'FoodServlet',
	        type: 'POST',
	        contentType: 'application/json',
	        data: JSON.stringify(payload),
	        dataType: 'json',
	        success: function(data) {
	            var testData = data;
	            console.log(testData);
	
	            // Call function to update the UI with received data
	            updateMenus(testData);
	        },
	        error: function(xhr, status, error) {
	            console.error("Error occurred: " + error);
	        }
	    });
	
	    function updateMenus(menuData) {
	        menuData.forEach(dish => menuContainer.appendChild(createMenuItem(dish)));
	    }
	});
    

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
	    const encodedDishName = encodeURIComponent(dish.dishName);
    	const encodedAllergens = encodeURIComponent(dish.allergens);
	    /* ingredientsLink.href = "ingredients.html"; */
	    ingredientsLink.href = `ingredients.html?dishName=${encodedDishName}&allergens=${encodedAllergens}`;
	    ingredientsLink.textContent = "Ingredients";
	    const reviewLink = document.createElement('a');
	    reviewLink.href = "review.html";
	    reviewLink.textContent = "Reviews";
	    reviewLink.addEventListener('click', function(event) {
	        event.preventDefault();
	        localStorage.setItem('selectedDish', JSON.stringify(dish));
	        window.location.href = 'Reviews.html';
	    });
	    foodLinks.appendChild(ingredientsLink);
	    foodLinks.appendChild(document.createTextNode(" | "));
	    foodLinks.appendChild(reviewLink);
	
	    const allergensContainer = document.createElement('div');
	    allergensContainer.className = 'legend-item';
	    var allergensList = dish.allergens.split(',');
	    allergensList.forEach(allergen => {
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
				const imageBox = item.querySelector('.food-image-box')
				const foodDetails = item.querySelector('.food-details');
                /*const itemAllergens = Array.from(item.querySelectorAll('.allergens span'))
                    .map(span => span.classList[0].split('-')[1]); */
                    
                const itemAllergens = Array.from(foodDetails.querySelectorAll('.legend-item span'))
                .map(span => span.className.split('-')[1]);

                if (selectedAllergens.length === 0 || selectedAllergens.every(allergen => !itemAllergens.includes(allergen))) {
                    item.style.display = 'block';
                    item.style.alignItems = 'center';
					imageBox.style.flexShrink = '0';
					foodDetails.style.marginLeft = '20px';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* menuData.breakfast.forEach(dish => breakfastMenuContainer.appendChild(createMenuItem(dish)));
    menuData.lunch.forEach(dish => lunchMenuContainer.appendChild(createMenuItem(dish))); */
});