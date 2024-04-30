import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/changeEmailServlet")
public class changeEmailServlet extends HttpServlet{
	private Gson gson = new Gson();
	/**
	 * 
	 */
	private static final long serialVersionUID = 7633607127201355008L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   	 	PrintWriter pw = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String oldEmail = request.getParameter("oldEmail");
        String newEmail = request.getParameter("newEmail");
        
        System.out.println("oldEmail : " + oldEmail + " newEmail : " + newEmail);
        JsonObject jsonResponse = new JsonObject();
        try {
	        if(oldEmail != null && newEmail != null) {
	        	// emails are not empty
	        	int status = Database.updateEmail(newEmail, oldEmail);
	        	if(status == -1) {
	        		// an error occured or no email was updated
	        		jsonResponse.addProperty("status", "An error occured or no email was updated!");
	                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
	        	} else if(status == 0){
	        		// email is not unique
	        		jsonResponse.addProperty("status", "Email is already in use!");
	                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	        	} else {
	        		// successfully updated email
	        		jsonResponse.addProperty("status", "Success");
	                response.setStatus(HttpServletResponse.SC_OK);
	        	}
	        } else {
	        	// bad data sent
	        	jsonResponse.addProperty("status", "Failure");
	            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
	        }
	        
	        pw.print(gson.toJson(jsonResponse));
        } catch(Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error processing request");
        } finally {
            pw.flush();
        }
   }
}
