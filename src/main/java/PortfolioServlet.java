import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Vector;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonObject;

@WebServlet("/PortfolioServlet")
public class PortfolioServlet extends HttpServlet {
    
	private Gson gson = new Gson();
	
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         JsonObject requestData = gson.fromJson(request.getReader(), JsonObject.class);
         String username = requestData.get("username").getAsString();
         System.out.println(username);

         Gson gson = new Gson();
    	 Vector<Review> review = Database.allReviewsOfUsername(username);
         if(review.isEmpty()) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "No review for this dish yet";
             pw.write(gson.toJson(error));
             pw.flush();
         } else {
             response.setStatus(HttpServletResponse.SC_OK);
             pw.write(gson.toJson(review));
             pw.flush();
         }
    }
}


