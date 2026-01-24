document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.querySelector('.menu-grid');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const cartToggle = document.getElementById('cart-toggle');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = [];
    let menuItems = [];

    // Fetch Menu Items from Backend
    async function fetchMenu() {
        try {
            const response = await fetch('/api/menu');
            const data = await response.json();

            // Fallback to defaults if DB is empty/not setup
            if (!data || data.length === 0 || data.error) {
                console.warn('Using fallback menu data');
                menuItems = [
                    { id: 1, name: 'Matcha Meadow', price: 40, image: 'https://images.unsplash.com/photo-1627847483517-5a5744c4ec3c?q=80&w=400' },
                    { id: 2, name: 'Taro Cloud', price: 40, image: 'https://images.unsplash.com/photo-1619158403521-ed9795026d47?q=80&w=400' },
                    { id: 3, name: 'Green Zenith', price: 40, image: 'https://images.unsplash.com/photo-1515442261904-6c3e7c30a781?q=80&w=400' },
                    { id: 4, name: 'The Classic Tee', price: 40, image: 'https://images.unsplash.com/photo-1558857563-b371f30ca6a5?q=80&w=400' }
                ];
            } else {
                menuItems = data;
            }
            renderMenu();
        } catch (err) {
            console.error('Error fetching menu:', err);
        }
    }

    function renderMenu() {
        menuGrid.innerHTML = '';
        menuItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p class="price">GHS ${parseFloat(item.price).toFixed(2)}</p>
                    <button class="btn add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            `;
            menuGrid.appendChild(itemElement);
        });

        // Re-attach listeners for new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const item = menuItems.find(i => i.id == id);
                addToCart(item);
            });
        });
    }

    // Toggle Cart
    cartToggle.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });

    function addToCart(item) {
        const existingItem = cart.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
        } else {
            cartItemsContainer.innerHTML = '';
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>GHS ${parseFloat(item.price).toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" data-id="${item.id}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.textContent = `GHS ${total.toFixed(2)}`;

        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = count;

        // Add event listeners for quantity buttons
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = btn.getAttribute('data-id');
                if (btn.classList.contains('plus')) {
                    updateQuantity(id, 1);
                } else {
                    updateQuantity(id, -1);
                }
            });
        });
    }

    function updateQuantity(id, delta) {
        const item = cart.find(i => i.id == id);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id != id);
            }
            updateCartDisplay();
        }
    }

    // Checkout
    checkoutBtn.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, total })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Order placed successfully!');
                cart = [];
                updateCartDisplay();
                cartOverlay.classList.remove('active');
            } else {
                alert('Failed to place order: ' + result.error);
            }
        } catch (err) {
            console.error('Error during checkout:', err);
            alert('Checkout failed. Please try again.');
        }
    });

    // Initial Fetch
    fetchMenu();
});
