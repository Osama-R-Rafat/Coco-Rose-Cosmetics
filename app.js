// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: "Hair Tonic Spray – اسبراي مقوي للشعر",
        description: "اسبراي مضاد للتساقط ومحفز لإنبات الشعر، غني بالمستخلصات العشبية والزيوت الطبيعية، يعمل على ترميم وترطيب وتنشيط فروة الرأس.",
        price: 170,
        image: "images/optimized/Hair_tonic_spray.webp",
        category: "hair",
        size: "220 ml",
        details: [
            "يقلل تساقط الشعر ويقوي البصيلات",
            "ينشط فروة الرأس ويحفز الدورة الدموية",
            "يساعد على إعادة إنبات الشعر",
            "يرطب ويُرمم الشعر التالف",
            "تركيبة خفيفة غير دهنية",
            "مناسب للشعر الجاف والمتساقط"
        ],
        ingredients: "Water, Glycerin, Panthenol, Propylene Glycol, Caffeine, Jojoba Oil, Aloe Barbadensis Extract, Phenoxyethanol, Vitamin E, Sodium Benzoate, Ginkgo Biloba Extract, Thyme Extract, L-Arginine, Hydrolyzed Keratin, Hydrolyzed Silk Protein, Polysorbate 20, Tea Tree Oil, Green Tea Extract, Biotin, Fragrance, Citric Acid, Color"
    },
    {
        id: 2,
        name: "Free Sulfate Shampoo – شامبو فري سالفيت",
        description: "شامبو لطيف وخالي من السلفات القاسية، ينظف الشعر بعمق مع الحفاظ على نعومته وصحة فروة الرأس.",
        price: 120,
        image: "images/optimized/sulfate_shampoo.webp",
        category: "hair",
        size: "220 ml",
        details: [
            "خالي من السلفات",
            "تنظيف عميق بدون جفاف",
            "يحافظ على نعومة ولمعان الشعر",
            "لطيف على فروة الرأس",
            "مناسب للاستخدام المنتظم"
        ],
        ingredients: "Water, Sulfosuccinate, Betaine, Comperlan, Panthenol, Glycerin, Caffeine, Sodium Benzoate, Total Gard, Guar Gum, Parfum, Color"
    },
    {
        id: 3,
        name: "Leave In Cream – كريم ليف إن",
        description: "كريم مرطب ومغذي يُترك على الشعر بدون شطف، غني بزبدة الشيا والهيالورونيك أسيد وزيت نخالة الأرز.",
        price: 250,
        image: "images/optimized/Leave_in_cream.webp",
        category: "hair",
        size: "220 g",
        details: [
            "ترطيب عميق يدوم طويلًا",
            "يرمم الشعر التالف",
            "يهدئ فروة الرأس",
            "يقلل الهيشان والتقصف",
            "لا يحتاج إلى شطف"
        ],
        ingredients: "Water, Easylux Ultra, Cetyl Alcohol, Rice Bran Oil, Isopropyl Myristate, Shea Butter, Catamodia Emulsion, Hyaluronic Acid, Aroma Correct, Total Guard, Parfum, BTMS 80"
    }
];

// ============================================
// BUNDLES DATA
// ============================================
const bundles = [
    {
        id: 101,
        name: "المجموعة الكاملة",
        description: "روتين متكامل مناسب للشعر الجاف والمتساقط",
        includes: [
            "Hair Tonic Spray 220 ml",
            "Free Sulfate Shampoo 220 ml",
            "Leave In Cream 220 g"
        ],
        price: 540,
        originalPrice: 540,
        image: "images/optimized/Group1.webp",
        category: "bundle"
    },
    {
        id: 102,
        name: "التجميعة الثانية – الترطيب العميق",
        description: "كريم ليف إن يُترك على الشعر لترطيب مضاعف وشامبو فري سالفيت ينظف ويرطب بدون إضرار بالشعر",
        includes: [
            "Leave In Cream 220 g",
            "Free Sulfate Shampoo 220 ml"
        ],
        price: 370,
        originalPrice: 370,
        image: "images/optimized/Group2.webp",
        category: "bundle"
    },
    {
        id: 103,
        name: "التجميعة الثالثة – محاربة التساقط",
        description: "اسبراي مضاد للتساقط وشامبو فري سالفيت لتنشيط فروة الرأس وتقوية البصيلات",
        includes: [
            "Hair Tonic Spray 220 ml",
            "Free Sulfate Shampoo 220 ml"
        ],
        price: 290,
        originalPrice: 290,
        image: "images/optimized/Group3.webp",
        category: "bundle"
    }
];

// ============================================
// GLOBAL STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('cocoRoseCart')) || [];

// WhatsApp phone number (Replace with your actual number)
const WHATSAPP_NUMBER = "01017377281";

