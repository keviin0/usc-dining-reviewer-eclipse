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

@WebServlet("/AddFoodServlet")

public class AddFoodServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         DishForServlet d = new Gson().fromJson(request.getReader(), DishForServlet.class);
         String dishName = d.dishName;
         String allergens = d.allergens;
         String diningHall = d.dininghall;
         boolean isVegan = d.isVegan;
         boolean isVegetarian = d.isVegetarian;
         Gson gson = new Gson();
    	 boolean success = Database.addDish(dishName, allergens, isVegan, isVegetarian, diningHall);
         if(!success) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Failed to add dish to dininghall";
             pw.write(gson.toJson(error));
             pw.flush();
         } else {
             response.setStatus(HttpServletResponse.SC_OK);
             String message = "Successfully add dish to diningHall";
             pw.write(gson.toJson(message));
             pw.flush();
         }
    }
}
