const loginSubmitButton = document.getElementById("loginSubmit");
const signupSubmitButton = document.getElementById("signupSubmit");

loginSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();
    login();
});

signupSubmitButton.addEventListener("click", function (event) {
    event.preventDefault();
    registerUser();
});

function validateEmailLogin() {
    const regPat = /^[a-zA-Z0-9]+@usc\.edu$/;
    if (regPat.test(document.getElementById("email-login").value.trim())) {
        document.getElementById("email-login-msg").innerHTML = "";
        return true;
    } else {
        document.getElementById("email-login-msg").innerHTML =
            "Please Enter a Valid USC Email";
        return false;
    }
}

function validatePassword() {
    if (
        document.getElementById("password-signup").value ===
        document.getElementById("password-signup-confirm").value
    ) {
        console.log("Passwords match");
        document.getElementById("password-signup-confirm-msg").innerHTML = "";
        return true;
    } else {
        console.log("Passwords do not match");
        document.getElementById("password-signup-confirm-msg").innerHTML =
            "Passwords do not match";
        return false;
    }
}

function registerUser() {
    console.log("enter register");
    let username = document.getElementById("email-signup").value.trim();
    let password = document.getElementById("password-signup-confirm").value;
    let profilePicFile = document.getElementById("profile-picture").files[0];
    let data = {
        username: username,
        hashedPassword: password
    };

    $.ajax({
        type: "POST",
        url: "UserServlet",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function (response) {
            if (response.status === "Success") {
                localStorage.setItem("username", data.username);
                document.getElementById("success-msg").innerHTML = "Success!";
                document.getElementById("success-msg").style.display = "block";

                return true;
            }
        },
        error: function (response) {
            console.log("In error");
            if (response.status === "Failure") {
                console.log("User not added : Error");
                document.getElementById("email-signup-msg").innerHTML =
                    "User already exists";
                return false;
            }
        }
    });

    // Store the URL of the image file in local storage - lots of googling
    if (profilePicFile) {
        const reader = new FileReader();
        reader.onload = function () {
            const binaryData = reader.result.split(",")[1];
            localStorage.setItem(
                "pfpFile",
                JSON.stringify({ name: profilePicFile.name })
            );
            localStorage.setItem(
                `pfpFileBlob-${profilePicFile.name}`,
                binaryData
            );
        };
        reader.readAsDataURL(profilePicFile);
    } else {
        console.log("No profile picture selected");
    }

    let formData = new FormData();

    formData.append("profilePic", profilePicFile);
    formData.append("username", username);

    fetch("AddUserImg", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                console.log("Profile picture uploaded successfully.");
                window.location.href = "index.html";
            } else {
                console.error("Failed to upload profile picture.");
            }
        })
        .catch((error) => {
            console.error("Error uploading profile picture:", error);
        });
}

function login() {
    let data = {
        username: document.getElementById("email-login").value.trim(),
        hashedPassword: document.getElementById("password-login").value.trim()
    };

    $.ajax({
        type: "GET",
        url: "UserServlet",
        data: data,
        success: function (response) {
            console.log(response);
            if (response.status === "Success") {
                //window.location.href = "index.html";
                localStorage.setItem("username", data.username);
                localStorage.setItem("online", true);
            }

            if (response.admin_status === "1") {
                //alert("user is an admin");
                localStorage.setItem("admin", true);
            }
        },
        error: function (response) {
            console.log("In error");
            if (response.status === "Failure") {
                document.getElementById("login-msg").innerHTML = "Error";
            }
        }
    });

    let formData = new FormData();

    let username = document.getElementById("email-signup").value.trim();
    formData.append("username", username);

    $.ajax({
        type: "GET",
        url: "ProfilePictureServlet",
        data: data,
        xhrFields: {
            responseType: 'blob' // Fetch as blob
        },
        success: function (response) {
             const reader = new FileReader();
            reader.onload = function () {
                const binaryData = reader.result.split(",")[1];
                localStorage.setItem(
                    "pfpFile",
                    JSON.stringify({ name: response.name })
                );
                localStorage.setItem(
                    `pfpFileBlob-${response.name}`,
                    binaryData
                );
            };
            reader.readAsDataURL(response);
        },
        error: function (response) {
            console.log("Error fetching profile picture:", response);
        }
    });
}
