let cart = [];

// Add product to cart
function addToCart(id, name, image, price) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, image, price, quantity: 1 });
    }

    updateCartView();
    updateCartCount();

}

// Update cart view
function updateCartView() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div class="cart-controls">
        <button onclick="updateQuantity(${item.id}, 'decrease')">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 'increase')">+</button>
        <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
      </div>
    `;

        cartItemsContainer.appendChild(cartItem);
    });

    cartTotal.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartView();
    updateCartCount();
}

// Update cart item quantity
function updateQuantity(id, action) {
    const item = cart.find(item => item.id === id);

    if (item) {
        if (action === "increase") item.quantity++;
        if (action === "decrease" && item.quantity > 1) item.quantity--;

        updateCartView();
        updateCartCount();
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Clear the cart
function clearCart() {
    cart = [];
    updateCartView();
    updateCartCount();
}

// Attach event listeners for cart actions
document.getElementById("clear-cart").addEventListener("click", clearCart);
