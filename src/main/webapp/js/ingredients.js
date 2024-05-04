document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dishName = decodeURIComponent(urlParams.get('dishName'));
    const allergens = decodeURIComponent(urlParams.get('allergens'));

    await updateIngredientPage(dishName, allergens);
});

async function updateIngredientPage(dishName, allergens) {
    document.querySelector('h2').textContent = dishName;

    try {
        const dishDetails = await getDishDetails(dishName);
        console.log(dishDetails);
        const ingredientsList = dishDetails.ingredients.split('\n');

        const ingredientsContainer = document.getElementById('ingredients-text');
        ingredientsContainer.innerHTML = '';

        const ul = document.createElement('ul');
        ingredientsList.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ul.appendChild(li);
        });

        ingredientsContainer.appendChild(ul);

    } catch (error) {
        console.error('Error updating dish details:', error);
        document.getElementById('ingredients-text').innerHTML = '<p>Error loading dish details.</p>';
    }

    const allergensContainer = document.getElementById('allergens-container');
    allergensContainer.innerHTML = '';

    const allergensList = allergens.split(',');
    allergensList.forEach(allergen => {
        const span = document.createElement('span');
        span.className = `allergen allergen-${allergen.trim()}`;
        allergensContainer.appendChild(span);
    });
}

async function getDishDetails(dishName) {
    const url = 'IngredientsServlet';
    const data = { dishname: dishName };

    try {
        const response = await $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json'
        });

        if (!response) {
            throw new Error('Dish details not found in the response');
        }

        return response;
    } catch (error) {
        console.error('Error fetching dish details:', error);
        return null;
    }
}