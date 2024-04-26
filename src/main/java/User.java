
public class User {
	public String username;
	public String hashedPassword;
	public int totalReviewsGiven;
	public String profilePicFileName;
	public String location;

	public User(String username, String profilePicFileName, String hashedPassword) {
		setUsername(username);
		setProfilePicFileName(profilePicFileName);
		setHashedPassword(hashedPassword);
	}
	
	public User() {
		
	}
	
	@Override
	public String toString() {
		return "Username: "+ username+ "     Hashed Password: "+hashedPassword+"     Total Reviews Given: "+totalReviewsGiven+"     Profile Picture File Name: "+profilePicFileName+"     Location: "+location;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public void setProfilePicFileName(String profilePicFileName) {
		this.profilePicFileName = profilePicFileName;
	}
	
	public void setHashedPassword(String hashedPassword) {
		this.hashedPassword = hashedPassword;
	}
}
