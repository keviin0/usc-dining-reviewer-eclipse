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
            String profilePicFileName = requestData.get("profilePicFileName").getAsString();

            boolean success = Database.addUser(username, hashedPassword, profilePicFileName);
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
            JsonObject jsonResponse = new JsonObject();

            if (user != null && user.hashedPassword.equals(hashedPassword)) {
                jsonResponse.addProperty("status", "Success");
                response.setStatus(HttpServletResponse.SC_OK);
            } else {
                jsonResponse.addProperty("status", "Failure");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
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
