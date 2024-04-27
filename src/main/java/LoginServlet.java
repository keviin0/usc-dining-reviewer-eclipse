

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson gson = new Gson();
		PrintWriter pw = response.getWriter();
		
		String username = request.getParameter("username");
		
		if(Database.getUser(username) != null) {
			System.out.println("Failure");
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			pw.write(gson.toJson("Failure"));
			pw.flush();
		}else {
			System.out.println("Success");
			response.setStatus(HttpServletResponse.SC_OK);
			pw.write(gson.toJson("Success"));
			pw.flush();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}

}
