// ========================================
// CATENE.PK - E-COMMERCE FUNCTIONALITY
// Enhanced UI/UX with Navigation Fix
// ========================================

// ========== PRODUCT DATABASE ==========
const products = [
    {
        id: 1,
        name: "Pearl Crescent",
        category: "charms",
        price: 1500,
        rating: 5,
        reviews: 48,
        description: "Elegant pearl-adorned crescent charm with golden accents",
        badge: "New"
    },
    {
        id: 2,
        name: "Golden Geometric",
        category: "keychains",
        price: 1200,
        rating: 4.5,
        reviews: 32,
        description: "Modern geometric design with luxury gold finish",
        badge: ""
    },
    {
        id: 3,
        name: "Turquoise Tassel",
        category: "charms",
        price: 1800,
        rating: 5,
        reviews: 56,
        description: "Vibrant turquoise with ornate tassel detailing",
        badge: "Best Seller"
    },
    {
        id: 4,
        name: "Persian Floral",
        category: "keychains",
        price: 1400,
        rating: 4,
        reviews: 24,
        description: "Intricate Persian floral pattern in premium material",
        badge: ""
    },
    {
        id: 5,
        name: "Diamond Star",
        category: "charms",
        price: 2000,
        rating: 5,
        reviews: 72,
        description: "Sparkling star charm with cubic zirconia stones",
        badge: "Limited"
    },
    {
        id: 6,
        name: "Bronze Spiral",
        category: "keychains",
        price: 1300,
        rating: 4.5,
        reviews: 40,
        description: "Antique bronze spiral design with protective coating",
        badge: ""
    },
    {
        id: 7,
        name: "Emerald Lotus",
        category: "charms",
        price: 1900,
        rating: 5,
        reviews: 61,
        description: "Stunning emerald-colored lotus with pearl center",
        badge: "New"
    },
    {
        id: 8,
        name: "Silver Arabesque",
        category: "keychains",
        price: 1600,
        rating: 4.5,
        reviews: 35,
        description: "Delicate silver arabesque pattern, lightweight",
        badge: ""
    },
    {
        id: 9,
        name: "Ruby Heart Charm",
        category: "bracelets",
        price: 2200,
        rating: 5,
        reviews: 88,
        description: "Deep red ruby heart charm perfect for charm bracelets",
        badge: "Best Seller"
    },
    {
        id: 10,
        name: "Sapphire Moon",
        category: "keychains",
        price: 1700,
        rating: 4,
        reviews: 28,
        description: "Celestial moon design with sapphire-blue crystal",
        badge: ""
    },
    {
        id: 11,
        name: "Golden Filigree",
        category: "charms",
        price: 1950,
        rating: 5,
        reviews: 52,
        description: "Intricate filigree goldwork with traditional craftsmanship",
        badge: ""
    },
    {
        id: 12,
        name: "Turquoise Hamsa",
        category: "keychains",
        price: 1450,
        rating: 4.5,
        reviews: 42,
        description: "Protective hamsa hand with turquoise center stone",
        badge: "New"
    }
];

// ========== CURRENCY CONVERSION RATES ==========
const exchangeRates = {
    PKR: 1,
    USD: 0.0036,
    EUR: 0.0033
};

const currencySymbols = {
    PKR: "PKR",
    USD: "$",
    EUR: "€"
};

// ========== GLOBAL VARIABLES ==========
let cart = [];
let currentCurrency = 'PKR';
let filteredProducts = [...products];

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartUI();
    detectUserLocation();
    setupScrollAnimations();
    setupPageTransitions();
    
    // Render products on shop page
    if (document.getElementById('productsGrid')) {
        renderShopProducts();
    }
    
    // Render featured products on homepage
    if (document.getElementById('featuredProducts')) {
        renderFeaturedProducts();
    }
    
    // Render cart on cart page
    if (document.getElementById('cartItemsContainer')) {
        renderCart();
    }
});

// ========== PAGE TRANSITIONS ==========
function setupPageTransitions() {
    // Add fade-in animation on page load
    document.body.style.animation = 'pageTransitionIn 0.8s ease';
    
    // Handle link clicks for smooth page transition
    document.querySelectorAll('a:not([href^="#"]):not([href^="javascript"])').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('cart') && !href.startsWith('shop') && !href.includes('index')) {
                return; // Allow external links
            }
            
            // For same-page links, smooth transition is handled by scroll-behavior
        });
    });
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.featured, .about, .contact').forEach(section => {
        observer.observe(section);
    });
}

// ========== CART MANAGEMENT ==========

function loadCart() {
    const savedCart = localStorage.getItem('catene_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveCart() {
    localStorage.setItem('catene_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    showNotification(`✓ ${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
        }
    }
}

