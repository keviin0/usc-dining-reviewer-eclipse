import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@WebServlet("/ProfilePictureServlet")
public class ProfilePictureServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = -753115554566999201L;

	@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        OutputStream out = response.getOutputStream();
        // Retrieve the user object and get the profile picture byte array
        System.out.println("image request for user: " + username);
        User user = Database.getUser(username);
        if(user != null  && user.pfp != null) {
        	System.out.println("image request for user: BEGIN ");
        	byte[] pfpBytes = user.pfp;

            // Set the response headers for image data
            response.setContentType("image/jpeg");
            response.setContentLength(pfpBytes.length);
            response.setStatus(HttpServletResponse.SC_OK);
            // Write the image data to the response
            out.write(pfpBytes);
            out.flush();
            System.out.println("image request for user: END ");
        } else {
        	System.out.println("image request for user: FAILED ");
        	 // User not found, send the error
            String errorMessage = "image not found";
            byte[] errorBytes = errorMessage.getBytes();

            response.setContentType("text/plain");
            response.setContentLength(errorBytes.length);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);

            out.write(errorBytes);
            out.flush();
        }
        
    }
}