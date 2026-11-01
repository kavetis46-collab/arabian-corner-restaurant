/**
 * Arabian Corner Restaurant - Main Application Logic
 * Handles Menu Rendering, Cart Drawer, WhatsApp Ordering, and Reservations
 */

// State Management
const state = {
    cart: [],
    currentCategory: "all",
    searchQuery: "",
    activeFilter: "all",
    activePortions: {}, // map of itemId -> selectedPortionIndex
    whatsappNumber: RESTAURANT_CONFIG.whatsappNumber,
    orderType: "delivery", // 'delivery', 'takeaway', 'dinein'
    currency: RESTAURANT_CONFIG.currency
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    loadSavedSettings();
    initializeDefaultPortions();
    renderCategories();
    renderMenu();
    updateCartUI();
    setupEventListeners();
    renderReviews();
    renderFaqs();
});

// Load settings from localStorage
function loadSavedSettings() {
    const savedPhone = localStorage.getItem("arabian_corner_whatsapp");
    // Ensure the verified official phone number from Google Maps is the primary default
    if (savedPhone && savedPhone !== "919876543210") {
        state.whatsappNumber = savedPhone.replace(/\D/g, "");
    } else {
        state.whatsappNumber = RESTAURANT_CONFIG.whatsappNumber;
        localStorage.setItem("arabian_corner_whatsapp", RESTAURANT_CONFIG.whatsappNumber);
    }
    const savedCart = localStorage.getItem("arabian_corner_cart");
    if (savedCart) {
        try {
            state.cart = JSON.parse(savedCart);
        } catch (e) {
            state.cart = [];
        }
    }
    updateWhatsAppDisplay();
}

// Update WhatsApp display numbers across the page
function updateWhatsAppDisplay() {
    const phoneDisplays = document.querySelectorAll(".restaurant-phone-display");
    phoneDisplays.forEach(el => {
        el.textContent = "098851 96008";
    });
    const phoneDisplaysIntl = document.querySelectorAll(".restaurant-phone-intl");
    phoneDisplaysIntl.forEach(el => {
        el.textContent = "+91 98851 96008";
    });
    const phoneInput = document.getElementById("admin-whatsapp-input");
    if (phoneInput) {
        phoneInput.value = state.whatsappNumber;
    }
}

// Save Cart to localStorage
function saveCart() {
    localStorage.setItem("arabian_corner_cart", JSON.stringify(state.cart));
    updateCartUI();
}

// Initialize default portions for items with multiple sizes
function initializeDefaultPortions() {
    MENU_ITEMS.forEach(item => {
        state.activePortions[item.id] = 0; // Default to first portion option
    });
}

// Render Categories
function renderCategories() {
    const container = document.getElementById("category-tabs-container");
    if (!container) return;

    container.innerHTML = MENU_CATEGORIES.map(cat => {
        const isActive = state.currentCategory === cat.id;
        return `
            <button 
                onclick="filterCategory('${cat.id}')"
                class="category-tab px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold tracking-wide transition-all duration-250 ${isActive ? 'active' : ''}"
                data-category="${cat.id}">
                <i class="fa-solid ${cat.icon} text-xs"></i>
                <span>${cat.name}</span>
            </button>
        `;
    }).join("");
}

// Filter Category
function filterCategory(categoryId) {
    state.currentCategory = categoryId;
    renderCategories();
    renderMenu();
}

