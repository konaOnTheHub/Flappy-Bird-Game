//This file contains eveything related to reading/manipulating user info

//checks that email follows the x@x.x format
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
//check that phone number is is only digits and 11 characters long
function validatePhone(num) {
    if (num.length != 11) {
        return false

    } else if (num.match(/^[0-9]+$/) == null) {
        return false
    }
    return true


};
//Called upon rendering pages that are supposed to be login only
function checkIfLoggedIn() {
    let userLogged = sessionStorage.getItem("loggedUsr");
    //if user isnt logged in it forces them back to the login page
    if (userLogged == null) {
        window.location.href = "login.html"
    }


    return userLogged
}

//Password validation

let myInput = document.getElementById("password");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");

//User clicking the password form will show the 'message' div
myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
};
//Clicking elsewhere hides 'message'
myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
};

//As the user types we check against the validation criteria and update 'message' accordingly
myInput.onkeyup = function () {
    // Validate lowercase letters
    if (myInput.value.match(/[a-z]/g)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    if (myInput.value.match(/[A-Z]/g)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    if (myInput.value.match(/[0-9]/g)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}


function register() {


    let userExists = 0

    //If localstorage is empty then create an empty array
    if (localStorage.getItem("userdata") === null) {
        localStorage.setItem("userdata", JSON.stringify([]))
    }

    const userId = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phoneNum = document.getElementById("phoneNum").value;


    //checks whether either fields are empty if so returns an alert
    if (userId === "" || email === "" || password === "") {
        return alert("All fields must be filled out!")
    }

    //Returns an alert if email is invalid
    if ((validateEmail(email)) == false) {
        return alert("Please enter a valid email address!")

    };
    //Returns alert if phone number is invalid
    if (validatePhone(phoneNum) == false) {
        return alert("Phone number must be only digits and 11 characters long")

    }
    //Returns alert if password is invalid
    if (letter.classList.contains("invalid") || capital.classList.contains("invalid") || number.classList.contains("invalid") || number.classList.contains("invalid")) {
        return alert("Password is invalid");
    }
    //Reads already userdata from localstorage
    let parseData = JSON.parse(localStorage.getItem("userdata"));

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
        let dataToWrite = {
            userId: userId,
            email: email,
            phoneNum: phoneNum,
            password: password,
            highscore: 0,
        };
        //Add newly created object to the already existing array of user objects
        parseData.push(dataToWrite);
        //Write out to local storage
        localStorage.setItem("userdata", JSON.stringify(parseData));
        //Change page view to login page
        window.location.href = "login.html"
        alert("Registration Successful");


    };

}




function login() {
    //If localstorage is empty then create an empty array
    if (localStorage.getItem("userdata") === null) {
        localStorage.setItem("userdata", JSON.stringify([]))
    }
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    //Checks if either forms are empty
    if (email === "" || password === "") {
        return alert("All fields must be filled out!")
    };

    let parseData = JSON.parse(localStorage.getItem("userdata"));
    //Checks if user exists
    for (let i = 0; i < parseData.length; i++) {
        if (parseData[i].email == email && parseData[i].password == password) {
            //Sets session storage to contain the username //This is later used to in the checkIfLoggedIn function
            sessionStorage.setItem("loggedUsr", parseData[i].userId)
            //Makes them go the game page after login
            window.location.href = "welcome.html";
            return alert("Login succesful")


        }
    };
    return alert("Wrong email or password")
}

//Logout
function logout() {
    //Removes user from session storage
    sessionStorage.removeItem("loggedUsr");
    //Navigates the window back to the login page
    window.location.href = "login.html"
}


//fetches the highscore of the user that's currently logged in
function getUserScore() {
    let user = sessionStorage.getItem("loggedUsr");
    let parseData = JSON.parse(localStorage.getItem("userdata"));
    for (let i = 0; i < parseData.length; i++) {
        ;
        if (parseData[i].userId == user) {
            return parseData[i].highscore;
        }


    }

}
//Updates the current user's highscore if 'score' is greater than their highscore
function updateUsrScore(score) {
    let user = sessionStorage.getItem("loggedUsr");
    let parseData = JSON.parse(localStorage.getItem("userdata"));
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

