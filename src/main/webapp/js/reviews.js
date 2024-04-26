document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviewsList');
    const selectedDish = JSON.parse(localStorage.getItem('selectedDish'));
    
    
  
    function fetchReviews(dishName) {
	    $.ajax({
	        url: 'ReviewServlet',
	        type: 'POST',
	        contentType: 'application/json',
	        data: JSON.stringify({ foodName: dishName }),
	        success: function(data) {
	            if ($.isArray(data)) {
	                displayReviews(data);
	            } else {
	                $('#reviewsContainer').html('<li>' + data + '</li>'); // Display error or no reviews message
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.error('Error fetching reviews:', textStatus, errorThrown);
	            $('#reviewsContainer').html('<li>Error loading reviews.</li>');
	        }
	    });
	}
	
	fetchReviews(selectedDish.dishName);

	/*
	const simulatedResponse = {
	    reviews: [
	        {
	            authorUsername: "personA",
	            dishName: selectedDish.dishName,
	            reviewText: "test1",
	            pictureFileName: "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium",
	            starRating: 5,
	            timestamp: "2024-04-01 10:00"
	        },
	        {
	            authorUsername: "personB",
	            dishName: selectedDish.dishName,
	            reviewText: "test2",
	            pictureFileName: "https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium",
	            starRating: 3,
	            timestamp: "test2"
	        }
	    ]
	};
	
    displayReviews(simulatedResponse.reviews);
    */

    function displayReviews(reviews) {
        reviewsContainer.innerHTML = '';
        reviews.forEach(review => {
            const reviewElement = document.createElement('li');
            reviewElement.className = 'review-item';

            reviewElement.innerHTML = `
                <div class="review-author">
                    <strong>${review.authorUsername}</strong> at <span class="review-timestamp">${review.timestamp}</span>
                </div>
                <div class="review-rating">
                    Rating: ${'★'.repeat(review.starRating)}${'☆'.repeat(5 - review.starRating)}
                </div>
                <div class="review-text">${review.reviewText}</div>
                ${review.pictureFileName ? `<img src="${review.pictureFileName}" alt="Review image of ${review.dishName}" style="max-width:100%; height:auto;">` : ''}
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }
});
