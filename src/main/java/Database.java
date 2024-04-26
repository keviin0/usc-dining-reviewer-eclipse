import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Vector;

public class Database {
	private static Connection conn = null;
	private static PreparedStatement statement = null;
	private static ResultSet rs = null;

	static {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String url = "jdbc:mysql://mysql-23a733f0-dininghall.h.aivencloud.com:26974/defaultdb?sslmode=require";
		String username = "avnadmin";
		String password = "AVNS_IBYe8D9uXr8RmyqfgIj";
		try {
			conn = DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	/**
	 * Resets the table, deleting all the data. THIS IS NOT REVERSABLE, ALL INPUTTED
	 * DATA WILL BE DELETED.
	 */
	public static void RESET() {
		try {
			PreparedStatement statement = conn.prepareStatement("SET FOREIGN_KEY_CHECKS = 0");
			statement.execute();
			statement = conn.prepareStatement("TRUNCATE TABLE reviews");
			statement.execute();
			statement = conn.prepareStatement("TRUNCATE TABLE dishes");
			statement.execute();
			statement = conn.prepareStatement("TRUNCATE TABLE users");
			statement.execute();
			statement = conn.prepareStatement("SET FOREIGN_KEY_CHECKS = 1");
			statement.execute();

		} catch (SQLException e) {
			// TODO Auto-generated catch block`
			e.printStackTrace();
		}

	}

	/**
	 * Adds a new user to the database
	 * 
	 * @param user the user to be added as a User object
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addUser(User user) {

		return addUser(user.username, user.hashedPassword, user.profilePicFileName);
	}

	/**
	 * Adds a new user to the database
	 * 
	 * @param username           the username of the user to be added, must not be
	 *                           an existing username. Maximum of 50 characters.
	 * @param hashedPassword     the hashed password of the user to be added.
	 *                           Maximum of 50 characters.
	 * @param profilePicFilename the filename of the user's profile picture. Maximum
	 *                           of 50 characters.
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addUser(String username, String hashedPassword, String profilePicFilename) {

		try {
			statement = conn
					.prepareStatement("INSERT INTO users(username, hashedPassword, profilePictureFileName) VALUES ('"
							+ username + "', '" + hashedPassword + "', '" + profilePicFilename + "')");
			statement.execute();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();

				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}

	}

	/**
	 * Adds a new review to the database. Also updates the reviewed dish's star
	 * count.
	 * 
	 * @param review the review to be added as a Review object
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addReview(Review review) {
		return addReview(review.authorUsername, review.dishName, review.reviewText, review.pictureFileName,
				review.starRating);
	}

	/**
	 * Adds a new review to the database. Also updates the reviewed dish's star
	 * count.
	 * 
	 * @param authorUsername  the username of the author of the review to be added.
	 *                        The username must be of a user already added to the
	 *                        database.
	 * @param dishName        the name of the dish of the review to be added. The
	 *                        dish name must be of a dish already added to the
	 *                        database.
	 * @param reviewText      the text of the review to be added. Maximum of 2000
	 *                        characters.
	 * @param pictureFilename the filename of the review's picture. Maximum of 50
	 *                        characters.
	 * @param starRating      the number of stars given by the review
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addReview(String authorUsername, String dishName, String reviewText, String pictureFilename,
			int starRating) {
		try {
			statement = conn.prepareStatement(
					"INSERT INTO reviews(authorUsername, dishName, reviewText, pictureFileName, starRating) VALUES ('"
							+ authorUsername + "', '" + dishName + "', '" + reviewText + "', '" + pictureFilename
							+ "', '" + starRating + "')");
			statement.execute();
			statement = conn.prepareStatement("SELECT * FROM dishes WHERE dishName = '" + dishName + "'");
			ResultSet rs = statement.executeQuery();
			rs.next();
			int totalReviews = Integer.valueOf(rs.getString("totalReviews"));
			double oldStarRating = Double.valueOf(rs.getString("averageStarRating"));
			double newStarRating = (oldStarRating * totalReviews + starRating) / (totalReviews + 1);
			statement = conn.prepareStatement("UPDATE dishes SET totalReviews = " + (totalReviews + 1)
					+ ", averageStarRating = " + newStarRating + " WHERE dishName = '" + dishName + "'");
			statement.execute();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();

				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
	}

	/**
	 * Adds a new dish to the database
	 * 
	 * @param dish the dish to be added as a Dish object
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addDish(Dish dish) {
		return addDish(dish.dishName, dish.allergens, dish.isVegan, dish.isVegetarian, dish.dininghall);
	}

	/**
	 * Adds a new dish to the database
	 * 
	 * @param dishName     the name of the dish to be added
	 * @param allergens    a string containing the names of each of the allergen of
	 *                     the dish, seperated by commas
	 * @param isVegan      whether or not the dish to be added is vegan
	 * @param isVegetarian whether or not the dish to be added is vegetarian
	 * @param diningHall   which dining hall the dish is located in. This string
	 *                     must be equal to "McCarthy", "Parkside", or "EVK".
	 * @return true if the addition was successful, false if not
	 */
	public static boolean addDish(String dishName, String allergens, boolean isVegan, boolean isVegetarian,
			String diningHall) {

		try {

			statement = conn.prepareStatement(
					"INSERT INTO dishes(dishName, allergens, isVegan, isVegetarian, diningHall) VALUES ('" + dishName
							+ "', '" + allergens + "', " + String.valueOf(isVegan).toUpperCase() + ", "
							+ String.valueOf(isVegetarian).toUpperCase() + ", '" + diningHall + "')");
			statement.execute();

			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (statement != null) {
					statement.close();

				}
			} catch (SQLException sqle) {
				System.out.println("sqle: " + sqle.getMessage());
			}
		}
	}

	public static User getUser(String username) {

		try {
			PreparedStatement statement = conn
					.prepareStatement("SELECT * FROM users WHERE username = '" + username + "'");
			ResultSet set = statement.executeQuery();
			set.next();
			User toReturn = new User();
			toReturn.username = set.getString("username");
			toReturn.hashedPassword = set.getString("hashedPassword");
			toReturn.totalReviewsGiven = Integer.valueOf(set.getString("totalReviewsGiven"));
			toReturn.profilePicFileName = set.getString("profilePictureFileName");
			toReturn.location = set.getString("location");
			return toReturn;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

	}

	/**
	 * Gets the Dish object from the name of the dish
	 * 
	 * @param dishname the dishname of the desired dish
	 * @return the dish if contained in the database, null if not
	 */
	public static Dish getDish(String dishname) {
		Dish toReturn = new Dish();
		try {
			PreparedStatement statement = conn
					.prepareStatement("SELECT * FROM dishes WHERE dishName = '" + dishname + "'");
			ResultSet set = statement.executeQuery();
			set.next();
			toReturn.dishName = set.getString("dishName");
			toReturn.allergens = set.getString("allergens");
			toReturn.isVegan = (Integer.valueOf(set.getString("isVegan")) == 1);

			toReturn.isVegetarian = (Integer.valueOf(set.getString("isVegetarian")) == 1);

			toReturn.dininghall = set.getString("diningHall");
			toReturn.averageStarRating = Double.valueOf(set.getString("averageStarRating"));
			toReturn.totalReviews = Integer.valueOf(set.getString("totalReviews"));
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return toReturn;
	}

	/**
	 * Gets all dishes assigned to the McCarthy dining hall
	 * 
	 * @return a vector containing a Dish for each dish in the McCarthy dining hall
	 *         sorted from oldest to newest by date of posting
	 */
	public static Vector<Dish> mcCarthyDishes() {
		Vector<Dish> toReturn = new Vector<Dish>();
		try {
			
			PreparedStatement statement = conn.prepareStatement("SELECT * FROM diningHall.dishes WHERE diningHall = 'McCarthy'");
			ResultSet set = statement.executeQuery();
			while (set.next()) {
				Dish toAdd = new Dish();
				toAdd.dishName = set.getString("dishName");
				toAdd.allergens = set.getString("allergens");

				toAdd.isVegan = (Integer.valueOf(set.getString("isVegan")) == 1);

				toAdd.isVegetarian = (Integer.valueOf(set.getString("isVegetarian")) == 1);

				toAdd.dininghall = set.getString("diningHall");
				toAdd.averageStarRating = Double.valueOf(set.getString("averageStarRating"));
				toAdd.totalReviews = Integer.valueOf(set.getString("totalReviews"));
				toReturn.add(toAdd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return toReturn;
	}

	

	/**
	 * Gets all dishes assigned to the Parkside dining hall
	 * 
	 * @return a vector containing a Dish for each dish in the Parkside dining hall
	 *         sorted from oldest to newest by date of posting
	 */
	public static Vector<Dish> parksideDishes() {
		Vector<Dish> toReturn = new Vector<Dish>();
		try {
			
			PreparedStatement statement = conn.prepareStatement("SELECT * FROM diningHall.dishes WHERE diningHall = 'Parkside'");
			ResultSet set = statement.executeQuery();
			while (set.next()) {
				Dish toAdd = new Dish();
				toAdd.dishName = set.getString("dishName");
				toAdd.allergens = set.getString("allergens");

				toAdd.isVegan = (Integer.valueOf(set.getString("isVegan")) == 1);

				toAdd.isVegetarian = (Integer.valueOf(set.getString("isVegetarian")) == 1);

				toAdd.dininghall = set.getString("diningHall");
				toAdd.averageStarRating = Double.valueOf(set.getString("averageStarRating"));
				toAdd.totalReviews = Integer.valueOf(set.getString("totalReviews"));
				toReturn.add(toAdd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return toReturn;
	}

	/**
	 * Gets all dishes assigned to the EVK dining hall
	 * 
	 * @return a vector containing a Dish for each dish in the EVK dining hall
	 *         sorted from oldest to newest by date of posting
	 */
	public static Vector<Dish> evkDishes() {
		Vector<Dish> toReturn = new Vector<Dish>();
		try {
			
			PreparedStatement statement = conn.prepareStatement("SELECT * FROM diningHall.dishes WHERE diningHall = 'EVK'");
			ResultSet set = statement.executeQuery();
			while (set.next()) {
				Dish toAdd = new Dish();
				toAdd.dishName = set.getString("dishName");
				toAdd.allergens = set.getString("allergens");

				toAdd.isVegan = (Integer.valueOf(set.getString("isVegan")) == 1);

				toAdd.isVegetarian = (Integer.valueOf(set.getString("isVegetarian")) == 1);

				toAdd.dininghall = set.getString("diningHall");
				toAdd.averageStarRating = Double.valueOf(set.getString("averageStarRating"));
				toAdd.totalReviews = Integer.valueOf(set.getString("totalReviews"));
				toReturn.add(toAdd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return toReturn;
	}

	/**
	 * Gets all the reviews written about a given dish
	 * 
	 * @param dishName the name of the desired dish
	 * @return a vector containing a Review object for each review of that dish
	 *         sorted from oldest to newest by date of posting, null if that dish
	 *         does not exist
	 */
	public static Vector<Review> allReviewsOfDish(String dishName) {
		Vector<Review> toReturn = new Vector<Review>();
		try {
			
			PreparedStatement statement = conn.prepareStatement("SELECT * FROM reviews WHERE dishName = '"+dishName+"'");
			ResultSet set = statement.executeQuery();
			while (set.next()) {
				Review toAdd = new Review();
				toAdd.authorUsername = set.getString("authorUsername");
				toAdd.dishName = set.getString("dishName");

				toAdd.reviewText = set.getString("reviewText");

				toAdd.starRating = Integer.valueOf(set.getString("starRating"));

				toAdd.pictureFileName = set.getString("pictureFileName");
				toAdd.timestamp = set.getString("timePosted");
				toReturn.add(toAdd);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return toReturn;
	}

	public static int totalNumUsers() {
		try {
			statement = conn.prepareStatement("SELECT COUNT(*) FROM users");
			ResultSet rs=statement.executeQuery();
			rs.next();
			
			return rs.getInt("COUNT(*)");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return -1;
		}
	}

	/**
	 * Updates (or sets if this is the first time this is called for this user) a
	 * user's location in the database
	 * 
	 * Note: after you update the location you MUST call getUser() again in order to
	 * have a user object with the updated location
	 * 
	 * @param username the username of the user to be updated
	 * @param location the new location of the user
	 * @return true if the user was found and location was updated, false if not
	 */
	public static boolean updateLocation(String username, String location) {
		try {
			statement = conn.prepareStatement("UPDATE users SET location = '"+location+"' WHERE username = '"+username+"'");
			statement.execute();
			return true;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		
	}

}
