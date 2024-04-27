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

@WebServlet("/ReviewServlet")

public class ReviewServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         DiningHall d = new Gson().fromJson(request.getReader(), DiningHall.class);
         String foodName = d.foodName;
         System.out.println(foodName);

         Gson gson = new Gson();
    	 Vector<Review> review = Database.allReviewsOfDish(foodName);
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


