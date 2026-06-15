// Data Management System
class DeliveryApp {
    constructor() {
        this.menuItems = [
            {
                id: 1,
                name: 'ข้าวผัดกุ้ง',
                description: 'ข้าวผัดกุ้งสด เสิร์ฟพร้อมผักและไข่ดาว',
                price: 120,
                category: 'main',
                emoji: '🍤'
            },
            {
                id: 2,
                name: 'ผัดไทย',
                description: 'ผัดไทยแท้ รสชาติดั้งเดิม หอมหวานเปรียวอร่อย',
                price: 90,
                category: 'main',
                emoji: '🍜'
            },
            {
                id: 3,
                name: 'ส้มตำ',
                description: 'ส้มตำไทย เผ็ดร้อน เสิร์ฟพร้อมผักสด',
                price: 70,
                category: 'main',
                emoji: '🥗'
            },
            {
                id: 4,
                name: 'แกงเขียวหวานไก่',
                description: 'แกงเขียวหวานไก่ เสิร์ฟพร้อมข้าวสวย',
                price: 150,
                category: 'main',
                emoji: '🍛'
            },
            {
                id: 5,
                name: 'ต้มยำกุ้ง',
                description: 'ต้มยำกุ้งน้ำใส รสเปรียว เผ็ดร้อน',
                price: 180,
                category: 'main',
                emoji: '🍲'
            },
            {
                id: 6,
                name: 'ข้าวเหนียวมะม่วง',
                description: 'ข้าวเหนียวมะม่วงสุก หวานหอม',
                price: 80,
                category: 'dessert',
                emoji: '🥭'
            },
            {
                id: 7,
                name: 'ทับทิมกรอบ',
                description: 'ทับทิมกรอบ เสิร์ฟเย็น หวานสดชื่น',
                price: 60,
                category: 'dessert',
                emoji: '🧊'
            },
            {
                id: 8,
                name: 'โดนัท',
                description: 'โดนัทสดใหม่ หลากหลายรสชาติ',
                price: 45,
                category: 'dessert',
                emoji: '🍩'
            },
            {
                id: 9,
                name: 'ชาเย็น',
                description: 'ชาเย็นแท้ หอมหวาน สดชื่น',
                price: 35,
                category: 'drink',
                emoji: '🧋'
            },
            {
                id: 10,
                name: 'กาแฟเย็น',
                description: 'กาแฟเย็น เข้มข้น หอมกรุ่น',
                price: 40,
                category: 'drink',
                emoji: '☕'
            },
            {
                id: 11,
                name: 'น้ำส้มคั้นสด',
                description: 'น้ำส้มคั้นสด 100% ไม่ใส่น้ำตาล',
                price: 50,
                category: 'drink',
                emoji: '🍊'
            },
            {
                id: 12,
                name: 'สมูทตี้มะม่วง',
                description: 'สมูทตี้มะม่วงสด เข้มข้น หวานหอม',
                price: 65,
                category: 'drink',
                emoji: '🥤'
            }
        ];
        
        this.cart = [];
        this.deliveryFee = 30;
        this.currentCategory = 'all';
        
        this.init();
    }

    init() {
        this.renderMenu();
        this.updateCartDisplay();
        this.bindEvents();
    }

    // Menu Management Algorithm
    renderMenu(category = 'all') {
        const menuGrid = document.getElementById('menu-grid');
        const filteredItems = category === 'all' 
            ? this.menuItems 
            : this.menuItems.filter(item => item.category === category);

        if (filteredItems.length === 0) {
            menuGrid.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🍽️</div>
                    <p>ไม่มีเมนูในหมวดหมู่นี้</p>
                </div>
            `;
            return;
        }

        menuGrid.innerHTML = filteredItems.map(item => `
            <div class="menu-item slide-in" data-category="${item.category}">
                <div class="menu-item-image">
                    ${item.emoji}
                </div>
                <div class="menu-item-content">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-footer">
                        <span class="menu-item-price">฿${item.price}</span>
                        <button class="add-to-cart-btn" onclick="app.addToCart(${item.id})">
                            เพิ่มลงตะกร้า
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Cart Management Algorithm
    addToCart(itemId) {
        const item = this.menuItems.find(item => item.id === itemId);
        const existingItem = this.cart.find(cartItem => cartItem.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...item,
                quantity: 1
            });
        }

        this.updateCartDisplay();
        this.showCartAnimation();
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartDisplay();
    }

