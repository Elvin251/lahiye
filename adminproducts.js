document.addEventListener("DOMContentLoaded", function () {
    const productTable = document.getElementById("product-table"); // Məhsul siyahısını götür
    const productList = JSON.parse(localStorage.getItem("products")) ;

    function renderProducts() {
        productTable.innerHTML = ""; 

        productList.forEach((product) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" width="50"></td>
                <td>${product.price} $</td>
                <td>${product.rating}/5</td>
                <td>
                    <button class="edit-btn" data-id="${product.id}">Redaktə</button>
                    <button class="delete-btn" data-id="${product.id}">Sil</button>
                </td>
            `;

            productTable.appendChild(row);
        });

        // Sil düyməsinə klik üçün event əlavə et
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", function () {
                const productId = parseInt(this.dataset.id);
                deleteProduct(productId);
            });
        });
    }

    function deleteProduct(id) {
        const updatedList = productList.filter((product) => product.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedList));
        location.reload(); // Səhifəni yenilə
    }

    renderProducts();
});
