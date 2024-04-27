import java.util.Vector;

public class Dish {
	public String dishName;
	public String allergens;
	public boolean isVegan;
	public boolean isVegetarian;
	public String dininghall;
	public double averageStarRating;
	public int totalReviews;
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "Dish name: "+ dishName+ "     Allergens: "+allergens+"     Is Vegan: "+isVegan+"     Is Vegetarian: "+isVegetarian+"     Dining Hall: "+dininghall+
				"     Average star rating: "+averageStarRating+"     Total num of reviews: "+totalReviews;
	}
}
