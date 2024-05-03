import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/AddFoodImgServlet")
public class AddFoodImgServlet extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = -836392079301222388L;
	private Gson gson = new Gson();

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		String dishName = request.getParameter("dishName");
        Part img = request.getPart("img"); // Get the Part containing the image data
        
        try (InputStream inputStream = img.getInputStream()) {
            // Get database connection (replace getConnection() with your actual database connection method)
        	boolean status = Database.addFoodImg(inputStream, dishName);
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
