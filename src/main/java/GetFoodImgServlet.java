import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/GetFoodImgServlet")
public class GetFoodImgServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = -753115554566999201L;

	@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String dishname = request.getParameter("dishname");
        OutputStream out = response.getOutputStream();
        
        if(dishname == null) {
        	String errorMessage = "dishname not found";
            byte[] errorBytes = errorMessage.getBytes();

            response.setContentType("text/plain");
            response.setContentLength(errorBytes.length);
        	response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        	out.write(errorBytes);
            out.flush();
            return;
        }
        
        // Retrieve the user object and get the profile picture byte array
        System.out.println("image request for: " + dishname);
        byte[] dishBytes = Database.getDishImg(dishname);
        if(dishBytes != null) {
        	System.out.println("image request for DISH: BEGIN ");

            // Set the response headers for image data
            response.setContentType("image/jpeg");
            response.setContentLength(dishBytes.length);
            response.setStatus(HttpServletResponse.SC_OK);
            // Write the image data to the response
            out.write(dishBytes);
            out.flush();
            System.out.println("image request for DISH: END ");
        } else {
        	System.out.println("image request for DISH: FAILED ");
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
