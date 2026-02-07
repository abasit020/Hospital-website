document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.querySelector('.ue-menu-grid');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('ue-overlay');
    const cartItemsList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.ue-btn-checkout');

    let cart = [];
    let menuItems = [];

    // Initialize Menu
    async function fetchMenu() {
        try {
            const response = await fetch('/api/menu');
            if (!response.ok) throw new Error('Failed to fetch menu');
            menuItems = await response.json();
            renderMenu(menuItems);
        } catch (error) {
            console.error('Error fetching menu:', error);
            menuGrid.innerHTML = '<p>Unable to load menu. Please check your database connection.</p>';
        }
    }

    function renderMenu(items) {
        menuGrid.innerHTML = '';
        if (items.length === 0) {
            menuGrid.innerHTML = '<p>The menu is currently empty.</p>';
            return;
        }
        items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'ue-menu-item';
            itemElement.style.animationDelay = `${index * 0.1}s`;
            itemElement.innerHTML = `
                <div class="ue-item-details">
                    <h3 class="ue-item-name">${item.name}</h3>
                    <p class="ue-item-price">GHS ${item.price.toFixed(2)}</p>
                </div>
                <div class="ue-item-image">
                    <img src="${item.image_url || 'https://via.placeholder.com/120'}" alt="${item.name}">
                </div>
            `;
            itemElement.addEventListener('click', () => addToCart(item));
            menuGrid.appendChild(itemElement);
        });
    }

    // Cart Logic
    function addToCart(item) {
        const existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartUI();
        openCart();
    }

    function removeFromCart(itemId) {
        cart = cart.filter(i => i.id !== itemId);
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="ue-empty-msg">Add items to start a basket</p>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                count += item.quantity;

                const cartItem = document.createElement('div');
                cartItem.className = 'ue-cart-item-row';
                cartItem.style.display = 'flex';
                cartItem.style.justifyContent = 'space-between';
                cartItem.style.alignItems = 'center';
                cartItem.style.marginBottom = '16px';
                cartItem.innerHTML = `
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <span style="font-weight: 600; background: #eee; padding: 2px 8px; border-radius: 4px;">${item.quantity}</span>
                        <div>
                            <p style="font-weight: 600; font-size: 14px;">${item.name}</p>
                            <p style="font-size: 12px; color: #666;">GHS ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <span style="font-weight: 500;">GHS ${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-item" data-id="${item.id}" style="background:none; border:none; cursor:pointer; color:#06C167; font-weight:600;">Remove</button>
                    </div>
                `;
                cartItemsList.appendChild(cartItem);
            });
        }

        cartCount.textContent = count;
        cartTotal.textContent = `GHS ${total.toFixed(2)}`;

        // Attach remove events
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                removeFromCart(id);
            });
        });
    }

    function openCart() {
        cartSidebar.classList.add('open');
        overlay.classList.add('visible');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('visible');
    }

    // Checkout Logic
    async function handleCheckout() {
        if (cart.length === 0) return;

        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Processing...';

        const totalValue = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_name: 'Guest Customer',
                    total: totalValue, // Matches schema 'total'
                    items: cart
                })
            });

            if (response.ok) {
                alert('Order placed successfully!');
                cart = [];
                updateCartUI();
                closeCart();
            } else {
                const err = await response.json();
                throw new Error(err.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed: ' + error.message);
        } finally {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Go to checkout';
        }
    }

    // Event Listeners
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', handleCheckout);

    // Initial load
    fetchMenu();
});
