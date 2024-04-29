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

         GeoInfo d = new Gson().fromJson(request.getReader(), GeoInfo.class);
         String dName = d.diningHall;
         String username = d.username;
         boolean around = d.Around;
         int guestUser = 0;
         if(canConvertToEightDigitNumber(username)) {
        	 guestUser = Integer.parseInt(username);
         }
         Gson gson = new Gson();
         if(guestUser == 0) {
        	 if(!around) {
        		 String diName = "None";
        		 Database.updateLocation(username, diName);
        	 }else {
        		 Database.updateLocation(username, dName);
        	 }
         }else {
        	 if(!around) {
        		 String diName = "None";
        		 Database.addGuestLocation(guestUser, diName);
        	 }else {
        		 Database.addGuestLocation(guestUser, dName);
        	 }
         }
         int numPeople = 0;
         numPeople = Database.getNumUserAtDiningHall(dName);
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
    
    public static boolean canConvertToEightDigitNumber(String str) {
        if (str == null || str.length() != 8 || !str.matches("\\d{8}")) {
            return false; 
        }
        try {
            int number = Integer.parseInt(str);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }
}