    updateQuantity(itemId, change) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(itemId);
            } else {
                this.updateCartDisplay();
            }
        }
    }

    // Cart Display Management
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const subtotal = document.getElementById('subtotal');
        const total = document.getElementById('total');

        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const subtotalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = subtotalAmount + (this.cart.length > 0 ? this.deliveryFee : 0);

        cartCount.textContent = totalItems;
        subtotal.textContent = `฿${subtotalAmount}`;
        total.textContent = `฿${totalAmount}`;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>ตะกร้าของคุณว่างเปล่า</p>
                    <p>เริ่มสั่งอาหารกันเลย!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">฿${item.price}</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }

    // Filter Algorithm
    filterMenu(category) {
        this.currentCategory = category;
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        this.renderMenu(category);
    }

    // UI Animation Effects
    showCartAnimation() {
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }

    // Cart Sidebar Management
    toggleCart() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('overlay');
        
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    }

    // Checkout Process Algorithm
    showCheckout() {
        if (this.cart.length === 0) {
            alert('กรุณาเพิ่มสินค้าในตะกร้าก่อนสั่งซื้อ');
            return;
        }

        const modal = document.getElementById('checkout-modal');
        const overlay = document.getElementById('overlay');
        const orderSummary = document.getElementById('order-summary-items');
        const checkoutTotal = document.getElementById('checkout-total');

        const subtotalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = subtotalAmount + this.deliveryFee;

        orderSummary.innerHTML = this.cart.map(item => `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>${item.name} x ${item.quantity}</span>
                <span>฿${item.price * item.quantity}</span>
            </div>
        `).join('') + `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>ค่าจัดส่ง</span>
                <span>฿${this.deliveryFee}</span>
            </div>
        `;

        checkoutTotal.textContent = `฿${totalAmount}`;

        modal.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeCheckout() {
        const modal = document.getElementById('checkout-modal');
        const overlay = document.getElementById('overlay');
        
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Order Processing Algorithm
    processOrder(formData) {
        // Generate order number
        const orderNumber = 'QE' + Date.now().toString().slice(-6);
        
        // Simulate order processing
        const orderData = {
            orderNumber: orderNumber,
            items: [...this.cart],
            customer: formData,
            subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            deliveryFee: this.deliveryFee,
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + this.deliveryFee,
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };

        // Store order (in real app, this would be sent to server)
        console.log('Order processed:', orderData);

        // Clear cart
        this.cart = [];
        this.updateCartDisplay();

        // Show success message
        this.showOrderSuccess(orderNumber);

        return orderData;
    }

    showOrderSuccess(orderNumber) {
        const modal = document.getElementById('checkout-modal');
        const successModal = document.getElementById('success-modal');
        const orderNumberSpan = document.getElementById('order-number');

        modal.classList.remove('show');
        successModal.classList.add('show');
        orderNumberSpan.textContent = orderNumber;

        // Close cart sidebar
        document.getElementById('cart-sidebar').classList.remove('open');
    }

    closeSuccess() {
        const successModal = document.getElementById('success-modal');
        const overlay = document.getElementById('overlay');
        
        successModal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Form Validation Algorithm
    validateForm(formData) {
        const errors = [];

        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('กรุณากรอกชื่อ-นามสกุล (อย่างน้อย 2 ตัวอักษร)');
        }

        if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone.replace(/-/g, ''))) {
            errors.push('กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (10 หลัก)');
        }

        if (!formData.address || formData.address.trim().length < 10) {
            errors.push('กรุณากรอกที่อยู่ให้ละเอียด (อย่างน้อย 10 ตัวอักษร)');
        }

        if (!formData.paymentMethod) {
            errors.push('กรุณาเลือกวิธีการชำระเงิน');
        }

        return errors;
    }

    // Event Binding
    bindEvents() {
        // Checkout form submission
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone').value,
                address: document.getElementById('customer-address').value,
                paymentMethod: document.getElementById('payment-method').value,
                specialNotes: document.getElementById('special-notes').value
            };

            const errors = this.validateForm(formData);
            
            if (errors.length > 0) {
                alert('กรุณาตรวจสอบข้อมูล:\n' + errors.join('\n'));
                return;
            }

            // Show loading state
            const submitBtn = document.querySelector('.submit-order-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'กำลังประมวลผล...';
            submitBtn.disabled = true;

            // Simulate processing delay
            setTimeout(() => {
                this.processOrder(formData);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                document.getElementById('checkout-form').reset();
            }, 2000);
        });

        // Close modals when clicking overlay
        document.getElementById('overlay').addEventListener('click', () => {
            this.closeCheckout();
            this.closeSuccess();
            this.toggleCart();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCheckout();
                this.closeSuccess();
                if (document.getElementById('cart-sidebar').classList.contains('open')) {
                    this.toggleCart();
                }
            }
        });

        // Back to Top Button
        const backToTopBtn = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Global Functions (for onclick handlers)
function toggleCart() {
    app.toggleCart();
}

function filterMenu(category) {
    app.filterMenu(category);
}

function showCheckout() {
    app.showCheckout();
}

function closeCheckout() {
    app.closeCheckout();
}

function closeSuccess() {
    app.closeSuccess();
}

// Initialize Application
const app = new DeliveryApp();

// Additional Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB'
    }).format(amount);
}

function getCurrentTime() {
    return new Date().toLocaleString('th-TH');
}

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('.menu-item-image');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundImage = `linear-gradient(45deg, #ff6b35, #ff8e53)`;
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);