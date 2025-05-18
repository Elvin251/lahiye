let users = JSON.parse(localStorage.getItem("users")) || [];
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

    let name = inputs[1].value.trim();
    let surname = inputs[2].value.trim();
    let email = inputs[3].value.trim();
    let username = inputs[4].value.trim();
    let password = inputs[5].value.trim();

    let allValid = true;
    inputs.forEach((input, index) => {
        if (index === 0) return;
        validateInput(input);
        if (!input.checkValidity() || input.value.trim() === "") {
            allValid = false;
        }
    });

    if (!allValid) {
        alert("Bütün sahələri doldurun!");
        return;
    }

    let userExists = users.some(user => user.email === email || user.username === username);
    if (userExists) {
        alert("Bu e-poçt və ya istifadəçi adı artıq mövcuddur!");
        return;
    }

    let obj = { name, surname, email, username, password };
    users.push(obj);
    localStorage.setItem("users", JSON.stringify(users));

    let userProductsKey = `products_${username}`;
    localStorage.setItem(userProductsKey, JSON.stringify([]));
    inputs.forEach(input => input.value = "");

    alert("Uğurla qeydiyyatdan keçdiniz!");
});

