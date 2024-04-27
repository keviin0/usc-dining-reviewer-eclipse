document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const dishName = decodeURIComponent(urlParams.get('dishName'));
    const allergens = decodeURIComponent(urlParams.get('allergens'));

    updateIngredientPage(dishName, allergens);
});

function updateIngredientPage(dishName, allergens) {
    document.querySelector('h2').textContent = dishName;
    
    const ingredientsText = getIngredientsText(dishName);
    const ingredientsList = ingredientsText.split('\n');

  const ingredientsContainer = document.getElementById('ingredients-text');
  ingredientsContainer.innerHTML = '';

  const ul = document.createElement('ul');
  ingredientsList.forEach(ingredient => {
    const li = document.createElement('li');
    li.textContent = ingredient;
    ul.appendChild(li);
  });

  ingredientsContainer.appendChild(ul);
    
    const allergensContainer = document.getElementById('allergens-container');
  allergensContainer.innerHTML = '';

  const allergensList = allergens.split(',');
  allergensList.forEach(allergen => {
    const span = document.createElement('span');
    span.className = `allergen allergen-${allergen.trim()}`;
    allergensContainer.appendChild(span);
  });
}
function getIngredientsText(dishName) {
    switch (dishName) {
		case 'Bagel with Smoked Salmon':
			return 'Bagel: Plain, sesame seed, everything, or your preferred flavor.\n' +
				'Smoked Salmon: Thinly sliced smoked salmon fillet (also known as lox).\n' +
				'Cream Cheese: Plain cream cheese.';
		case 'Chicken Caesar Salad':
			return 'Romaine Lettuce: Crisp and crunchy lettuce leaves.\n' +
			    'Grilled Chicken Breast: Tender grilled chicken breast, sliced or diced.\n' +
			    'Caesar Dressing: Creamy dressing typically made with anchovies, garlic, lemon juice, Dijon mustard, olive oil, Parmesan cheese, and black pepper.\n' +
			    'Croutons: Small pieces of toasted or fried bread for added crunch.\n' +
			    'Parmesan Cheese: Shaved or grated Parmesan cheese for garnish and flavor.';
        case 'Granola with Yogurt':
            return 'Granola: Made from oats, nuts, seeds, and dried fruits.\n' +
			    'Yogurt: Greek yogurt, regular yogurt, or dairy-free alternatives like almond or coconut yogurt.';
        case 'Halal Beef Sandwich':
            return 'Halal Beef: Sliced or shredded halal beef, cooked to perfection.\n' +
			    'Bread: Your choice of bread, such as white, whole wheat, ciabatta, or pita.\n' +
			    'Vegetables: Lettuce, tomato, onion, pickles, and any other favorite sandwich vegetables.\n' +
			    'Condiments: Mayonnaise, mustard, ketchup, barbecue sauce, or any other preferred condiments.';
        case 'Omelette with Cheese':
            return 'Eggs: Fresh eggs.\n' +
			    'Cheese: Grated cheese such as cheddar, mozzarella, or Swiss.';
        case 'Tomato Basil Soup':
            return 'Tomatoes: Fresh ripe tomatoes.\n' +
			    'Onion: Finely chopped onion for flavor and depth.\n' +
			    'Garlic: Minced garlic cloves for aromatic flavor.\n' +
			    'Basil: Fresh basil leaves, chopped, or dried basil for seasoning.\n' +
			    'Vegetable Broth: Vegetable broth or stock for the soup base.';
        case 'Vegan Pancakes':
            return 'Flour: All-purpose flour or whole wheat flour for the pancake batter.\n' +
			    'Plant-Based Milk: Almond milk, soy milk, oat milk, or any other non-dairy milk.\n' +
			    'Baking Powder: Baking powder to help the pancakes rise and become fluffy.\n' +
			    'Oil: Vegetable oil, coconut oil, or melted vegan butter for cooking the pancakes.';
        case 'Veggie Burger':
            return 'Veggie Patties: Store-bought veggie patties or homemade patties made from beans, lentils, vegetables, grains, or a combination.\n' +
			    'Burger Buns: Whole wheat, brioche, or gluten-free buns.';
        default:
            return 'Ingredients not available.';
    }
}
