
public class User {
	public String username;
	public String hashedPassword;
	public int totalReviewsGiven;
	public String profilePicFileName;
	public String location;
	@Override
	public String toString() {
		return "Username: "+ username+ "     Hashed Password: "+hashedPassword+"     Total Reviews Given: "+totalReviewsGiven+"     Profile Picture File Name: "+profilePicFileName+"     Location: "+location;
	}
}
