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

    function getImg(dishname, image) {
        let data = new URLSearchParams();
        data.append("dishname", dishname);

        fetch("GetFoodImgServlet", {
            method: "POST",
            body: data
        })
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    console.error("Failed to retrieve image.");
                    throw new Error("Failed to retrieve image.");
                }
            })
            .then((blob) => {
                const blobUrl = URL.createObjectURL(blob);
                image.src = blobUrl;

            })
            .catch((error) => {
                console.error("Error retrieving image:", error);
                const fallbackImageUrl =
                    "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg";
                image.src = fallbackImageUrl;

            });

    }
        
    function createMenuItem(dish) {
	    const menuItem = document.createElement('div');
	    menuItem.className = 'menu-item';
	
	    const foodImageBox = document.createElement('div');
	    foodImageBox.className = 'food-image-box';
	    const image = document.createElement('img');
	    getImg(dish.dishName, image);
        image.alt = `${dish.dishName} image`;
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
	    if (localStorage.getItem("username") != null)
	    {
			const reviewLink = document.createElement('a');
		    reviewLink.href = "review.html";
		    reviewLink.textContent = "Reviews";
		    reviewLink.addEventListener('click', function(event) {
		        event.preventDefault();
		        localStorage.setItem('selectedDish', JSON.stringify(dish));
		        window.location.href = 'Reviews.html';
		    });
		    
		    foodLinks.appendChild(reviewLink);
		    foodLinks.appendChild(document.createTextNode(" | "));
		}
		
		foodLinks.appendChild(ingredientsLink);
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
				const foodDetails = item.querySelector('.food-details');
                const itemAllergens = Array.from(foodDetails.querySelectorAll('.legend-item span'))
                .map(span => span.className.split('-')[1]);

                if (selectedAllergens.length === 0 || selectedAllergens.every(allergen => !itemAllergens.includes(allergen))) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /* menuData.breakfast.forEach(dish => breakfastMenuContainer.appendChild(createMenuItem(dish)));
    menuData.lunch.forEach(dish => lunchMenuContainer.appendChild(createMenuItem(dish))); */
});