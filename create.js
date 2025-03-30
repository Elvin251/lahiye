
const productForm = document.getElementById("product-form");
const previewImage = document.getElementById("preview-image");
const imageUrlInput = document.getElementById("image-url");
const productList = JSON.parse(localStorage.getItem("products")) ;
imageUrlInput.addEventListener("input", () => {
    const url = imageUrlInput.value;
    if (url) {
        previewImage.src = url;
        previewImage.style.display = "block";
    } else {
        previewImage.style.display = "none";
    }
});

productForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
    id : products.length+1,
        brand: document.getElementById("brand").value,
        model: document.getElementById("model").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        rating: document.getElementById("rating").value,
        image: document.getElementById("image-url").value
    };


    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Məhsul uğurla əlavə olundu!");

    productForm.reset();
    previewImage.style.display = "none";
});
