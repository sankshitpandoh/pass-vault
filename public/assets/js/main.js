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