// Filter Menu Items by Search & Category
function getFilteredItems() {
    return MENU_ITEMS.filter(item => {
        const matchesCategory = state.currentCategory === "all" || item.category === state.currentCategory;
        const matchesSearch = state.searchQuery === "" || 
            item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
            item.arabicName.toLowerCase().includes(state.searchQuery.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
}

// Render Menu Cards
function renderMenu() {
    const container = document.getElementById("menu-grid-container");
    if (!container) return;

    const filtered = getFilteredItems();

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full py-12 text-center text-zinc-400">
                <i class="fa-solid fa-magnifying-glass text-3xl mb-3 text-white/40"></i>
                <h3 class="text-base font-heading font-bold text-white">No dishes found</h3>
                <p class="text-xs mt-1 text-zinc-400">Try searching for something else or browse another category.</p>
                <button onclick="resetFilters()" class="mt-3 px-5 py-1.5 btn-outline-white rounded-full text-xs">View All Dishes</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => {
        const selectedPortionIdx = state.activePortions[item.id] || 0;
        const currentPortion = item.portions && item.portions.length > 0 
            ? item.portions[selectedPortionIdx] 
            : { name: "Regular", price: item.price };
        
        const portionButtons = item.portions && item.portions.length > 1 ? `
            <div class="mt-2.5 pt-2.5 border-t border-neutral-800">
                <p class="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">Portion / Serving:</p>
                <div class="flex flex-wrap gap-1">
                    ${item.portions.map((p, idx) => `
                        <button 
                            type="button"
                            onclick="selectPortion('${item.id}', ${idx})"
                            class="portion-pill text-[11px] px-2 py-0.5 rounded-md transition-all ${idx === selectedPortionIdx ? 'selected' : ''}">
                            ${p.name} <span class="font-bold ml-1">${state.currency}${p.price}</span>
                        </button>
                    `).join("")}
                </div>
            </div>
        ` : '';

        return `
            <div class="food-card flex flex-col justify-between group" data-item-id="${item.id}">
                <div>
                    <!-- Image Wrapper -->
                    <div class="food-image-wrapper h-48 w-full relative">
                        <img 
                            src="${item.image}" 
                            alt="${item.name}" 
                            loading="lazy" 
                            class="w-full h-full object-cover"
                            onerror="this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
                        
                        <!-- Badges -->
                        <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1 max-w-[80%]">
                            ${item.badge ? `
                                <span class="px-2 py-0.5 text-[10px] rounded-md badge-signature shadow">
                                    ${item.badge}
                                </span>
                            ` : ''}
                        </div>

                        <!-- Diet Icon & Rating -->
                        <div class="absolute top-2.5 right-2.5 flex items-center gap-1">
                            <span class="px-1.5 py-0.5 text-[11px] rounded bg-black/80 backdrop-blur-md text-white font-bold flex items-center gap-1 border border-white/20">
                                <i class="fa-solid fa-star text-[9px]"></i> ${item.rating}
                            </span>
                        </div>

                        <!-- Arabic Subtitle on Image bottom -->
                        <div class="absolute bottom-2 right-2.5 font-arabic text-white/90 text-sm dir-rtl pointer-events-none drop-shadow">
                            ${item.arabicName}
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-4">
                        <div class="flex items-start justify-between gap-2">
                            <h3 class="font-heading text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                                ${item.name}
                            </h3>
                        </div>

                        <p class="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                            ${item.description}
                        </p>

                        <!-- Portion Selector (if applicable) -->
                        ${portionButtons}
                    </div>
                </div>

                <!-- Footer & Action Buttons -->
                <div class="p-4 pt-0 mt-2">
                    <div class="flex items-center justify-between py-2 border-t border-neutral-800">
                        <div>
                            <span class="text-[10px] text-zinc-400 block uppercase tracking-wider">Price</span>
                            <span class="text-lg font-bold font-heading text-white">
                                ${state.currency}${currentPortion.price}
                            </span>
                        </div>

                        <!-- Details Link -->
                        <button 
                            type="button"
                            onclick="openDishModal('${item.id}')"
                            class="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                            <i class="fa-solid fa-circle-info text-[11px]"></i> Details
                        </button>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-2">
                        <!-- Add to Cart (Multi-order) -->
                        <button 
                            type="button"
                            onclick="addToCart('${item.id}')"
                            class="px-2.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-neutral-700 hover:border-white/40">
                            <i class="fa-solid fa-cart-plus text-xs"></i> Add
                        </button>

                        <!-- Instant WhatsApp Order (Direct 1-Click) -->
                        <button 
                            type="button"
                            onclick="quickWhatsAppOrder('${item.id}')"
                            class="px-2.5 py-2 rounded-lg btn-whatsapp text-xs font-bold flex items-center justify-center gap-1.5 shadow">
                            <i class="fa-brands fa-whatsapp text-sm"></i> Order Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Select Portion for an item
function selectPortion(itemId, portionIdx) {
    state.activePortions[itemId] = portionIdx;
    renderMenu();
}

// Reset Filters
function resetFilters() {
    state.currentCategory = "all";
    state.searchQuery = "";
    const searchInput = document.getElementById("menu-search-input");
    if (searchInput) searchInput.value = "";
    renderCategories();
    renderMenu();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search Input
    const searchInput = document.getElementById("menu-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value.trim();
            renderMenu();
        });
    }

    // Cart Drawer Toggle
    const cartBtn = document.getElementById("cart-toggle-btn");
    const floatingCartBtn = document.getElementById("floating-cart-toggle-btn");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const cartBackdrop = document.getElementById("cart-backdrop");

    if (cartBtn) cartBtn.addEventListener("click", toggleCartDrawer);
    if (floatingCartBtn) floatingCartBtn.addEventListener("click", toggleCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener("click", toggleCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener("click", toggleCartDrawer);

    // Order Type Radio Selection (Delivery / Takeaway / Dine-in)
    const orderTypeRadios = document.querySelectorAll('input[name="order-type"]');
    orderTypeRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            state.orderType = e.target.value;
            updateOrderTypeUI();
            updateCartUI();
        });
    });

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // Reservation Form
    const reservationForm = document.getElementById("table-reservation-form");
    if (reservationForm) {
        reservationForm.addEventListener("submit", handleTableReservation);
    }
}

// Toggle Cart Drawer
function toggleCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const backdrop = document.getElementById("cart-backdrop");
    if (!drawer || !backdrop) return;

    const isOpen = !drawer.classList.contains("translate-x-full");

    if (isOpen) {
        drawer.classList.add("translate-x-full");
        backdrop.classList.add("opacity-0", "pointer-events-none");
        backdrop.classList.remove("opacity-100");
    } else {
        drawer.classList.remove("translate-x-full");
        backdrop.classList.remove("opacity-0", "pointer-events-none");
        backdrop.classList.add("opacity-100");
    }
}

// Update Order Type Dynamic Fields (Address vs Table)
function updateOrderTypeUI() {
    const addressWrapper = document.getElementById("delivery-address-wrapper");
    const tableWrapper = document.getElementById("table-number-wrapper");
    const deliveryFeeRow = document.getElementById("cart-delivery-fee-row");

    if (state.orderType === "dinein") {
        if (addressWrapper) addressWrapper.classList.add("hidden");
        if (tableWrapper) tableWrapper.classList.remove("hidden");
        if (deliveryFeeRow) deliveryFeeRow.classList.add("hidden");
    } else if (state.orderType === "takeaway") {
        if (addressWrapper) addressWrapper.classList.add("hidden");
        if (tableWrapper) tableWrapper.classList.add("hidden");
        if (deliveryFeeRow) deliveryFeeRow.classList.add("hidden");
    } else {
        // Delivery
        if (addressWrapper) addressWrapper.classList.remove("hidden");
        if (tableWrapper) tableWrapper.classList.add("hidden");
        if (deliveryFeeRow) deliveryFeeRow.classList.remove("hidden");
    }
}

// Add Item to Cart
function addToCart(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const selectedPortionIdx = state.activePortions[itemId] || 0;
    const portion = item.portions && item.portions.length > 0 
        ? item.portions[selectedPortionIdx] 
        : { name: "Regular", price: item.price };

    // Check if item with exact portion already exists in cart
    const existingIndex = state.cart.findIndex(
        cartItem => cartItem.id === itemId && cartItem.portionName === portion.name
    );

    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            arabicName: item.arabicName,
            portionName: portion.name,
            price: portion.price,
            image: item.image,
            quantity: 1
        });
    }

    saveCart();
    showToast(`Added ${item.name} (${portion.name}) to cart!`);
}

// Update Cart Quantity
function updateCartItemQuantity(index, delta) {
    if (!state.cart[index]) return;
    
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
        state.cart.splice(index, 1);
    }
    saveCart();
}

// Remove from Cart
function removeFromCart(index) {
    if (!state.cart[index]) return;
    const removedName = state.cart[index].name;
    state.cart.splice(index, 1);
    saveCart();
    showToast(`Removed ${removedName} from cart`);
}

// Clear Entire Cart
function clearCart() {
    state.cart = [];
    saveCart();
    showToast("Cart has been cleared");
}

// Update Cart UI elements
function updateCartUI() {
    const cartCountBadges = document.querySelectorAll(".cart-count-badge");
    const cartTotalDisplays = document.querySelectorAll(".cart-total-display");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartEmptyState = document.getElementById("cart-empty-state");
    const cartFooter = document.getElementById("cart-footer");
    const floatingCartBar = document.getElementById("floating-cart-bar");

    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let deliveryFee = 0;
    if (state.orderType === "delivery" && subtotal > 0) {
        deliveryFee = subtotal >= RESTAURANT_CONFIG.freeDeliveryThreshold ? 0 : RESTAURANT_CONFIG.deliveryFee;
    }
    const grandTotal = subtotal + deliveryFee;

    // Badges
    cartCountBadges.forEach(badge => {
        badge.textContent = totalCount;
        if (totalCount > 0) {
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
    });

    // Floating bar visibility on mobile / desktop
    if (floatingCartBar) {
        if (totalCount > 0) {
            floatingCartBar.classList.remove("translate-y-32", "opacity-0");
            floatingCartBar.classList.add("translate-y-0", "opacity-100");
        } else {
            floatingCartBar.classList.add("translate-y-32", "opacity-0");
            floatingCartBar.classList.remove("translate-y-0", "opacity-100");
        }
    }

    // Totals
    cartTotalDisplays.forEach(el => {
        el.textContent = `${state.currency}${grandTotal}`;
    });

    const subtotalEl = document.getElementById("cart-subtotal");
    if (subtotalEl) subtotalEl.textContent = `${state.currency}${subtotal}`;

    const deliveryFeeEl = document.getElementById("cart-delivery-fee");
    if (deliveryFeeEl) {
        if (deliveryFee === 0) {
            deliveryFeeEl.innerHTML = `<span class="text-white font-bold uppercase text-xs">FREE</span>`;
        } else {
            deliveryFeeEl.textContent = `${state.currency}${deliveryFee}`;
        }
    }

    const freeDeliveryNotice = document.getElementById("free-delivery-notice");
    if (freeDeliveryNotice) {
        if (subtotal > 0 && subtotal < RESTAURANT_CONFIG.freeDeliveryThreshold && state.orderType === "delivery") {
            const remaining = RESTAURANT_CONFIG.freeDeliveryThreshold - subtotal;
            freeDeliveryNotice.innerHTML = `Add <span class="font-bold text-white underline">${state.currency}${remaining}</span> more for <strong>FREE Delivery</strong>!`;
            freeDeliveryNotice.classList.remove("hidden");
        } else {
            freeDeliveryNotice.classList.add("hidden");
        }
    }

    // Render Items in Drawer
    if (totalCount === 0) {
        if (cartEmptyState) cartEmptyState.classList.remove("hidden");
        if (cartItemsList) cartItemsList.classList.add("hidden");
        if (cartFooter) cartFooter.classList.add("hidden");
    } else {
        if (cartEmptyState) cartEmptyState.classList.add("hidden");
        if (cartItemsList) {
            cartItemsList.classList.remove("hidden");
            cartItemsList.innerHTML = state.cart.map((item, idx) => `
                <div class="flex items-center gap-3 p-2.5 bg-neutral-900 rounded-xl border border-neutral-800">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-neutral-700">
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex items-start justify-between">
                            <h4 class="text-xs font-semibold text-white truncate">${item.name}</h4>
                            <button onclick="removeFromCart(${idx})" class="text-zinc-500 hover:text-white text-xs ml-1 transition-colors">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                        <p class="text-[10px] text-zinc-400 font-medium">${item.portionName}</p>
                        <div class="flex items-center justify-between mt-1.5">
                            <span class="text-xs font-bold text-white">${state.currency}${item.price * item.quantity}</span>
                            
                            <div class="flex items-center gap-1.5 bg-neutral-800 rounded p-0.5 border border-neutral-700">
                                <button onclick="updateCartItemQuantity(${idx}, -1)" class="w-5 h-5 flex items-center justify-center text-zinc-300 hover:bg-white hover:text-black rounded transition-colors text-[10px]">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <span class="text-[11px] font-bold w-4 text-center text-white">${item.quantity}</span>
                                <button onclick="updateCartItemQuantity(${idx}, 1)" class="w-5 h-5 flex items-center justify-center text-zinc-300 hover:bg-white hover:text-black rounded transition-colors text-[10px]">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join("");
        }
        if (cartFooter) cartFooter.classList.remove("hidden");
    }
}

// -----------------------------------------------------------------------------
// WHATSAPP ORDER PROCESSING & REDIRECTION
// -----------------------------------------------------------------------------

/**
 * Quick WhatsApp Order for a single dish directly from its card
 */
function quickWhatsAppOrder(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const selectedPortionIdx = state.activePortions[itemId] || 0;
    const portion = item.portions && item.portions.length > 0 
        ? item.portions[selectedPortionIdx] 
        : { name: "Regular", price: item.price };

    const message = 
`🕌 *QUICK ORDER - ARABIAN CORNER RESTAURANT & SKYLOUNGE* 🕌
📍 _Gachibowli, Hyderabad (Venkat Sai's Ganapathi Gold)_
----------------------------------------
Salam / Hello! I would like to order:

🍽️ *${item.name}*
✨ *Serving:* ${portion.name}
💰 *Price:* ${state.currency}${portion.price}
🏷️ *Dish Code:* #${item.id}

----------------------------------------
Please let me know the preparation time and confirm my order. Thank you!`;

    sendToWhatsApp(message);
}

/**
 * Place the full multi-item cart order to WhatsApp with customer details
 */
function checkoutViaWhatsApp() {
    if (state.cart.length === 0) {
        showToast("Your cart is empty! Please add items first.");
        return;
    }

    const customerNameInput = document.getElementById("order-customer-name");
    const customerPhoneInput = document.getElementById("order-customer-phone");
    const addressInput = document.getElementById("order-customer-address");
    const tableInput = document.getElementById("order-table-number");
    const notesInput = document.getElementById("order-special-notes");

    const customerName = customerNameInput ? customerNameInput.value.trim() : "";
    const customerPhone = customerPhoneInput ? customerPhoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const tableNumber = tableInput ? tableInput.value.trim() : "";
    const notes = notesInput ? notesInput.value.trim() : "";

    // Validation
    if (!customerName) {
        alert("Please enter your name before placing the order.");
        if (customerNameInput) customerNameInput.focus();
        return;
    }

    if (state.orderType === "delivery" && !address) {
        alert("Please enter your delivery address.");
        if (addressInput) addressInput.focus();
        return;
    }

    if (state.orderType === "dinein" && !tableNumber) {
        alert("Please enter your table number.");
        if (tableInput) tableInput.focus();
        return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let deliveryFee = 0;
    if (state.orderType === "delivery") {
        deliveryFee = subtotal >= RESTAURANT_CONFIG.freeDeliveryThreshold ? 0 : RESTAURANT_CONFIG.deliveryFee;
    }
    const grandTotal = subtotal + deliveryFee;

    // Order type label
    let orderTypeLabel = "🛵 Home Delivery";
    let locationDetail = `📍 *Delivery Address:* ${address}`;
    if (state.orderType === "takeaway") {
        orderTypeLabel = "🥡 Takeaway / Self-Pickup";
        locationDetail = "📍 *Pickup Type:* Customer will collect from counter";
    } else if (state.orderType === "dinein") {
        orderTypeLabel = "🍽️ Dine-in (Table Order)";
        locationDetail = `📍 *Table Number:* Table #${tableNumber}`;
    }

    // Build Items list
    const itemsText = state.cart.map((item, index) => {
        return `${index + 1}. *${item.name}* (${item.portionName})
   ↳ Qty: ${item.quantity} × ${state.currency}${item.price} = *${state.currency}${item.quantity * item.price}*`;
    }).join("\n\n");

    const message = 
`🕌 *NEW ORDER - ARABIAN CORNER RESTAURANT & SKYLOUNGE* 🕌
📍 _Gachibowli, Hyderabad (Venkat Sai's Ganapathi Gold)_
----------------------------------------
👤 *Customer Name:* ${customerName}
📞 *Customer Phone:* ${customerPhone || "Not provided"}
🔖 *Order Type:* ${orderTypeLabel}
${locationDetail}

📋 *ORDER ITEMS:*
${itemsText}

----------------------------------------
💵 *Subtotal:* ${state.currency}${subtotal}
${state.orderType === "delivery" ? `🛵 *Delivery Fee:* ${deliveryFee === 0 ? "FREE" : state.currency + deliveryFee}\n` : ""}💰 *GRAND TOTAL:* ${state.currency}${grandTotal}
----------------------------------------
📝 *Special Notes / Cooking Instructions:*
${notes ? notes : "Standard preparation with authentic spices."}
----------------------------------------
_Please confirm my order, estimated preparation time, and payment mode. Thank you!_`;

    sendToWhatsApp(message);
}

/**
 * Handle Table Reservation form and redirect to WhatsApp
 */
function handleTableReservation(e) {
    e.preventDefault();
    
    const name = document.getElementById("res-name").value.trim();
    const phone = document.getElementById("res-phone").value.trim();
    const guests = document.getElementById("res-guests").value;
    const date = document.getElementById("res-date").value;
    const time = document.getElementById("res-time").value;
    const seating = document.getElementById("res-seating").value;
    const specialRequests = document.getElementById("res-notes").value.trim();

    if (!name || !phone || !date || !time) {
        alert("Please fill in all required fields for table reservation.");
        return;
    }

    const message = 
`👑 *TABLE & SKYLOUNGE RESERVATION - ARABIAN CORNER* 👑
📍 _Gachibowli, Hyderabad (Venkat Sai's Ganapathi Gold)_
----------------------------------------
Greetings! I would like to reserve a table/majlis at Arabian Corner Restaurant - Skylounge:

👤 *Guest Name:* ${name}
📞 *Contact Phone:* ${phone}
👥 *Number of Guests:* ${guests} Persons
📅 *Date:* ${date}
⏰ *Time:* ${time}
🛋️ *Seating Preference:* ${seating}

📝 *Occasion / Special Requests:*
${specialRequests ? specialRequests : "Standard royal seating"}

----------------------------------------
_Please confirm availability and table booking status. Thank you!_`;

    sendToWhatsApp(message);
}

/**
 * Redirect directly to WhatsApp Web / App
 */
function sendToWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${state.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
}

// -----------------------------------------------------------------------------
// DISH DETAIL MODAL
// -----------------------------------------------------------------------------
function openDishModal(itemId) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const modal = document.getElementById("dish-detail-modal");
    const content = document.getElementById("dish-modal-content");
    if (!modal || !content) return;

    const selectedPortionIdx = state.activePortions[item.id] || 0;
    const portion = item.portions && item.portions.length > 0 
        ? item.portions[selectedPortionIdx] 
        : { name: "Regular", price: item.price };

    content.innerHTML = `
        <div class="relative">
            <img src="${item.image}" alt="${item.name}" class="w-full h-64 sm:h-72 object-cover rounded-t-xl">
            <button onclick="closeDishModal()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors border border-white/20">
                <i class="fa-solid fa-xmark text-sm"></i>
            </button>
            <div class="absolute bottom-3 left-3">
                <span class="px-2.5 py-0.5 rounded text-[11px] font-bold badge-signature shadow">
                    ${item.badge || item.categoryName}
                </span>
            </div>
            <div class="absolute bottom-3 right-3 font-arabic text-white text-xl drop-shadow">
                ${item.arabicName}
            </div>
        </div>
        
        <div class="p-5">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <h2 class="text-xl font-bold font-heading text-white">${item.name}</h2>
                    <p class="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider mt-0.5">${item.categoryName}</p>
                </div>
                <div class="text-right">
                    <span class="text-xl font-bold font-heading text-white">${state.currency}${portion.price}</span>
                    <span class="block text-[10px] text-zinc-400">${portion.name}</span>
                </div>
            </div>

            <div class="mt-3.5 p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                <h4 class="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Culinary Heritage:</h4>
                <p class="text-xs text-zinc-300 leading-relaxed">${item.longDescription}</p>
            </div>

            <!-- Portion Selector -->
            ${item.portions && item.portions.length > 1 ? `
                <div class="mt-3.5">
                    <label class="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">Select Portion / Serving:</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        ${item.portions.map((p, idx) => `
                            <button 
                                onclick="selectPortionFromModal('${item.id}', ${idx})"
                                class="p-2 rounded-lg border text-center transition-all ${idx === selectedPortionIdx ? 'border-white bg-white text-black font-bold' : 'border-neutral-800 bg-neutral-900 text-zinc-300 hover:border-neutral-700'}">
                                <div class="text-[11px]">${p.name}</div>
                                <div class="text-xs font-bold mt-0.5 ${idx === selectedPortionIdx ? 'text-black' : 'text-white'}">${state.currency}${p.price}</div>
                            </button>
                        `).join("")}
                    </div>
                </div>
            ` : ''}

            <!-- Quick Action Buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-5">
                <button 
                    onclick="addToCart('${item.id}'); closeDishModal();"
                    class="py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-neutral-700">
                    <i class="fa-solid fa-cart-plus text-xs"></i> Add to Order Cart
                </button>
                <button 
                    onclick="quickWhatsAppOrder('${item.id}'); closeDishModal();"
                    class="py-2.5 px-3 rounded-lg btn-whatsapp text-xs font-bold flex items-center justify-center gap-1.5 shadow">
                    <i class="fa-brands fa-whatsapp text-sm"></i> Order on WhatsApp
                </button>
            </div>
        </div>
    `;

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function selectPortionFromModal(itemId, portionIdx) {
    state.activePortions[itemId] = portionIdx;
    openDishModal(itemId);
    renderMenu();
}

function closeDishModal() {
    const modal = document.getElementById("dish-detail-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// -----------------------------------------------------------------------------
// RESTAURANT WHATSAPP NUMBER MANAGER (FOR OWNER / ADMIN)
// -----------------------------------------------------------------------------
function openWhatsAppManagerModal() {
    const modal = document.getElementById("admin-whatsapp-modal");
    if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        const input = document.getElementById("admin-whatsapp-input");
        if (input) input.value = state.whatsappNumber;
    }
}

function closeWhatsAppManagerModal() {
    const modal = document.getElementById("admin-whatsapp-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
}

function saveWhatsAppNumber() {
    const input = document.getElementById("admin-whatsapp-input");
    if (!input) return;

    let cleanNumber = input.value.replace(/\D/g, "");
    if (cleanNumber.length < 8) {
        alert("Please enter a valid phone number with country code (e.g. 919885196008).");
        return;
    }

    state.whatsappNumber = cleanNumber;
    localStorage.setItem("arabian_corner_whatsapp", cleanNumber);
    updateWhatsAppDisplay();
    closeWhatsAppManagerModal();
    showToast(`WhatsApp Number updated to +${cleanNumber}! All orders will now redirect here.`);
}

// -----------------------------------------------------------------------------
// REVIEWS & FAQS RENDERING - MONOCHROME WHITE & BLACK
// -----------------------------------------------------------------------------
function renderReviews() {
    const container = document.getElementById("reviews-container");
    if (!container) return;

    container.innerHTML = RESTAURANT_REVIEWS.map(rev => `
        <div class="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
                <div class="flex items-center gap-1 text-white text-xs mb-2.5">
                    ${Array(rev.rating).fill('<i class="fa-solid fa-star"></i>').join("")}
                </div>
                <p class="text-zinc-300 text-xs italic leading-relaxed">"${rev.review}"</p>
                <div class="mt-2.5 inline-block px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white text-[10px] font-semibold">
                    Ordered: ${rev.dish}
                </div>
            </div>
            
            <div class="flex items-center gap-2.5 mt-4 pt-3 border-t border-neutral-800">
                <img src="${rev.avatar}" alt="${rev.name}" class="w-8 h-8 rounded-full object-cover border border-white/30">
                <div>
                    <h4 class="text-xs font-semibold text-white">${rev.name}</h4>
                    <span class="text-[10px] text-zinc-400">${rev.date} • Verified Guest</span>
                </div>
            </div>
        </div>
    `).join("");
}

function renderFaqs() {
    const container = document.getElementById("faqs-container");
    if (!container) return;

    container.innerHTML = RESTAURANT_FAQS.map((faq, idx) => `
        <details class="group p-4 rounded-xl bg-neutral-900 border border-neutral-800 transition-all duration-200 open:border-white/40 open:bg-neutral-900/90">
            <summary class="flex justify-between items-center cursor-pointer list-none text-white font-semibold text-xs select-none">
                <span class="flex items-center gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold font-heading">
                        0${idx + 1}
                    </span>
                    ${faq.q}
                </span>
                <span class="transition-transform group-open:rotate-180 text-white ml-3">
                    <i class="fa-solid fa-chevron-down text-xs"></i>
                </span>
            </summary>
            <p class="mt-3 text-zinc-300 text-xs leading-relaxed pl-7">
                ${faq.a}
            </p>
        </details>
    `).join("");
}

    container.innerHTML = RESTAURANT_FAQS.map((faq, idx) => `
        <details class="group p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 transition-all duration-300 open:border-amber-500/30 open:bg-slate-900">
            <summary class="flex justify-between items-center cursor-pointer list-none text-slate-200 font-semibold text-base select-none">
                <span class="flex items-center gap-3">
                    <span class="w-6 h-6 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center text-xs font-bold font-heading">
                        0${idx + 1}
                    </span>
                    ${faq.q}
                </span>
                <span class="transition-transform group-open:rotate-180 text-amber-400 ml-4">
                    <i class="fa-solid fa-chevron-down text-sm"></i>
                </span>
            </summary>
            <p class="mt-4 text-slate-400 text-sm leading-relaxed pl-9">
                ${faq.a}
            </p>
        </details>
    `).join("");
}

// -----------------------------------------------------------------------------
// TOAST NOTIFICATIONS
// -----------------------------------------------------------------------------
function showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check text-amber-400 text-lg"></i>
        <div class="text-sm font-medium">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}
