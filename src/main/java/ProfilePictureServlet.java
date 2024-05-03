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
        User user = Database.getUser(username);
        if(user != null ) {
        	byte[] pfpBytes = user.pfp;

            // Set the response headers for image data
            response.setContentType("image/jpeg"); // Adjust the MIME type if needed
            response.setContentLength(pfpBytes.length);

            // Write the image data to the response
            out.write(pfpBytes);
            out.flush();
        } else {
        	 // User not found, send the error
            String errorMessage = "User not found";
            byte[] errorBytes = errorMessage.getBytes();

            response.setContentType("text/plain");
            response.setContentLength(errorBytes.length);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);

            out.write(errorBytes);
            out.flush();
        }
        
    }
}