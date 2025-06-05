 // Variables globales
        let cart = [];
        let currentStep = 1;
        let selectedDeliveryMethod = '';
        
        // Elementos del DOM
        const cartBtn = document.getElementById('cart-btn');
        const cartOverlay = document.getElementById('cart-overlay');
        const closeCart = document.getElementById('close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.querySelector('.cart-count');
        const checkoutBtn = document.getElementById('checkout-btn');
        const checkoutOverlay = document.getElementById('checkout-overlay');
        const checkoutForm = document.getElementById('checkout-form');
        const btnNext = document.getElementById('btn-next');
        const btnBack = document.getElementById('btn-back');
        const confirmOrder = document.getElementById('confirm-order');
        const ticketOverlay = document.getElementById('ticket-overlay');
        const downloadTicket = document.getElementById('download-ticket');
        const homePage = document.getElementById('home-page');
        const categoryPages = document.getElementById('category-pages');
        const navLinks = document.querySelectorAll('.nav-link');
        const categoryCards = document.querySelectorAll('.category-card');
        const backToHomeLinks = document.querySelectorAll('.back-to-home');
        const deliveryMethods = document.querySelectorAll('.delivery-method');
        const deliveryAddressFields = document.getElementById('delivery-address-fields');
        const feedbackForm = document.getElementById('feedback-form');
        
        // Datos de productos (simulados)
        const products = {
            all: generateProducts(10, 'all'),
            women: generateProducts(50, 'women'),
            men: generateProducts(50, 'men'),
            kids: generateProducts(50, 'kids'),
            accessories: generateProducts(50, 'accessories'),
            shoes: generateProducts(50, 'shoes'),
            offers: generateProducts(50, 'offers')
        };
        
        // Función para generar productos ficticios
        function generateProducts(count, category) {
            const categories = {
                women: ['Vestido', 'Blusa', 'Falda', 'Jeans', 'Abrigo', 'Top', 'Short', 'Chamarra'],
                men: ['Camisa', 'Pantalón', 'Sudadera', 'Chaqueta', 'Jeans', 'Playera', 'Short', 'Chaleco'],
                kids: ['Vestido', 'Playera', 'Pantalón', 'Chamarra', 'Falda', 'Short', 'Sudadera', 'Pijama'],
                accessories: ['Bolso', 'Cinturón', 'Gorra', 'Bufanda', 'Lentes', 'Collar', 'Reloj', 'Sombrero'],
                shoes: ['Tenis', 'Zapatillas', 'Botas', 'Sandalias', 'Tacones', 'Mocasines', 'Zapatos formales', 'Chanclas'],
                offers: ['Oferta Especial', 'Descuento', 'Liquidación', 'Promoción', 'Pack', 'Combo', 'Edición Limitada', 'Últimas Unidades']
            };
            
            const adjectives = ['Elegante', 'Moderno', 'Cómodo', 'Estiloso', 'Fashion', 'Exclusivo', 'Premium', 'Básico'];
            const colors = ['Negro', 'Blanco', 'Azul', 'Rojo', 'Verde', 'Rosa', 'Gris', 'Beige'];
            
            const result = [];
            
            for(let i = 1; i <= count; i++) {
                let name, price, discount;
                
                if(category === 'all') {
                    // Mezclar productos de todas las categorías
                    const randomCategory = Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)];
                    const type = categories[randomCategory][Math.floor(Math.random() * categories[randomCategory].length)];
                    name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${type} ${colors[Math.floor(Math.random() * colors.length)]}`;
                } else {
                    const type = categories[category][Math.floor(Math.random() * categories[category].length)];
                    name = `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${type} ${colors[Math.floor(Math.random() * colors.length)]}`;
                }
                
                // Precios aleatorios con algunos en oferta
                if(Math.random() > 0.7 && category !== 'offers') {
                    const originalPrice = Math.floor(Math.random() * 100) + 20;
                    discount = Math.floor(Math.random() * 50) + 10;
                    price = originalPrice - (originalPrice * discount / 100);
                } else if(category === 'offers') {
                    const originalPrice = Math.floor(Math.random() * 100) + 20;
                    discount = Math.floor(Math.random() * 70) + 20;
                    price = originalPrice - (originalPrice * discount / 100);
                } else {
                    price = Math.floor(Math.random() * 80) + 10;
                    discount = 0;
                }
                
                // Imágenes aleatorias de Unsplash basadas en categoría
                let imageUrl;
                switch(category) {
                    case 'women':
                        imageUrl = `https://source.unsplash.com/random/300x400/?women,fashion,clothing,dress,${i}`;
                        break;
                    case 'men':
                        imageUrl = `https://source.unsplash.com/random/300x400/?men,fashion,clothing,shirt,${i}`;
                        break;
                    case 'kids':
                        imageUrl = `https://source.unsplash.com/random/300x400/?kids,fashion,clothing,children,${i}`;
                        break;
                    case 'accessories':
                        imageUrl = `https://source.unsplash.com/random/300x400/?accessories,bag,hat,jewelry,${i}`;
                        break;
                    case 'shoes':
                        imageUrl = `https://source.unsplash.com/random/300x400/?shoes,sneakers,boots,heels,${i}`;
                        break;
                    case 'offers':
                        imageUrl = `https://source.unsplash.com/random/300x400/?sale,discount,offer,${i}`;
                        break;
                    default:
                        imageUrl = `https://source.unsplash.com/random/300x400/?fashion,clothing,${i}`;
                }
                
                result.push({
                    id: `${category}-${i}`,
                    name: name,
                    price: price,
                    discount: discount,
                    image: imageUrl,
                    category: category
                });
            }
            
            return result;
        }
        
        // Función para renderizar productos
        function renderProducts(products, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.id = product.id;
                productCard.dataset.name = product.name;
                productCard.dataset.price = product.price.toFixed(2);
                productCard.dataset.image = product.image;
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.discount > 0 ? `<span class="discount-badge">-${product.discount}%</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.discount > 0 ? `<span class="original-price">$${(product.price / (1 - product.discount/100)).toFixed(2)}</span>` : ''}
                        </div>
                        <button class="add-to-cart">Añadir al carrito</button>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
            
            // Añadir event listeners a los botones de añadir al carrito
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        }
        
        // Event listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Cargar carrito desde localStorage si existe
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                updateCart();
            }
            
            // Renderizar productos iniciales
            renderProducts(products.all, 'product-grid');
            
            // Navegación por categorías
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.dataset.category;
                    
                    if(category === 'all') {
                        homePage.style.display = 'block';
                        categoryPages.style.display = 'none';
                        renderProducts(products.all, 'product-grid');
                    } else {
                        homePage.style.display = 'none';
                        categoryPages.style.display = 'block';
                        
                        // Ocultar todas las páginas de categoría
                        document.querySelectorAll('.category-page').forEach(page => {
                            page.style.display = 'none';
                        });
                        
                        // Mostrar la categoría seleccionada
                        document.getElementById(`${category}-page`).style.display = 'block';
                        
                        // Renderizar productos de la categoría
                        renderProducts(products[category], `${category}-products`);
                    }
                    
                    // Marcar como activo
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Tarjetas de categoría
            categoryCards.forEach(card => {
                card.addEventListener('click', function() {
                    const category = this.dataset.category;
                    const link = document.querySelector(`.nav-link[data-category="${category}"]`);
                    link.click();
                });
            });
            
            // Volver al inicio
            backToHomeLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    homePage.style.display = 'block';
                    categoryPages.style.display = 'none';
                    document.querySelector('.nav-link[data-category="all"]').click();
                });
            });
            
            // Carrito
            cartBtn.addEventListener('click', openCart);
            closeCart.addEventListener('click', closeCartFunc);
            checkoutBtn.addEventListener('click', openCheckout);
            
            // Checkout
            btnNext.addEventListener('click', nextStep);
            btnBack.addEventListener('click', prevStep);
            confirmOrder.addEventListener('click', completeOrder);
            
            // Métodos de entrega
            deliveryMethods.forEach(method => {
                method.addEventListener('click', selectDeliveryMethod);
            });
            
            // Métodos de pago
            const paymentMethods = document.querySelectorAll('.payment-method');
            paymentMethods.forEach(method => {
                method.addEventListener('click', selectPaymentMethod);
            });
            
            // Ticket
            downloadTicket.addEventListener('click', generatePDF);
            
            // Formulario de comentarios
            feedbackForm.addEventListener('submit', submitFeedback);
        });
        
        // Funciones del carrito
        function addToCart(e) {
            const button = e.target;
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            const productImage = productCard.dataset.image;
            
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === productId);
            
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            updateCart();
            showAddedToCart(productName);
        }
        
        function updateCart() {
            // Guardar carrito en localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Actualizar contador del carrito
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Actualizar lista de productos en el carrito
            cartItemsContainer.innerHTML = '';
            
            if(cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
                cartTotal.textContent = '0.00';
                return;
            }
            
            let total = 0;
            
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <p class="cart-item-remove" data-id="${item.id}">Eliminar</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="text" class="quantity-input" value="${item.quantity}" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
                total += item.price * item.quantity;
            });
            
            // Actualizar total
            cartTotal.textContent = total.toFixed(2);
            
            // Añadir event listeners a los botones de cantidad y eliminar
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', updateQuantity);
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', updateQuantityInput);
            });
            
            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }
        
        function updateQuantity(e) {
            const button = e.target;
            const id = button.dataset.id;
            const item = cart.find(item => item.id === id);
            
            if(button.classList.contains('plus')) {
                item.quantity += 1;
            } else if(button.classList.contains('minus')) {
                if(item.quantity > 1) {
                    item.quantity -= 1;
                }
            }
            
            updateCart();
        }
        
        function updateQuantityInput(e) {
            const input = e.target;
            const id = input.dataset.id;
            const item = cart.find(item => item.id === id);
            const newQuantity = parseInt(input.value);
            
            if(newQuantity > 0) {
                item.quantity = newQuantity;
                updateCart();
            } else {
                input.value = item.quantity;
            }
        }
        
        function removeItem(e) {
            const button = e.target;
            const id = button.dataset.id;
            
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
        
        function showAddedToCart(productName) {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#4CAF50';
            notification.style.color = 'white';
            notification.style.padding = '15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '1000';
            notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            notification.innerHTML = `¡${productName} añadido al carrito!`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 2000);
        }
        
        function openCart() {
            cartOverlay.style.display = 'flex';
        }
        
        function closeCartFunc() {
            cartOverlay.style.display = 'none';
        }
        
        // Funciones del checkout
        function openCheckout() {
            if(cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            closeCartFunc();
            checkoutOverlay.style.display = 'flex';
            
            // Actualizar resumen del pedido
            updateOrderSummary();
        }
        
        function nextStep() {
            if(currentStep === 1) {
                // Validar información del cliente
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                
                if(!name || !email || !phone) {
                    alert('Por favor completa todos los campos obligatorios');
                    return;
                }
                
                // Validar dirección si es envío a domicilio
                if(selectedDeliveryMethod === 'delivery') {
                    const address = document.getElementById('address').value;
                    const city = document.getElementById('city').value;
                    const zip = document.getElementById('zip').value;
                    
                    if(!address || !city || !zip) {
                        alert('Por favor completa todos los campos de dirección');
                        return;
                    }
                }
                
                document.getElementById('step-1').style.display = 'none';
                document.getElementById('step-2').style.display = 'block';
                document.querySelector(`.step[data-step="1"]`).classList.remove('active');
                document.querySelector(`.step[data-step="2"]`).classList.add('active');
                btnBack.style.display = 'block';
                currentStep = 2;
            } else if(currentStep === 2) {
                // Validar método de pago
                const selectedMethod = document.querySelector('.payment-method.selected');
                
                if(!selectedMethod) {
                    alert('Por favor selecciona un método de pago');
                    return;
                }
                
                if(selectedMethod.dataset.method === 'card') {
                    const cardNumber = document.getElementById('card-number').value;
                    const cardName = document.getElementById('card-name').value;
                    const cardExpiry = document.getElementById('card-expiry').value;
                    const cardCvv = document.getElementById('card-cvv').value;
                    
                    if(!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                        alert('Por favor completa todos los campos de la tarjeta');
                        return;
                    }
                }
                
                document.getElementById('step-2').style.display = 'none';
                document.getElementById('step-3').style.display = 'block';
                document.querySelector(`.step[data-step="2"]`).classList.remove('active');
                document.querySelector(`.step[data-step="3"]`).classList.add('active');
                btnNext.style.display = 'none';
                currentStep = 3;
                
                // Mostrar información de entrega
                const deliveryMethod = document.querySelector('.delivery-method.selected').textContent.trim();
                document.getElementById('selected-delivery-method').textContent = deliveryMethod;
                
                if(selectedDeliveryMethod === 'delivery') {
                    const name = document.getElementById('name').value;
                    const address = document.getElementById('address').value;
                    const city = document.getElementById('city').value;
                    const zip = document.getElementById('zip').value;
                    document.getElementById('delivery-address').textContent = `${name}, ${address}, ${city}, ${zip}`;
                } else {
                    document.getElementById('delivery-address').textContent = 'Recoger en tienda: Calle Moda 123, Colonia Centro, Ciudad de México';
                }
                
                // Mostrar información de pago
                const paymentMethod = document.querySelector('.payment-method.selected').textContent.trim();
                document.getElementById('selected-payment-method').textContent = paymentMethod;
            }
        }
        
        function prevStep() {
            if(currentStep === 2) {
                document.getElementById('step-2').style.display = 'none';
                document.getElementById('step-1').style.display = 'block';
                document.querySelector(`.step[data-step="2"]`).classList.remove('active');
                document.querySelector(`.step[data-step="1"]`).classList.add('active');
                btnBack.style.display = 'none';
                currentStep = 1;
            } else if(currentStep === 3) {
                document.getElementById('step-3').style.display = 'none';
                document.getElementById('step-2').style.display = 'block';
                document.querySelector(`.step[data-step="3"]`).classList.remove('active');
                document.querySelector(`.step[data-step="2"]`).classList.add('active');
                btnNext.style.display = 'block';
                currentStep = 2;
            }
        }
        
        function selectDeliveryMethod(e) {
            const method = e.currentTarget;
            
            document.querySelectorAll('.delivery-method').forEach(m => {
                m.classList.remove('selected');
            });
            
            method.classList.add('selected');
            selectedDeliveryMethod = method.dataset.method;
            
            // Mostrar/ocultar campos de dirección
            if(selectedDeliveryMethod === 'delivery') {
                deliveryAddressFields.style.display = 'block';
                document.getElementById('address').required = true;
                document.getElementById('city').required = true;
                document.getElementById('zip').required = true;
            } else {
                deliveryAddressFields.style.display = 'none';
                document.getElementById('address').required = false;
                document.getElementById('city').required = false;
                document.getElementById('zip').required = false;
            }
        }
        
        function selectPaymentMethod(e) {
            const method = e.currentTarget;
            
            document.querySelectorAll('.payment-method').forEach(m => {
                m.classList.remove('selected');
            });
            
            method.classList.add('selected');
            
            // Mostrar/ocultar detalles de tarjeta
            if(method.dataset.method === 'card') {
                document.getElementById('card-details').style.display = 'block';
            } else {
                document.getElementById('card-details').style.display = 'none';
            }
        }
        
        function updateOrderSummary() {
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = selectedDeliveryMethod === 'delivery' ? 5.00 : 0;
            const total = subtotal + shipping;
            
            document.getElementById('order-subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('order-shipping').textContent = `$${shipping.toFixed(2)}`;
            document.getElementById('order-total').textContent = `$${total.toFixed(2)}`;
        }
        
        function completeOrder() {
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora solo mostraremos el ticket
            
            // Generar número de pedido aleatorio
            const orderNumber = 'FS-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
            
            // Obtener fecha actual
            const today = new Date();
            const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
            
            // Obtener información del cliente
            const name = document.getElementById('name').value;
            const deliveryMethod = document.querySelector('.delivery-method.selected').textContent.trim();
            const paymentMethod = document.querySelector('.payment-method.selected').textContent.trim();
            
            // Calcular total
            const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const shipping = selectedDeliveryMethod === 'delivery' ? 5.00 : 0;
            const total = subtotal + shipping;
            
            // Actualizar ticket
            document.getElementById('ticket-number').textContent = orderNumber;
            document.getElementById('ticket-date').textContent = date;
            document.getElementById('ticket-customer').textContent = name;
            document.getElementById('ticket-delivery').textContent = deliveryMethod;
            document.getElementById('ticket-payment').textContent = paymentMethod;
            document.getElementById('ticket-total').textContent = total.toFixed(2);
            
            // Añadir productos al ticket
            const ticketItems = document.getElementById('ticket-items');
            ticketItems.innerHTML = '';
            
            cart.forEach(item => {
                const ticketItem = document.createElement('div');
                ticketItem.className = 'ticket-item';
                ticketItem.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                ticketItems.appendChild(ticketItem);
            });
            
            // Mostrar ticket
            checkoutOverlay.style.display = 'none';
            ticketOverlay.style.display = 'flex';
            
            // Vaciar carrito
            cart = [];
            updateCart();
            localStorage.removeItem('cart');
        }
        
        // Generar PDF
        function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Encabezado
            doc.setFontSize(20);
            doc.setTextColor(255, 46, 99);
            doc.text('FashionShop', 105, 20, { align: 'center' });
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Ticket de Compra', 105, 30, { align: 'center' });
            
            // Información del pedido
            doc.setFontSize(10);
            doc.text(`Número de pedido: ${document.getElementById('ticket-number').textContent}`, 14, 40);
            doc.text(`Fecha: ${document.getElementById('ticket-date').textContent}`, 14, 46);
            doc.text(`Cliente: ${document.getElementById('ticket-customer').textContent}`, 14, 52);
            doc.text(`Método de entrega: ${document.getElementById('ticket-delivery').textContent}`, 14, 58);
            doc.text(`Método de pago: ${document.getElementById('ticket-payment').textContent}`, 14, 64);
            
            // Línea divisoria
            doc.line(14, 70, 196, 70);
            
            // Productos
            let y = 78;
            doc.setFontSize(12);
            doc.text('Productos', 14, y);
            y += 8;
            
            doc.setFontSize(10);
            cart.forEach(item => {
                doc.text(`${item.name} x${item.quantity}`, 20, y);
                doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 180, y, { align: 'right' });
                y += 6;
            });
            
            // Línea divisoria
            doc.line(14, y, 196, y);
            y += 8;
            
            // Subtotal
            doc.text('Subtotal:', 160, y);
            doc.text(`$${document.getElementById('order-subtotal').textContent}`, 180, y, { align: 'right' });
            y += 6;
            
            // Envío
            doc.text('Envío:', 160, y);
            doc.text(`${document.getElementById('order-shipping').textContent}`, 180, y, { align: 'right' });
            y += 6;
            
            // Total
            doc.setFontSize(12);
            doc.text('Total:', 160, y);
            doc.text(`$${document.getElementById('ticket-total').textContent}`, 180, y, { align: 'right' });
            
            // Pie de página
            y += 20;
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text('Gracias por tu compra en FashionShop', 105, y, { align: 'center' });
            y += 4;
            doc.text('Para cualquier consulta, contacta a soporte@fashionshop.com', 105, y, { align: 'center' });
            
            // Guardar PDF
            doc.save(`ticket-${document.getElementById('ticket-number').textContent}.pdf`);
            
            // Cerrar ticket después de descargar
            setTimeout(() => {
                ticketOverlay.style.display = 'none';
            }, 1000);
        }
        
        // Enviar comentario
        function submitFeedback(e) {
            e.preventDefault();
            
            const name = document.getElementById('feedback-name').value;
            const email = document.getElementById('feedback-email').value;
            const message = document.getElementById('feedback-message').value;
            
            // Aquí normalmente enviarías el formulario a tu servidor/backend
            // Para este ejemplo, simularemos el envío
            
            // Mostrar mensaje de éxito
            alert(`Gracias por tu comentario, ${name}! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.`);
            
            // Limpiar formulario
            feedbackForm.reset();
            
            // En un caso real, aquí enviarías los datos a tu servidor
            // Por ejemplo:
            // fetch('tu-servidor.com/api/feedback', {
            //   method: 'POST',
            //   body: JSON.stringify({ name, email, message }),
            //   headers: { 'Content-Type': 'application/json' }
            // })
            // .then(response => response.json())
            // .then(data => {
            //   alert('Gracias por tu comentario!');
            //   feedbackForm.reset();
            // })
            // .catch(error => {
            //   alert('Hubo un error al enviar tu mensaje. Por favor inténtalo de nuevo.');
            // });
        }