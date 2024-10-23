
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};


function checkIfLoggedIn() {
    const userLogged = sessionStorage.getItem("loggedUsr");
    //if user isnt logged in it forces them back to the login page
    if (userLogged == null) {
        window.location.href = "login.html"
    }

    return userLogged
}



function register() {


    let userExists = 0

    //If localstorage is empty then create an empty array
    if (localStorage.getItem("userdata") === null) {
        localStorage.setItem("userdata", JSON.stringify([]))
    }

    var userId = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    //checks whether either fields are empty if so returns an alert
    if (userId === "" || email === "" || password === "") {
        return alert("All fields must be filled out!")
    }

    //Returns an alert if email is invalid
    if ((validateEmail(email)) == false) {
        return alert("Please enter a valid email address!")

    };
    //Reads already userdata from localstorage
    var parseData = JSON.parse(localStorage.getItem("userdata"));

    //Checks if username or email exists if so returns an alert and prevents the rest of the function from executing
    for (let i = 0; i < parseData.length; i++) {
        if (parseData[i].userId == userId) {
            alert("Username taken");
            userExists = 1
            break;
        } else if (parseData[i].email == email) {
            alert("Email already in use");
            userExists = 1
            break;
        }

    };
    //If the user doesn't exist already adds the user's credintails to localStorage
    if (userExists == 0) {
        var dataToWrite = {
            userId: userId,
            email: email,
            password: password,
            highscore: 0,
        };

        parseData.push(dataToWrite);
        localStorage.setItem("userdata", JSON.stringify(parseData));
        alert("Registration Successful");

    };

}




function login() {
    //If localstorage is empty then create an empty array
    if (localStorage.getItem("userdata") === null) {
        localStorage.setItem("userdata", JSON.stringify([]))
    }
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    //Checks if either forms are empty
    if (email === "" || password === "") {
        return alert("All fields must be filled out!")
    };

    var parseData = JSON.parse(localStorage.getItem("userdata"));
    //Checks if user exists
    for (let i = 0; i < parseData.length; i++) {
        if (parseData[i].email == email && parseData[i].password == password) {
            //Sets session storage to contain the username //This is later used to in the checkIfLoggedIn function
            sessionStorage.setItem("loggedUsr", parseData[i].userId)
            //Makes them go the game page after login
            window.location.href = "welcome.html";
            return alert("Login succesful")


        } else {
            return alert("Wrong email or password")
        }
    };
}

function getUserScore() {
    var user = sessionStorage.getItem("loggedUsr");
    var parseData = JSON.parse(localStorage.getItem("userdata"));
    for (let i = 0; i < parseData.length; i++) {
        ;
        if (parseData[i].userId == user) {
            return parseData[i].highscore;
        }


    }

}
function updateUsrScore(score) {
    var user = sessionStorage.getItem("loggedUsr");
    var parseData = JSON.parse(localStorage.getItem("userdata"));
    for (let i = 0; i < parseData.length; i++) {
        ;
        if (parseData[i].userId == user) {
            if (parseData[i].highscore < score) {
                parseData[i].highscore = score;
                localStorage.setItem("userdata", JSON.stringify(parseData));
                hiScore.innerText = "Highscore: " + score;


            } else {
                break
            }
        }
    }


}


//Logout
function logout() {
    //Removes user from session storage
    sessionStorage.removeItem("loggedUsr");
    //Navigates the window back to the login page
    window.location.href = "login.html"
}
