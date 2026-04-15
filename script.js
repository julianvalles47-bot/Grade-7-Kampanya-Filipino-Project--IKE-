/* IKE - Ingatan ang Kultura at Edukasyon */

const BRAND_NAME = 'IKE';

const products = [
    { id: 1, name: 'Barong Casual Fusion', price: 890, category: 'barong', description: 'barong but make it pwedeng suotin araw araw. lightweight tasbreathable ung fabric khit mainit. perfect para sa school, sa work, or kung saan ka pa.', preserve: 'so ung Barong Tagalog, ung pinakamagandang depiction ng Filipino pride pra saken. dati laging naka-barong lang sa weddings tas happy tas pagkatapos nunambo nakatambak lang sa cabinet. then we thought, paano kung gawin naming everyday wear? tapos eto ung result. pwedeng mong i-rock kahit saan, araw araw. parang nandito pa rin ung delicate embroidery and see-through fabric feel, pero comfy na parang walang pinaiibigat.', colors: ['white', 'cream', 'beige'], sizes: ['S', 'M', 'L', 'XL'], image: 'assets/Barong.png' },
    { id: 2, name: 'Dreamweaver Dress', price: 1290, category: 'dress', description: 'inspired sa weaving patterns nxtin. kontemporaryo ung design pero kabulay sa tradisyon.', preserve: 'etong isa talgang hit ng iba. ung weaving patterns galing sa communities like Tboli/Tinalak, Ifugao/Inabel, at Aklan/Pina. generations na ung nagpasa neto, pero lately, nakikita na lang minsan museum or lumang photos. gusto naming ibalik, so ginawa naming dress na pwedeng magamit sa school events, formal occasions, or pag my date.', colors: ['cream', 'brown', 'burgundy'], sizes: ['S', 'M', 'L', 'XL'], image: 'assets/dreamweavertraditionalstyle.jpg' },
    { id: 3, name: 'Casual Indigenous Wear', price: 1890, category: 'casual', description: 'tradisyonal naFilipino clothing pero re-imagined pra masikip at pwde ikaw sa daily. barong meets streetwear vibes.', preserve: 'Filipiniana, pero pra everyday. ung old school way ng pag-dress ngtapos elegantly, ngayon pwedeng mong i-rock khit sa school or sa labas. traditional silhouettespero meets streetwear energy. hindi kana.required magformal lang para magsuot ng traditional, pwedeng casual lang tas lalabas.', colors: ['white', 'gray', 'cream'], sizes: ['S', 'M', 'L', 'XL'], image: 'assets/dreamweaverhoodieandshirt.jpg' },
    { id: 4, name: 'Weaver\'s Wrap Skirt', price: 690, category: 'bottom', description: 'inspired sa tradisyonal naFilipino wrap skirts. modern ung silhouette may woven pattern details.', preserve: ' ung Patadyong, ung tradisyonal wrap skirt nasuot ng mga lola natin dati. dati bago pa skinny jeans, eto ung go-to everyday wear sa provinces. usually gawa sa ikat or binubunteng weave. kinuha ung wrapping vibe pero in-adjust pra fit sa modern life. mas comfy pa nga.', colors: ['brown', 'cream', 'burgundy'], sizes: ['S', 'M', 'L', 'XL'], image: 'assets/weaverdress.jpg' }
];

let cart = JSON.parse(localStorage.getItem('ike_cart')) || [];
let currentProduct = null;
let selectedSize = 'M';
let selectedColor = 'black';

function saveCart() {
    localStorage.setItem('ike_cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count;
    });
}

function formatPrice(price) {
    return '₱' + price.toLocaleString();
}

function getProductById(id) {
    return products.find(p => p.id === id);
}

function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = productList.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 533%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22400%22 height=%22533%22/%3E%3Ctext fill=%22%23888%22 x=%22200%22 y=%22260%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22%3EImage Placeholder%3C/text%3E%3C/svg%3E'">
                <div class="quick-view"><span>Click to View</span></div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${formatPrice(product.price)}</p>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openProductPage(id);
        });
    });
}

function renderFeaturedProducts() {
    renderProducts(products.slice(0, 6), 'featured-products');
}

function filterProducts() {
    const category = document.getElementById('category-filter')?.value || 'all';
    const sort = document.getElementById('sort-filter')?.value || 'newest';
    const searchTerm = document.querySelector('.search-input')?.value.toLowerCase() || '';
    
    let filtered = [...products];
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (sort === 'low-high') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
        filtered.sort((a, b) => b.price - a.price);
    }
    
    renderProducts(filtered, 'products-grid');
}

