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

@WebServlet("/AddReviewServlet")

public class AddReviewServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         Review r = new Gson().fromJson(request.getReader(), Review.class);

         Gson gson = new Gson();
    	 boolean success = Database.addReview(r);
         if(!success) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Error adding review.";
             pw.write(gson.toJson(error));
             pw.flush();
         } else {
             response.setStatus(HttpServletResponse.SC_OK);
             String message = "Review successfully added.";
             pw.write(gson.toJson(message));
             pw.flush();
         }
    }
}
