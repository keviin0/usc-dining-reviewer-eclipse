const loginSubmitButton = document.getElementById('loginSubmit');
const signupSubmitButton = document.getElementById('signupSubmit');

loginSubmitButton.addEventListener('click', function(event){
	event.preventDefault();
	
	console.log("Login Form Attempted Submission");
});

signupSubmitButton.addEventListener('click', function(event){	
	event.preventDefault();
	console.log("Sign Up Submit Button");
	registerUser();

});

//not fully implemented yet
function checkForEntry(){
	/*
	let email = document.getElementById('email-signup').value.trim();
	const regPat = /^[a-zA-Z0-9]+@usc\.edu$/;

	if(!regPat.test(email)){
		document.getElementById('email-signup-msg').innerHTML = 'Enter valid USC email';
		return false;
	}

	//check db
	$.ajax({
		type: 'GET',
		url: 'RegisterServlet',
		data : {
			email: email	
		},
		success: function(xhr) {
			if(xhr.status === 100){
				$('#email-signup-msg').text('Available!');
			}
		},
		error: function(xhr) {
			if(xhr.status === 400){
				$('#email-signup-msg').text('Email already exists');
			}
		}
		
	});
	*/
}

function validateEmailLogin(){
	const regPat = /^[a-zA-Z0-9]+@usc\.edu$/;
	if(regPat.test(document.getElementById('email-login').value.trim())){
		document.getElementById('email-login-msg').innerHTML = '';
		return true;
	}else{
		document.getElementById('email-login-msg').innerHTML = 'Please Enter a Valid USC Email';
		return false;
	}
}

function validatePassword(){
	if(document.getElementById('password-signup').value ===
		document.getElementById('password-signup-confirm').value){
		console.log('Passwords match');
		document.getElementById('password-signup-confirm-msg').innerHTML = '';
		return true;
	}else{
		console.log('Passwords do not match');
		document.getElementById('password-signup-confirm-msg').innerHTML = 'Passwords do not match';
		return false;
	}
}

function registerUser(){
	let username = document.getElementById('email-signup').value.trim();
	let password = document.getElementById('password-signup-confirm').value;
	let url = document.getElementById('profile-picture').value;
	var data = {
		username : username,
		hashedPassword : password, 
		profilePicFileName : url
	};

	$.ajax({
		type: 'POST',
		url: 'RegisterServlet',
		data: JSON.stringify(data),
		contentType: 'application/json',
		success: function(response) {
			if(response === "Success"){
				console.log("User added");
				$('#success-msg').html('Success! Proceed to Login');
				$('signupForm').reset();
			}
		},
		error: function(response) {
			if(response === "Failure"){
				console.log("User not added : Error");
			}
		}
	});	
	
}

function login(){

	//pull profile name from db, send user location to db, jump to next page 
	//call update location the database function
	// localStorage.setItem('email');
	// localStorage.setItem('profileName');
}