// FormSubmit email (Replace with your actual email)
const FORMSUBMIT_EMAIL = "mahmedsayed726@gmail.com";

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
function renderProducts(productsToRender = [...products, ...bundles]) {
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

    productsGrid.innerHTML = productsToRender.map(product => {
        // Check if it's a bundle
        const isBundle = product.category === 'bundle';

        // Build description - for bundles show includes as bullet list
        let displayDescription = product.description;
        if (isBundle && product.includes) {
            displayDescription = `
                <div style="margin-bottom: 8px;">${product.description}</div>
                <ul style="text-align: right; font-size: 0.85rem; color: var(--text-gray); padding-right: 20px; margin: 8px 0;">
                    ${product.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }

        return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" decoding="async" width="400" height="280" onload="this.classList.add('loaded')">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-description">${displayDescription}</div>
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
    `;
    }).join('');

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
        let filtered = [...products, ...bundles];

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
        renderProducts([...products, ...bundles]);
    };
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(productId, quantity) {
    // Search in both products and bundles
    const product = products.find(p => p.id === productId) || bundles.find(b => b.id === productId);

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

    // Add click event listeners to product images
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('click', () => {
            const productId = parseInt(image.closest('.product-card').dataset.productId);
            openProductDetailsModal(productId);
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

// Function to open the product details modal
function openProductDetailsModal(productId) {
    const product = products.find(p => p.id === productId) || bundles.find(b => b.id === productId);
    if (!product) return;

    const modal = document.getElementById('productDetailsModal');
    const overlay = document.getElementById('productDetailsOverlay');
    const modalBody = document.getElementById('productDetailsBody');

    if (modal && overlay && modalBody) {
        // Populate modal with product details
        // Determine content based on type (Product vs Bundle)
        let detailsHtml = '';
        if (product.details) {
            // It's a single product
            detailsHtml = `
                <p style="font-weight: bold; color: var(--primary-color); margin-bottom: var(--spacing-sm);">الحجم: ${product.size}</p>
                <div style="margin-bottom: var(--spacing-sm);">
                    <ul style="list-style: disc; padding-right: 20px; text-align: right;">
                        ${product.details.map(detail => `<li style="margin-bottom: var(--spacing-xs);">${detail}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else if (product.includes) {
            // It's a bundle
            detailsHtml = `
                <p style="font-weight: bold; color: var(--primary-color); margin-bottom: var(--spacing-sm);">محتويات المجموعة:</p>
                <div style="margin-bottom: var(--spacing-sm);">
                    <ul style="list-style: none; padding-right: 0; text-align: right;">
                        ${product.includes.map(item => `<li style="margin-bottom: var(--spacing-xs);"><i class="fas fa-check" style="color: var(--success-color); margin-left: 5px;"></i> ${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onload="this.classList.add('loaded')" style="width: 100%; border-radius: var(--radius-md); margin-bottom: var(--spacing-md);">
            <h2 style="font-family: var(--font-heading); color: var(--primary-color); margin-bottom: var(--spacing-sm);">${product.name}</h2>
            <p style="color: var(--text-gray); margin-bottom: var(--spacing-md); line-height: 1.6;">${product.description}</p>
            
            ${detailsHtml}

            <p style="font-weight: bold; color: var(--primary-color); font-size: 1.2rem; margin-top: var(--spacing-md); border-top: 1px solid var(--border-color); padding-top: var(--spacing-sm);">
                السعر: ${product.price} جنيه
            </p>
        `;

        // Show modal and overlay
        modal.classList.add('active');
        overlay.classList.add('active');

        // Prevent background scrolling (Position Fixed Method)
        // 1. Save current scroll position
        window.savedScrollPosition = window.scrollY;

        // 2. Lock body in place visually
        document.body.style.position = 'fixed';
        document.body.style.top = `-${window.savedScrollPosition}px`;
        document.body.style.width = '100%';

        // 3. Add class for overflow hidden
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open');

        // Add event listener for closing the modal
        const closeButton = document.getElementById('productDetailsClose');
        if (closeButton) {
            closeButton.addEventListener('click', closeProductDetailsModal);
        }

        overlay.addEventListener('click', closeProductDetailsModal);

        // Add ESC key listener for accessibility
        document.addEventListener('keydown', handleModalKeydown);
    }
}

// Function to close the product details modal
function closeProductDetailsModal() {
    const modal = document.getElementById('productDetailsModal');
    const overlay = document.getElementById('productDetailsOverlay');

    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');

        // Restore background scrolling
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');

        // Unlock body and restore position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Instant scroll restoration
        if (window.savedScrollPosition !== undefined) {
            window.scrollTo({
                top: window.savedScrollPosition,
                behavior: 'instant'
            });
        }

        // Remove event listeners
        const closeButton = document.getElementById('productDetailsClose');
        if (closeButton) {
            closeButton.removeEventListener('click', closeProductDetailsModal);
        }

        overlay.removeEventListener('click', closeProductDetailsModal);
        document.removeEventListener('keydown', handleModalKeydown);
    }
}

// Handle ESC key to close modal
function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeProductDetailsModal();
    }
}

