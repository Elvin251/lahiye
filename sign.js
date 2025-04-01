let users = JSON.parse(localStorage.getItem("users")) || [];
let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let inputs = document.querySelectorAll("input");

    let name = inputs[1].value.trim();
    let surname = inputs[2].value.trim();
    let email = inputs[3].value.trim();
    let username = inputs[4].value.trim();
    let password = inputs[5].value.trim();

    if (!name || !surname || !email || !username || !password) {
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
