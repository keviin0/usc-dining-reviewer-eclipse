import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/IngredientsServlet")
public class IngredientsServlet extends HttpServlet {
    private static final long serialVersionUID = -753115554566999201L;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String dishname = request.getParameter("dishname");

        System.out.println("Request for dish details: " + dishname);
        Dish dish = Database.getDish(dishname);
        if (dish != null) {
            Gson gson = new Gson();
            String jsonOutput = gson.toJson(dish);

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonOutput);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().flush();
            System.out.println("Dish details provided successfully for: " + dishname);
        } else {
            System.out.println("Dish request failed for: " + dishname);
            String errorMessage = "{\"error\": \"Dish not found\"}";
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(errorMessage);
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().flush();
        }
    }
}