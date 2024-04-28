function addDish(event){
    // Prevent the default form submission
    event.preventDefault();

    // Gather form data
    var formData = {
        dishName: document.getElementById("dishname-input").value,
        allergens: [],
        dininghall: document.getElementById('select').value,
        isVegan: document.querySelector('#allergen-div input[value="vegan"]').checked ? true : false,
        isVegetarian: document.querySelector('#allergen-div input[value="vegetarian"]').checked ? true : false
    };

    // Gather allergens, excluding vegan and vegetarian
    document.querySelectorAll('#allergen-div input:checked').forEach(function(checkbox) {
        if (checkbox.value !== "vegan" && checkbox.value !== "vegetarian") {
        formData.allergens.push(checkbox.value);
    }
    });

    // Convert allergens array to string
    formData.allergens = formData.allergens.join(', ');

    // Print out formData for testing
    console.log(formData);

    // Send data to AddFoodServlet using Fetch API
    fetch('AddFoodServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Servlet response was not ok');
        }
        return response.json();
    })
    .then(function(data) {
        // Handle success response
        alert(data);
    })
    .catch(function(error) {
        // Handle error response
        console.error('Error submitting dish:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('foodform').addEventListener('submit', addDish);
});
