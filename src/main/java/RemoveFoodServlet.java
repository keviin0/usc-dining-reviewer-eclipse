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

@WebServlet("/RemoveFoodServlet")

public class RemoveFoodServlet extends HttpServlet {
    
    private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         RemoveFoodInfo d = new Gson().fromJson(request.getReader(), RemoveFoodInfo.class);
         String dishName = d.dishName;
         String reason = d.removeReason;
         
         Gson gson = new Gson();
    	 boolean successR = Database.removeDishFromDishes(dishName);
    	 boolean successA = Database.addToDeletedDishes(dishName, reason);
         if(!successR) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Failed to remove dish from dishes";
             pw.write(gson.toJson(error));
             pw.flush();
         } else if(!successA) {
        	 response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Failed to add dish to deletedDishes";
             pw.write(gson.toJson(error));
             pw.flush();
         }else {
             response.setStatus(HttpServletResponse.SC_OK);
             String message = "Successfully remove the dish from the database";
             pw.write(gson.toJson(message));
             pw.flush();
         }
    }
}

