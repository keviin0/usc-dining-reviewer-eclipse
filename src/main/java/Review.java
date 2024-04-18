

public class Review {
	public String authorUsername;
	public String dishName;
	public String reviewText;
	public String pictureFileName;
	public int starRating;
	public String timestamp;
	@Override
	public String toString() {
		return "Author Username: "+authorUsername+"     Dish Name: "
				+dishName+"     Review Text: "+reviewText+"     Picture File Name: "+pictureFileName+"     Star Rating: "+starRating+"    Timestamp: "+timestamp;
	}
	
}
