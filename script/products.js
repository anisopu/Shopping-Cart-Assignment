async function fetchProducts() {
    try {
        const response = await fetch('./data/products.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


function displayProducts(products) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.price})">Add to Cart</button>
      `;
        grid.appendChild(productCard);
    });
}

fetchProducts();
