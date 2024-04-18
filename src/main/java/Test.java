import java.util.Vector;

public class Test {
	public static void main(String[] args) {
		Database.RESET();
		Database.addUser("username", "password", "filename");
		Database.addUser("username2", "password", "filename2");
		Database.updateLocation("username2", "location1");
		Database.addDish("food", "asfa",true,false,"McCarthy");
		Database.addDish("food2", "asdf",true,false,"McCarthy");
		Database.addReview("username", "food", "good food", "filename", 5);
		Database.addReview("username2", "food", "good food", "filename", 2);
		Database.addReview("username2", "food", "good food", "filename", 2);
		System.out.println(Database.getUser("username2"));
		System.out.println(Database.getDish("food")+"\n\n");
		Vector<Dish> mcCarthyDishes=Database.mcCarthyDishes();
		for(int i=0; i<mcCarthyDishes.size(); i++) {
			System.out.println(mcCarthyDishes.get(i));
		}
		System.out.println("\n");
		Vector<Review> foodReviews=Database.allReviewsOfDish("food");
		for(int i=0; i<foodReviews.size(); i++) {
			System.out.println(foodReviews.get(i));
		}
		System.out.println("Total users: "+Database.totalNumUsers());
	}
}