function updateCartUI() {
    const cartCounts = document.querySelectorAll('#cartCount');
    if (cartCounts.length > 0) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounts.forEach(badge => {
            badge.textContent = totalItems;
        });
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ========== CURRENCY MANAGEMENT ==========

function changeCurrency() {
    const select = document.getElementById('currencySelect');
    if (!select) return;
    
    currentCurrency = select.value;
    
    // Re-render all prices
    if (document.getElementById('productsGrid')) {
        renderShopProducts();
    }
    if (document.getElementById('featuredProducts')) {
        renderFeaturedProducts();
    }
    if (document.getElementById('cartItemsContainer')) {
        renderCart();
    }
    
    localStorage.setItem('catene_currency', currentCurrency);
}

function formatPrice(amount) {
    const converted = amount * exchangeRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    
    if (currentCurrency === 'PKR') {
        return `${converted.toFixed(0)} ${symbol}`;
    } else {
        return `${symbol}${converted.toFixed(2)}`;
    }
}

function detectUserLocation() {
    const savedCurrency = localStorage.getItem('catene_currency');
    if (savedCurrency) {
        currentCurrency = savedCurrency;
        const selects = document.querySelectorAll('#currencySelect');
        selects.forEach(select => {
            select.value = currentCurrency;
        });
    }
}

// ========== PRODUCT RENDERING ==========

function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = products.slice(0, 6);
    container.innerHTML = featuredProducts.map((product, index) => 
        createProductCard(product, index)
    ).join('');
}

function renderShopProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    applyFilters();
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #888;">No products found.</p>';
        return;
    }
    
    container.innerHTML = filteredProducts.map((product, index) => 
        createProductCard(product, index)
    ).join('');
}

function createProductCard(product, index) {
    const stars = createStars(product.rating);
    const delay = index * 0.05;
    
    return `
        <div class="product-card" style="animation-delay: ${delay}s">
            <div class="product-image">
                <i class="fas fa-sparkles placeholder"></i>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">(${product.reviews})</span>
                </div>
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                    <button class="btn-wishlist" title="Add to Wishlist" onclick="toggleWishlist(event)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    return stars;
}

// ========== FILTERING AND SORTING ==========

function applyFilters() {
    let filtered = [...products];
    
    // Category filter - DEFAULT TO ALL IF NO PARAM
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked && cb.value !== 'all')
        .map(cb => cb.value);
    
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Price filter
    const priceRange = document.getElementById('priceRange');
    if (priceRange) {
        const maxPrice = parseInt(priceRange.value);
        const priceValue = document.getElementById('priceValue');
        if (priceValue) {
            priceValue.textContent = maxPrice;
        }
        filtered = filtered.filter(p => p.price <= maxPrice);
    }
    
    // Sorting
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        const sortValue = sortSelect.value;
        
        switch(sortValue) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => b.id - a.id);
        }
    }
    
    filteredProducts = filtered;
}

function filterProducts() {
    renderShopProducts();
}

// ========== CART PAGE RENDERING ==========

function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some beautiful charms to get started!</p>
                <a href="shop.html" class="btn-primary" style="margin-top: 20px; display: inline-block;">Start Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="fas fa-sparkles"></i>
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div>
                <p style="font-weight: 700; margin-bottom: 10px; animation: fadeInUp 0.4s ease;">${formatPrice(item.price * item.quantity)}</p>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = getCartTotal();
    const shipping = subtotal > 5000 ? 0 : 300;
    const tax = 0;
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// ========== CHECKOUT & PROMO ==========

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = getCartTotal();
    showNotification(`✓ Order placed!\n\nTotal: ${formatPrice(total)}`, 'success');
    
    // In production, redirect to payment gateway
    setTimeout(() => {
        cart = [];
        saveCart();
        window.location.href = 'index.html';
    }, 2000);
}

function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase().trim();
    
    if (!promoCode) {
        showNotification('Please enter a promo code', 'error');
        return;
    }
    
    if (promoCode === 'WELCOME10') {
        showNotification('✓ Promo code applied! 10% discount', 'success');
        const discountedTotal = getCartTotal() * 0.9;
        const totalEl = document.getElementById('total');
        if (totalEl) totalEl.textContent = formatPrice(discountedTotal);
    } else if (promoCode === 'SAVE20') {
        showNotification('✓ Promo code applied! 20% discount', 'success');
        const discountedTotal = getCartTotal() * 0.8;
        const totalEl = document.getElementById('total');
        if (totalEl) totalEl.textContent = formatPrice(discountedTotal);
    } else {
        showNotification('✗ Invalid promo code', 'error');
    }
    
    document.getElementById('promoCode').value = '';
}

// ========== UTILITIES ==========

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 14px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        animation: slideIn 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function toggleWishlist(e) {
    const btn = e.target.closest('.btn-wishlist');
    if (!btn) return;
    
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    
    if (btn.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('❤ Added to Wishlist!', 'success');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Removed from Wishlist', 'success');
    }
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`✓ Thank you for subscribing with ${email}!`, 'success');
    e.target.reset();
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .btn-wishlist.active i {
        color: #e74c3c !important;
    }
`;
document.head.appendChild(style);