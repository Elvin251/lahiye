
document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
    const previewImage = document.getElementById("preview-image");
    const imageUrlInput = document.getElementById("image-url");

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("İstifadəçi daxil olmayıb!");
        return;
    }

    let userProductsKey = `products_${user.username}`;
    let allProductsKey = "products";

    let userProducts = JSON.parse(localStorage.getItem(userProductsKey)) || [];
    let allProducts = JSON.parse(localStorage.getItem(allProductsKey)) || [];

    imageUrlInput.addEventListener("input", () => {
        const url = imageUrlInput.value;
        if (url) {
            previewImage.src = url;
            previewImage.style.display = "block";
        } else {
            previewImage.style.display = "none";
        }
    });
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newProduct = {
            id: allProducts.length + 1, 
            brand: document.getElementById("brand").value,
            model: document.getElementById("model").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            rating: document.getElementById("rating").value,
            image: document.getElementById("image-url").value,
            owner: user.username 
        };
        const newProduct1 = {
            id: userProducts.length + 1, 
            brand: document.getElementById("brand").value,
            model: document.getElementById("model").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            rating: document.getElementById("rating").value,
            image: document.getElementById("image-url").value,
            owner: user.username 
        };
        userProducts.push(newProduct1);
        localStorage.setItem(userProductsKey, JSON.stringify(userProducts));

        allProducts.push(newProduct);
        localStorage.setItem(allProductsKey, JSON.stringify(allProducts));

        alert("Məhsul uğurla əlavə olundu!");

        productForm.reset();
        previewImage.style.display = "none";
    });
});
