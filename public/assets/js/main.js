loadLogIn();

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
        console.log(logDetails)
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/logInAttempt" , true);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");
        xhttp.send((JSON.stringify(logDetails)));
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                if(this.response == "false"){
                    alert("User doesn't exist, please try again or if a new user, sign Up for an account");
                    document.getElementById("user-name").value = "";
                    document.getElementById("password").value = "";
                }
                if(this.response == "true"){
                    console.log("we going in homie");
                }
            }
        }
    }
}