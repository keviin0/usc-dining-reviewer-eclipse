import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
	private Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try (BufferedReader reader = request.getReader()) {
            JsonObject requestData = gson.fromJson(reader, JsonObject.class);

            String username = requestData.get("username").getAsString();
            String hashedPassword = requestData.get("hashedPassword").getAsString();

            boolean success = Database.addUser(username, hashedPassword);
            JsonObject jsonResponse = new JsonObject();

            if (success) {
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

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            String username = request.getParameter("username");
            String hashedPassword = request.getParameter("hashedPassword");

            // Simulate checking credentials (you would need a real check here)
            User user = Database.getUser(username);
            int isAdmin = Database.isAdmin(username);
            
            JsonObject jsonResponse = new JsonObject();

            if (user != null && user.hashedPassword.equals(hashedPassword)) {
                jsonResponse.addProperty("status", "Success");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.addProperty("status", "Failure");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
            
            // check whether the user is an admin
            if(isAdmin == 1) {
            	// the databse has returned a one indicating the user is an admin
            	System.out.println("User is an admin");
            	jsonResponse.addProperty("admin_status", "1");

            } else if(isAdmin == 0) {
            	// the database has indicated the user is not an admin
            	System.out.println("User is NOT an admin");
            	jsonResponse.addProperty("admin_status", "0");

            } else {
            	// an error occured
            	System.out.println("An error occured when trying to determine admin status of user");
            	jsonResponse.addProperty("admin_status", "Failed to determine admin Status");
            	response.setStatus(HttpServletResponse.SC_EXPECTATION_FAILED);
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
