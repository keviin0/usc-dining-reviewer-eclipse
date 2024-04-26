

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		System.out.println("get");
//		if(Database.getUser(request.getParameter("email")) == null) {
//			System.out.println("Email not present");
//		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Gson gson = new Gson();
		PrintWriter pw = response.getWriter();
		
		User u = gson.fromJson(request.getReader(), User.class);

		//path is "fake path" 
		if(Database.addUser(u)) {
			response.setStatus(HttpServletResponse.SC_OK);
			pw.println(gson.toJson("Success! Proceed to Login"));
			pw.flush();
			pw.close();
			return;
		}
		
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		pw.println(gson.toJson("Failure"));
		pw.flush();
		pw.close();
	}

}
