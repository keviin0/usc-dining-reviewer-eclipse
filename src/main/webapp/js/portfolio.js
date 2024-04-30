document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviewsList');
    
    console.log(localStorage.getItem("username"));
    function fetchReviews() {
	    $.ajax({
	        url: 'PortfolioServlet',
	        type: 'POST',
	        contentType: 'application/json',
	        data: JSON.stringify({ username: localStorage.getItem("username") }),
	        success: function(data) {
	            if ($.isArray(data)) {
	                displayReviews(data);
	            } else {
	                $('#reviewsContainer').html('<li>' + data + '</li>');
	            }
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.error('Error fetching reviews:', textStatus, errorThrown);
	            $('#reviewsList').html('<li>User has not submitted any reviews.</li>');
	        }
	    });
	}
	
	fetchReviews();

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
