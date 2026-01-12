// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 2,
        name: "زيت طبيعي للشعر",
        description: "زيت معالج طبيعي للشعر، يمنح شعرك القوة واللمعان",
        price: 220,
        image: "images/optimized/product1.webp",
        category: "hair"
    },
    {
        id: 4,
        name: "سبراي تونيك للشعر",
        description: "مكونات طبيعية، يقوي الشعر ويحميه من التساقط",
        price: 160,
        image: "images/optimized/product2.webp",
        category: "hair"
    },
    {
        id: 6,
        name: "سيروم للبشرة",
        description: "سيروم طبيعي للعناية بالبشرة وترطيبها العميق",
        price: 200,
        image: "images/optimized/product3.webp",
        category: "skin"
    }
];

// ============================================
// GLOBAL STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('cocoRoseCart')) || [];

// WhatsApp phone number (Replace with your actual number)
const WHATSAPP_NUMBER = "201020909939";

// FormSubmit email (Replace with your actual email)
const FORMSUBMIT_EMAIL = "your-email@example.com";

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Render products
    renderProducts();

    // Setup event listeners
    setupEventListeners();

    // Update cart UI
    // Setup search and filter
    setupSearchAndFilter();
});

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-gray);">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: var(--border-color);"></i>
                <p>لا توجد منتجات تطابق بحثك</p>
                <button onclick="resetFilters()" class="btn btn-primary" style="margin-top: 15px;">عرض كل المنتجات</button>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" decoding="async" width="400" height="280" onload="this.classList.add('loaded')">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        ${product.price} <small>جنيه</small>
                    </div>
                    <div class="quantity-selector">
                        <button class="qty-btn qty-minus" data-id="${product.id}">-</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="99" readonly>
                        <button class="qty-btn qty-plus" data-id="${product.id}">+</button>
                    </div>
                </div>
                <button class="add-to-cart-btn btn-ripple" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for quantity buttons
    setupProductCardListeners();
}

function setupProductCardListeners() {
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const input = document.getElementById(`qty-${id}`);
            if (input && input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const input = document.getElementById(`qty-${id}`);
            if (input && input.value < 99) {
                input.value = parseInt(input.value) + 1;
            }
        });
    });

    // Add event listeners for add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const productId = parseInt(btn.dataset.id);
            const input = document.getElementById(`qty-${productId}`);
            const quantity = input ? parseInt(input.value) : 1;

            // Visual Feedback
            const originalContent = btn.innerHTML;

            // 1. Loading State
            btn.classList.add('loading');
            btn.innerHTML = '<i class="fas fa-circle-notch rotating"></i> جاري الإضافة...';

            // Simulate network delay for effect (optional, but requested for "professional feel")
            await new Promise(resolve => setTimeout(resolve, 600));

            // 2. Add to Cart Logic
            addToCart(productId, quantity);

            // 3. Success State
            btn.classList.remove('loading');
            btn.classList.add('success');
            btn.innerHTML = '<i class="fas fa-check"></i> تم الإضافة';

            // 4. Reset after delay
            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalContent;
            }, 2000);
        });
    });
}

