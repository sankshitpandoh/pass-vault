/* loads log in screen first */
loadLogIn();

/* Remove UserName from localStorage if there is one saved */
localStorage.removeItem("UserName");
/* Remove UniqueId from localStorage if there is one saved */
localStorage.removeItem("uId");

/* Function that calls login page layout  */
function loadLogIn(){
    let request = new XMLHttpRequest;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("main-container").innerHTML = this.responseText;
        }
    }
    request.open("GET", "./pages/login.html", true);
    request.send();
}

/* Function that calls signUp page layout  */
function loadSignUp(){
    let request = new XMLHttpRequest;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("main-container").innerHTML = this.responseText;
        }
    }
    request.open("GET", "./pages/signUp.html", true);
    request.send();
}

/* to check if fields are empty or not */
const isEmpty = str => !str.trim().length;

/* Function triggered when user wants to log in */
function logIn(){
    let uName = document.getElementById("user-name").value;
    let password = document.getElementById("password").value;
    if(isEmpty(uName)){
        alert('User name field cannot be empty');
        document.getElementById("user-name").value = "none";
    }
    else if(isEmpty(password)){
        alert('Password field cannot be empty');
        document.getElementById("password").value = "";
    }
    else{
        /* object containing data that would be sent to server */
        let logDetails = {
            user : uName,
            pass : password
        }
        /* Post request to server to check if the user exists or not */
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/logInAttempt" , true);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
        xhttp.send((JSON.stringify(logDetails)));
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                /* parsing the response from server into a js Object */
                let serverResponse = JSON.parse(this.response) 
                if(serverResponse.status === false){
                    /* If user doesn't exits */
                    alert("User doesn't exist, please try again or if a new user, sign Up for an account");
                    document.getElementById("user-name").value = "";
                    document.getElementById("password").value = "";
                }
                if(serverResponse.status === true){
                    /* If user exits and is verified load homePage */
                    localStorage.setItem("UserName", uName);
                    localStorage.setItem("uId", serverResponse.id);
                    loadHomePage();
                }
            }
        }
    }
}

/* function triggered when user tries to sign up */
function signUp(){
    let uName = document.getElementById("user-name").value;
    let password = document.getElementById("password").value;
    let passwordCheck = document.getElementById("password-check").value;

    /* Some validation */
    if(isEmpty(uName)){
        alert("UserName field can't be empty");
    }
    else if(isEmpty(password)){
        alert("passwrd field cannot be empty");
    }
    else if(password.length < 6){
        alert("password length must be greater than 5 ");
    }
    else if(isEmpty(passwordCheck)){
        alert("Confirm your password please");
    }
    else if(password != passwordCheck){
        alert("Password's don't match");
        document.getElementById("password-check").value = "";
    }
    else{
        let uDetails = {
            user : uName,
            pass : password
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/signMeUp" , true);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
        xhttp.send((JSON.stringify(uDetails)));
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.response == "alreadyUser"){
                    alert("An account with same userName already exits, pick a different userName");
                    document.getElementById("user-name").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("password-check").value = "";
                }
                if(this.response == "success"){
                    alert("Account successfullt created, login to proceed");
                    loadLogIn();
                }
            }
        }
    }
}

/* function that loads the home page */
function loadHomePage(){
    let request = new XMLHttpRequest;
    request.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("main-container").innerHTML = this.responseText;
            console.log(localStorage.getItem("UserName"));
        }
    }
    request.open("GET", "./pages/homePage.html", true);
    request.send();
}

/* function that sends data back to server to encrypt */
function savePassword(){
    let cName = document.getElementById("site-name-field").value;
    let pass = document.getElementById("site-pass").value;

    /* some validation */
    if(isEmpty(cName)){
        alert("please fill web client field. Can't store empty passwords");
    }
    else if(isEmpty(pass)){
        alert("No password entered, can't encrypt empty field");
    }
    else{
        let dataObj = {
            client : cName,
            password : pass,
            userId : localStorage.getItem("uId")
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/storePassword" , true);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
        xhttp.send((JSON.stringify(dataObj)));
        xhttp.onreadystatechange = function(){
            if(this.response == "success"){
                console.log("sucessfully stored")
            }
        }
    }
}