function openProductPage(id) {
    currentProduct = getProductById(id);
    if (!currentProduct) return;
    
    selectedSize = currentProduct.sizes ? currentProduct.sizes[1] : 'M';
    selectedColor = currentProduct.colors[0];
    
    const container = document.getElementById('product-detail');
    container.innerHTML = `
        <div class="product-detail-image">
            <img src="${currentProduct.image}" alt="${currentProduct.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 533%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22400%22 height=%22533%22/%3E%3Ctext fill=%22%23888%22 x=%22200%22 y=%22260%22 text-anchor=%22middle%22 font-family=%22sans-serif%22 font-size=%2216%22%3EImage Placeholder%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="product-detail-info">
            <h1 class="product-detail-name">${currentProduct.name}</h1>
            <p class="product-detail-price">${formatPrice(currentProduct.price)}</p>
            <p class="product-detail-desc">${currentProduct.description}</p>
            <div class="preserve-info">
                <h4>ung history neto</h4>
                <p>${currentProduct.preserve}</p>
            </div>
            
            ${currentProduct.sizes ? `
            <div class="size-selection">
                <h4>Size</h4>
                <div class="size-options">
                    ${currentProduct.sizes.map(size => `
                        <div class="size-option ${size === selectedSize ? 'active' : ''}" data-size="${size}">${size}</div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="color-selection">
                <h4>Color</h4>
                <div class="color-options">
                    ${currentProduct.colors.map(color => `
                        <div class="color-option ${color} ${color === selectedColor ? 'active' : ''}" data-color="${color}" title="${color}"></div>
                    `).join('')}
                </div>
            </div>
            
            <button class="btn btn-primary btn-full add-to-cart" data-id="${currentProduct.id}">Add to Cart</button>
        </div>
    `;
    
    container.querySelectorAll('.size-option').forEach(opt => {
        opt.addEventListener('click', () => {
            container.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedSize = opt.dataset.size;
        });
    });
    
    container.querySelectorAll('.color-option').forEach(opt => {
        opt.addEventListener('click', () => {
            container.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedColor = opt.dataset.color;
        });
    });
    
    container.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(currentProduct.id);
    });
    
    const related = products.filter(p => p.id !== id && p.category === currentProduct.category).slice(0, 4);
    if (related.length < 4) {
        const others = products.filter(p => p.id !== id);
        related.push(...others.slice(0, 4 - related.length));
    }
    renderProducts(related, 'related-products');
    
    navigateTo('product');
}

function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === selectedSize && 
        item.color === selectedColor
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity
        });
    }
    
    saveCart();
    
    document.querySelectorAll('.cart-count').forEach(el => {
        el.style.transform = 'scale(1.3)';
        setTimeout(() => el.style.transform = 'scale(1)', 200);
    });
}

function renderCart() {
    const itemsContainer = document.getElementById('cart-items');
    const content = document.getElementById('cart-content');
    const empty = document.getElementById('cart-empty');
    
    if (cart.length === 0) {
        content.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    content.style.display = 'grid';
    empty.style.display = 'none';
    
    let subtotal = 0;
    
    itemsContainer.innerHTML = cart.map((item, index) => {
        const product = getProductById(item.id);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 160%22%3E%3Crect fill=%22%23f5f5f5%22 width=%22120%22 height=%22160%22/%3E%3C/svg%3E'">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <p class="cart-item-variant">${item.color.charAt(0).toUpperCase() + item.color.slice(1)} / ${item.size}</p>
                    <p class="cart-item-price">${formatPrice(product.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="qty-minus">−</button>
                        <span>${item.quantity}</span>
                        <button class="qty-plus">+</button>
                    </div>
                    <button class="remove-btn">Remove</button>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('cart-total').textContent = formatPrice(subtotal);
    document.getElementById('checkout-total').textContent = formatPrice(subtotal);
    
    itemsContainer.querySelectorAll('.cart-item').forEach(itemEl => {
        const index = parseInt(itemEl.dataset.index);
        
        itemEl.querySelector('.qty-plus').addEventListener('click', () => {
            cart[index].quantity++;
            saveCart();
            renderCart();
        });
        
        itemEl.querySelector('.qty-minus').addEventListener('click', () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            saveCart();
            renderCart();
        });
        
        itemEl.querySelector('.remove-btn').addEventListener('click', () => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        });
    });
}

function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    document.querySelector('.mobile-menu')?.classList.remove('active');
    
    if (pageId === 'shop') {
        filterProducts();
    } else if (pageId === 'cart') {
        renderCart();
    } else if (pageId === 'home') {
        renderFeaturedProducts();
    } else if (pageId === 'product' && currentProduct) {
        openProductPage(currentProduct.id);
    }
}

function initNavigation() {
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });
    
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            document.getElementById('category-filter').value = category;
            navigateTo('shop');
            filterProducts();
        });
    });
}

function initFilters() {
    document.getElementById('category-filter')?.addEventListener('change', filterProducts);
    document.getElementById('sort-filter')?.addEventListener('change', filterProducts);
    
    document.querySelector('.search-input')?.addEventListener('input', filterProducts);
}

function initCheckout() {
    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        document.getElementById('checkout-content').style.display = 'none';
        document.getElementById('checkout-success').style.display = 'block';
        
        cart = [];
        saveCart();
    });
}

function initContact() {
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
}

function initNewsletter() {
    document.getElementById('newsletter-submit')?.addEventListener('click', () => {
        const email = document.getElementById('newsletter-email').value;
        if (email) {
            alert('Thank you for subscribing!');
            document.getElementById('newsletter-email').value = '';
        }
    });
}

function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    
    btn?.addEventListener('click', () => {
        menu.classList.toggle('active');
        
        const spans = btn.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFilters();
    initCheckout();
    initContact();
    initNewsletter();
    initMobileMenu();
    initScrollEffects();
    updateCartCount();
    renderFeaturedProducts();
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    if (productId) {
        openProductPage(parseInt(productId));
    }
});