// ============================================
// SEARCH AND FILTER
// ============================================
function setupSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let activeCategory = 'all';
    let searchQuery = '';

    function filterProducts() {
        let filtered = products;

        // Filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        renderProducts(filtered);
    }

    // Search Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            filterProducts();
        });
    }

    // Filter Buttons Listener
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set Category
            activeCategory = btn.dataset.filter;
            filterProducts();
        });
    });

    // Global reset function
    window.resetFilters = () => {
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterButtons.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        renderProducts(products);
    };
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Save to localStorage
    saveCart();

    // Update UI
    updateCartUI();

    // Fly to cart animation
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (productCard) {
        const img = productCard.querySelector('img');
        if (img) flyToCart(img);
    }

    // Show feedback with click action
    showNotification(`تم إضافة ${product.name} إلى السلة (اضغط للعرض)`, () => showCart());
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    // Persist changes and refresh UI
    saveCart();
    updateCartUI();

}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// ============================================
// CART UI
// ============================================
function updateCartUI() {
    try {
        const cartBadge = document.getElementById('cartBadge');


        // Target modal elements
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const modalTotalPrice = document.getElementById('modalTotalPrice'); // Total inside form
        const cartTotalSection = document.getElementById('cartTotalSection'); // Total inside cart content
        const totalPrice = document.getElementById('totalPrice'); // Initial total

        // Update badges (Header + Floating)
        const itemCount = getCartItemCount();
        const badges = [
            document.getElementById('cartBadge'),
            document.getElementById('headerCartBadge')
        ];

        badges.forEach(badge => {
            if (badge) {
                badge.textContent = itemCount;
                badge.style.display = itemCount > 0 ? 'flex' : 'none';

                if (itemCount > 0) {
                    badge.classList.remove('bump');
                    void badge.offsetWidth;
                    badge.classList.add('bump');
                }
            }
        });



        // Calculate total
        const total = getCartTotal();
        const freeShippingThreshold = 500;

        // Update Shipping Progress
        const shippingContainer = document.getElementById('shippingProgressContainer');
        const shippingText = document.getElementById('shippingText');
        const shippingBar = document.getElementById('shippingProgressBar');

        if (shippingContainer && shippingText && shippingBar) {
            let percentage = (total / freeShippingThreshold) * 100;
            if (percentage > 100) percentage = 100;
            shippingBar.style.width = `${percentage}%`;

            if (total >= freeShippingThreshold) {
                shippingText.innerHTML = '🎉 <strong>مبروك!</strong> لقد حصلت على شحن مجاني';
                shippingBar.style.background = 'linear-gradient(90deg, #25D366, #20ba5a)';
            } else {
                const remaining = freeShippingThreshold - total;
                shippingText.innerHTML = `باقي <strong>${remaining} جنيه</strong> للحصول على شحن مجاني`;
                shippingBar.style.background = 'linear-gradient(90deg, #a8577d, #d097b3)';
            }
        }

        // Update Content
        if (cart.length === 0) {
            // Empty state
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartItems) cartItems.style.display = 'none';
            if (cartTotalSection) cartTotalSection.style.display = 'none';
            if (shippingContainer) shippingContainer.style.display = 'none';

        } else {
            // Filled state
            if (emptyCart) emptyCart.style.display = 'none';
            if (shippingContainer) shippingContainer.style.display = 'block';
            if (cartTotalSection) cartTotalSection.style.display = 'block';

                if (cartItems) {
                cartItems.style.display = 'block';
                cartItems.innerHTML = cart.map((item, index) => `
                    <div class="cart-item" style="display:flex; gap:10px; margin-bottom:10px; align-items:center;">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy" decoding="async" width="60" height="60">
                        <div class="cart-item-info" style="flex:1;">
                            <div style="display:flex; justify-content:space-between;">
                                <div style="font-weight:600;">${item.name}</div>
                                <button onclick="removeFromCart(${item.id})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-times"></i></button>
                            </div>
                            <div style="color:gray; font-size:0.9rem;">${item.price} جنيه</div>
                            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
                                <div class="quantity-selector" style="transform:scale(0.8); transform-origin:left;">
                                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <input type="number" class="qty-input" value="${item.quantity}" readonly>
                                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                                <div style="font-weight:bold;">${item.price * item.quantity}</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update all total displays
        const formattedTotal = `${total} جنيه`;
        if (totalPrice) totalPrice.textContent = formattedTotal;
        if (modalTotalPrice) modalTotalPrice.textContent = formattedTotal;

    } catch (error) {
        console.error("Error updating cart UI:", error);
    }
}

function showCart() {
    // Show the Checkout Modal directly as the Cart
    const modal = document.getElementById('checkoutModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modal) modal.classList.add('active');
    if (modalOverlay) modalOverlay.classList.add('active');
    // Move focus into modal for accessibility
    const closeBtn = modal && modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    // Add key handling for Esc and focus trap
    // Define handler once and attach to document
    window.__cocoModalKeyHandler = window.__cocoModalKeyHandler || function (e) {
        if (!modal || !modal.classList.contains('active')) return;

        // Close on Escape
        if (e.key === 'Escape') {
            hideCart();
            return;
        }

        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
            if (!focusable || focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    };

    document.addEventListener('keydown', window.__cocoModalKeyHandler);
}

function hideCart() {
    const modal = document.getElementById('checkoutModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modal) modal.classList.remove('active');
    if (modalOverlay) modalOverlay.classList.remove('active');
    // Return focus to cart button
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) floatingCartBtn.focus();

    // Remove modal key handler
    if (window.__cocoModalKeyHandler) {
        document.removeEventListener('keydown', window.__cocoModalKeyHandler);
    }
}

// ============================================
// CHECKOUT
// ============================================


function handleCheckout(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const email = document.getElementById('customerEmail').value.trim();

    // Validate
    if (!name || !phone || !address) {
        showNotification('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // Validate phone format
    if (!validatePhone(phone)) {
        showNotification('يرجى إدخال رقم هاتف صالح مكون من 11 رقماً');
        return;
    }

    // Validate email if provided
    if (email && !validateEmail(email)) {
        showNotification('الرجاء إدخال بريد إلكتروني صالح أو تركه فارغاً');
        return;
    }

    // Format order message for WhatsApp
    let message = `*طلب جديد من Coco & Rose*\n\n`;
    message += `*الاسم:* ${name}\n`;
    message += `*الهاتف:* ${phone}\n`;
    message += `*العنوان:* ${address}\n\n`;
    message += `*المنتجات:*\n`;

    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه\n`;
    });

    message += `\n*الإجمالي:* ${getCartTotal()} جنيه`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Send email notification (using FormSubmit - no backend needed)
    sendEmailNotification(name, phone, address, email);

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Clear cart and close modal
    setTimeout(() => {
        clearCart();
        hideCart();
        const checkoutFormEl = document.getElementById('checkoutForm');
        if (checkoutFormEl) checkoutFormEl.reset();

        // Trigger celebration
        if (window.celebrateOrder) window.celebrateOrder();

        showNotification('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً');
    }, 1000);
}

// ============================================
// EMAIL NOTIFICATION (FormSubmit)
// ============================================
function sendEmailNotification(name, phone, address, email) {
    // Format order details for email
    const orderDetails = cart.map(item =>
        `${item.name} × ${item.quantity} = ${item.price * item.quantity} EGP`
    ).join('\n');

    const emailData = {
        name: name,
        phone: phone,
        address: address,
        email: email || 'لم يتم توفير بريد إلكتروني',
        order: orderDetails,
        total: `${getCartTotal()} EGP`,
        _subject: `طلب جديد من ${name}`,
        _template: 'table'
    };

    // Send using FormSubmit
    fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
        .then(response => response.json())
        .then(data => {
            // Success - keep minimal logging in non-production
        })
        .catch(error => {
            console.error('Email error:', error);
            // Don't block WhatsApp flow if email fails
        });
}

// ============================================
// LOCALSTORAGE
// ============================================
function saveCart() {
    localStorage.setItem('cocoRoseCart', JSON.stringify(cart));
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', showCart);
    }

    const headerCartBtn = document.getElementById('headerCartBtn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', showCart);
    }





    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', hideCart);
    }

    // Modal overlay
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideCart);
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, onClick = null) {
    // Create notification element
    // Simple non-animated toast notification
    const notification = document.createElement('div');
    notification.setAttribute('role', 'status');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #a8577d, #d097b3);
        color: white;
        padding: 12px 18px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        min-width: 200px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    `;

    notification.innerHTML = `<span>${message}</span>`;

    if (onClick) notification.addEventListener('click', onClick);

    document.body.appendChild(notification);

    // Remove after timeout (no animations)
    setTimeout(() => notification.remove(), 3500);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
// Format currency
function formatCurrency(amount) {
    return `${amount.toLocaleString('ar-EG')} جنيه`;
}

// Validate phone number
function validatePhone(phone) {
    return /^[0-9]{11}$/.test(phone);
}

// Validate email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// ANIMATIONS
// ============================================
function flyToCart(sourceImage) {
    const cartBtn = document.getElementById('floatingCartBtn');
    if (!cartBtn || !sourceImage) return;
    // Non-animated update: just briefly bump the cart badge visually by toggling class
    cartBtn.classList.add('bump');
    setTimeout(() => cartBtn.classList.remove('bump'), 250);
}
