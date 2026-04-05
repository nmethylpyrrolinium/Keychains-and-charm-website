// --------------- PRODUCT DATA ---------------
const products = [
  { id: 1, name: "Rainbow Charm", price: 5.99, image: "assets/images/sample-charm1.png" },
  { id: 2, name: "Heart Keychain", price: 4.99, image: "assets/images/sample-charm2.png" },
  { id: 3, name: "Star Charm", price: 6.49, image: "assets/images/sample-charm3.png" },
];

// --------------- CART LOGIC ---------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const countSpans = document.querySelectorAll("#cart-count");
  countSpans.forEach(span => span.textContent = cart.length);
}

function renderProductsGrid() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
    total += item.price;
  });

  totalEl.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// --------------- INIT ---------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProductsGrid();
  renderCart();
});
