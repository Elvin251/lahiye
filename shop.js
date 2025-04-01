document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products-container");
    const cartCount = document.getElementById("cart-count");
    const categoryList = document.getElementById("category-list");
    const searchInput = document.getElementById("search-box");
    const cartBtn = document.getElementById("cart-btn");

    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    let cartKey = `cart_${user.username}`;
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    function updateCartCount() {
        cartCount.innerText = cart.length;
    }

    function getCategories() {
        let categories = new Set(["All"]);
        products.forEach(product => categories.add(product.category));
        return [...categories];
    }

    function updateCategoryList() {
        categoryList.innerHTML = "";
        getCategories().forEach(category => {
            let li = document.createElement("li");
            li.innerText = category;
            li.dataset.category = category;
            li.addEventListener("click", function () {
                renderProducts(category);
            });
            categoryList.appendChild(li);
        });
    }

    function renderProducts(filterCategory = "All", filterRating = 0, searchQuery = "") {
        productsContainer.innerHTML = "";

        let filteredProducts = products.filter(product => {
            return (filterCategory === "All" || product.category === filterCategory) &&
                   (filterRating === 0 || product.rating >= filterRating) &&
                   (searchQuery === "" || product.model.toLowerCase().includes(searchQuery.toLowerCase()));
        });

        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = "<p>No products found.</p>";
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
            <img class="img" id="${product.id}" src="${product.image}" alt="${product.model}">
            <h3>${product.brand} ${product.model}</h3>
            <p>${product.price} $</p>
            <p>⭐ ${product.rating}/5</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productCard.style.height="400px"
        

            productCard.querySelector(".add-to-cart").addEventListener("click", function () {
                addToCart(product);
            });

            productsContainer.appendChild(productCard);
        });
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartCount();
    }

    document.querySelectorAll("#rating-filter button").forEach(ratingBtn => {
        ratingBtn.addEventListener("click", function () {
            let rating = parseInt(this.dataset.rating);
            renderProducts("All", rating);
        });
    });

    searchInput.addEventListener("input", function () {
        renderProducts("All", 0, this.value);
    });

    cartBtn.addEventListener("click", function () {
        window.location.href = "cart.html";   
    });

    categoryList.addEventListener("click", function (event) {
        if (event.target.dataset.category) {
            renderProducts(event.target.dataset.category);
        }
    });
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("img")) {
            let id = event.target.id;
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let mehsul = products.find(product => product.id == id);
        
            if (mehsul) {
                let product = {
                    brand: mehsul.brand,
                    model: mehsul.model,
                    category: mehsul.category,
                    description: mehsul.description,
                    price: mehsul.price,
                    rating: mehsul.rating,
                    image: mehsul.image
                };
        
                localStorage.setItem("product-about", JSON.stringify(product));
                window.location.href = "product.html"; 
            }
        }
    });
    
    
 updateCartCount();
    updateCategoryList();
    renderProducts();
});

