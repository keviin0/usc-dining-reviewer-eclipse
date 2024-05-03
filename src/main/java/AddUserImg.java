import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/AddUserImg")
@MultipartConfig
public class AddUserImg extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    	response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        String username = request.getParameter("username"); // Assuming you also pass the username along with the image
        Part profilePicPart = request.getPart("profilePic"); // Get the Part containing the image data
        
        try (InputStream inputStream = profilePicPart.getInputStream()) {
            // Get database connection (replace getConnection() with your actual database connection method)
        	boolean status = Database.addUserImg(inputStream, username);
        	JsonObject jsonResponse = new JsonObject();
        	if (status) {
                jsonResponse.addProperty("status", "Success");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.addProperty("status", "Failure");
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            }
        	
        	out.print(gson.toJson(jsonResponse));
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        } finally {
            out.flush();
        }
    }
}