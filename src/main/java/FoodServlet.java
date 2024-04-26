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

@WebServlet("/FoodServlet")

public class FoodServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         DHall d = new Gson().fromJson(request.getReader(), DHall.class);
         String diningHall = d.diningHall;

         Gson gson = new Gson();
         Vector<Dish> dishes = new Vector<Dish>();
         if(diningHall.equals("McCarthy")) {
        	 dishes = Database.mcCarthyDishes();
         } else if(diningHall.equals("Parkside")) {
        	 dishes = Database.parksideDishes();
         }else {
        	 dishes = Database.evkDishes();
         }
         if(dishes.isEmpty()) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Unable to pull dish from this dininHall";
             pw.write(gson.toJson(error));
             pw.flush();
         } else {
             response.setStatus(HttpServletResponse.SC_OK);
             pw.write(gson.toJson(dishes));
             pw.flush();
         }
    }
}



