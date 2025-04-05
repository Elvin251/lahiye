document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please log in first!");
        window.location.href = "index.html";
        return;
    }

    let cartKey = `cart_${user.username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total-price");
    const placeOrderButton = document.getElementById("place-order");
    const checkoutForm = document.getElementById("checkout-form");

    if (cart.length === 0) {
        alert("Your cart is empty. Please add products before checkout.");
        window.location.href = "shop.html";
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    subtotalElement.textContent = `${total.toFixed(2)}$`;
    totalElement.textContent = `${total.toFixed(2)}$`;

    placeOrderButton.addEventListener("click", function (event) {
        event.preventDefault();

        let inputs = document.querySelectorAll("input[required]"); 
        let allValid = true;
        if (!checkoutForm.checkValidity()) {

            checkoutForm.reportValidity();
            return;
        }
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                allValid = false;
                input.style.border = "2px solid red"; 
            } else {
                input.style.border = ""; 
            }
        });

        if (!allValid) {
            alert("Please fill in all required fields.");
            return;
        }

        alert("Your order has been placed successfully!");
        localStorage.removeItem(cartKey);
        window.location.href = "shop.html";
    });
});
