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

@WebServlet("/GeoServlet")

public class GeoServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	 PrintWriter pw = response.getWriter();
         response.setContentType("application/json");
         response.setCharacterEncoding("UTF-8");

         DHall d = new Gson().fromJson(request.getReader(), DHall.class);
         String dName = d.diningHall;
         Gson gson = new Gson();
    	 Database.updateDiningHallPop(dName);
    	 int numPeople = Database.getDiningHallPop(dName);
         if(numPeople == -1) {
             response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
             String error = "Error loading amount of people at dining Hall.";
             pw.write(gson.toJson(error));
             pw.flush();
         } else {
             response.setStatus(HttpServletResponse.SC_OK);
             pw.write(gson.toJson(numPeople));
             pw.flush();
         }
    }
}
