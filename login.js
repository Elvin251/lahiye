let form = document.querySelector("form");
let inputs = document.querySelectorAll("input");

function validateInput(input) {
    if (input.checkValidity() && input.value.trim() !== "") {
        input.style.border = "2px solid green";
    } else {
        input.style.border = "2px solid red";
    }
}
inputs.forEach((input, index) => {
    if (index === 0) return;
    input.addEventListener("input", () => {
        validateInput(input);
    });
    validateInput(input);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let allValid = true;
    inputs.forEach((input, index) => {
        if (index === 0) return;
        validateInput(input);
        if (!input.checkValidity() || input.value.trim() === "") {
            allValid = false;
        }
    });

    if (!allValid) {
        alert("Zəhmət olmasa bütün xanaları düzgün doldurun!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let findusers = users.find(user =>
        user.username === inputs[1].value.trim() &&
        user.password === inputs[2].value.trim()
    );

    if (findusers) {
        localStorage.setItem("user", JSON.stringify(findusers));
        alert("Giriş uğurludur 😊");
        window.location.href = "index.html";
    } else {
        alert("İstifadəçi tapılmadı 😞");
        inputs[1].style.border = "2px solid red";
        inputs[2].style.border = "2px solid red";
    }

    inputs[1].value = "";
    inputs[2].value = "";
    inputs.forEach((input, index) => {
        if (index === 0) return;
        validateInput(input);
    });
});
