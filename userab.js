
let userData = JSON.parse(localStorage.getItem("user")) || {
    name: "No Name",
    surname: "No Surname",
    email: "No Email",
    username: "No Username"
};
document.getElementById("name").innerText = userData.name;
document.getElementById("surname").innerText = userData.surname;
document.getElementById("email").innerText = userData.email;
document.getElementById("username").innerText = userData.username;
