
let user = JSON.parse(localStorage.getItem("user"));

if (user && user.username) {
    document.getElementById("user").innerHTML = user.username;
    document.querySelector("#log-in").style.display = "none";  
    document.querySelector("#logout").style.display = "inline";  
} else {
    document.getElementById("user").innerHTML = "username";
    document.querySelector("#log-in").style.display = "inline";  
   
    document.querySelector("#logout").style.display = "none";  
}
function out() {
    localStorage.removeItem("user"); 
    document.getElementById("user").innerHTML = "username"; 
    document.querySelector("#log-in").style.display = "inline";  
    document.querySelector("#logout").style.display = "none";  
}
