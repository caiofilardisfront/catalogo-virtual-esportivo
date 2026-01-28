/* dados.js */

// ==========================================
// 1. GERAÇÃO DE DADOS (Simulando 36 itens)
// ==========================================
const baseProducts = [
    { id: 1, name: 'Camisa Flamengo', category: 'futebol', price: 89.90, original: 129.90, image: 'https://esportes.woozen.com.br/wp-content/uploads/2023/12/flamengo_1-300x300.png', badge: 'OFERTA', tag: 'Mais vendido' },
    { id: 2, name: 'Chuteira Society', category: 'futebol', price: 159.90, original: 219.90, image: 'https://images.tcdn.com.br/img/img_prod/1083597/90_chuteira_society_penalty_tornado_infantil_2181_1_310e652c285f78f6b31ed8cf6b244015.jpg', badge: 'PROMO', tag: 'Novo' },
    { id: 3, name: 'Short Praia', category: 'praia', price: 49.90, original: 79.90, image: 'https://cdn.awsli.com.br/300x300/369/369503/produto/170943745/shorts-bermuda-mascuina-praia-preto-liso-maretoa-3k2hy9tikf.jpg', badge: 'PROMO', tag: '' },
    { id: 4, name: 'Regata', category: 'academia', price: 39.90, original: 69.90, image: 'https://cdn.awsli.com.br/300x300/1067/1067133/produto/232704384/red-1---regata-cavada-masculina-dry-fit-academia-treino-corrida-beach-tennis-fut-xlb5w0jsp4.jpg', badge: '', tag: 'Top vendido' },
    { id: 5, name: 'Bola Futebol Pro', category: 'futebol', price: 129.90, original: 189.90, image: 'https://images.tcdn.com.br/img/img_prod/1376235/90_bola_futebol_de_campo_south_team_pro_3361_1_68afd0a7048289d1e7f19574dc673cba.jpg', badge: 'QUEIMA', tag: '' },
    { id: 6, name: 'Tênis Corrida', category: 'academia', price: 199.90, original: 299.90, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', badge: 'OFERTA', tag: '' },
    { id: 7, name: 'Boné Ajustável', category: 'acessorios', price: 29.90, original: 49.90, image: 'https://images.tcdn.com.br/img/img_prod/812686/90_bone_viagem_archive_distance_821_1_5672ad11c0c1d5900caf80c21d8c2b1b.jpg', badge: '', tag: '' },
    { id: 8, name: 'Mochila Esporta', category: 'acessorios', price: 79.90, original: 129.90, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop', badge: 'PROMO', tag: '' },
    { id: 9, name: 'Camisa Fluminense', category: 'futebol', price: 89.90, original: 129.90, image: 'https://cdn.awsli.com.br/300x300/2814/2814246/produto/390761757/8799_719b828f-b3ba-42da-8426-10064e46c1a8-z1dspffu9h.jpeg', badge: 'OFERTA', tag: '' },
    { id: 10, name: 'Sunga Praia', category: 'praia', price: 59.90, original: 99.90, image: 'https://images.tcdn.com.br/img/img_prod/1311261/90_sunga_praia_boxer_puma_uv50_26010002_2525_29415_1_20250722125654_6daf9ae29961.png', badge: '', tag: 'Queridinho' },
    { id: 11, name: 'Luva Academia', category: 'academia', price: 69.90, original: 119.90, image: 'https://images.tcdn.com.br/img/img_prod/1376235/90_luva_academia_halteres_convoy_ys37032_1069_3_5ef6e3dbdfb99c8c9ca724a15e52c05c.jpg', badge: 'PROMO', tag: '' },
    { id: 12, name: 'Relógio Esportivo', category: 'acessorios', price: 149.90, original: 249.90, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', badge: 'OFERTA', tag: 'Novo' },
    { id: 13, name: 'Sunga Praia', category: 'praia', price: 59.90, original: 99.90, image: 'https://images.unsplash.com/photo-1506629082632-537a081f6283?w=300&h=300&fit=crop', badge: '', tag: 'Queridinho' },
    { id: 14, name: 'Luva Academia', category: 'academia', price: 69.90, original: 119.90, image: 'https://images.unsplash.com/photo-1596506365167-342eac0e8a16?w=300&h=300&fit=crop', badge: 'PROMO', tag: '' },
    { id: 15, name: 'Relógio Esportivo', category: 'acessorios', price: 149.90, original: 249.90, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', badge: 'OFERTA', tag: 'Novo' }
];

// Triplicando os produtos para criar 36 itens (3 páginas de 12)
// Adicionamos IDs únicos para não quebrar o carrinho
const products = [
    ...baseProducts,
    ...baseProducts.map(p => ({ ...p, id: p.id + 100, name: p.name + ' II' })),
    ...baseProducts.map(p => ({ ...p, id: p.id + 200, name: p.name + ' III' }))
];

// ==========================================
// 2. ESTADO
// ==========================================
let cart = [];
let currentFilter = 'todos';
let currentSearch = '';
let selectedTags = [];
let selectedBadges = [];
let priceMin = null;
let priceMax = null;

// Configuração de Paginação
let currentPage = 1;
const itemsPerPage = 12; // 12 itens por página conforme pedido

// ==========================================
// 3. CARROSSEL
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function initCarouselNav() {
    const nav = document.getElementById('carouselNav');
    if (!nav) return;
    nav.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        nav.appendChild(dot);
    }
}

function showSlide(index) {
    const slideEl = document.getElementById('carouselSlides');
    if (!slideEl) return;
    slideEl.style.transform = `translateX(${-index * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// ==========================================
// 4. RENDERIZAÇÃO E PAGINAÇÃO
// ==========================================

function renderProducts(filteredList = []) {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    const paginationControls = document.getElementById('paginationControls');

    if (!grid || !noResults || !paginationControls) return;

    // Se a lista estiver vazia
    if (filteredList.length === 0) {
        grid.innerHTML = '';
        paginationControls.innerHTML = ''; // Remove paginação
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // === LÓGICA DE FATIAR (SLICE) ===
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredList.slice(startIndex, endIndex);

    // Renderiza apenas a fatia
    grid.innerHTML = paginatedItems.map(p => `
        <div class="product-card">
            ${p.badge ? `<div class="product-badge ${p.badge === 'PROMO' ? 'promo' : ''}">${p.badge}</div>` : ''}
            
            <div class="product-image" style="background-image: url('${p.image}');"></div>
            
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                
                <div class="product-header-row">
                    <div class="product-name" title="${p.name}">${p.name}</div>
                    ${p.tag ? `<div class="product-info-tag"><i class="bi bi-check2"></i> ${p.tag}</div>` : ''}
                </div>

                <div class="product-price">
                    <span class="price-original">de R$ ${p.original.toFixed(2).replace('.', ',')}</span>
                    <span class="price-current">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                </div>
                
                <button class="btn-add-cart" onclick="addToCart(${p.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');

    // Chama a função que desenha os botões
    renderPaginationControls(filteredList.length);
}

function renderPaginationControls(totalItems) {
    const container = document.getElementById('paginationControls');
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Se só existe 1 página, não precisa mostrar botões
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // Botão Anterior
    html += `
        <button 
            class="page-btn" 
            onclick="changePage(${currentPage - 1})" 
            ${currentPage === 1 ? 'disabled' : ''}
        >
            <i class="bi bi-chevron-left"><</i>
        </button>
    `;

    // Números das Páginas
    for (let i = 1; i <= totalPages; i++) {
        html += `
            <button 
                class="page-btn ${i === currentPage ? 'active' : ''}" 
                onclick="changePage(${i})"
            >
                ${i}
            </button>
        `;
    }

    // Botão Próximo
    html += `
        <button 
            class="page-btn" 
            onclick="changePage(${currentPage + 1})" 
            ${currentPage === totalPages ? 'disabled' : ''}
        >
            <i class="bi bi-chevron-right">></i>
        </button>
    `;

    container.innerHTML = html;
}

function changePage(newPage) {
    currentPage = newPage;

    // Força re-renderização mantendo os filtros atuais
    // Mas NÃO chamamos applyFilters() direto para não resetar a página para 1
    // Precisamos de uma função auxiliar para filtrar sem resetar, 
    // ou apenas chamamos applyFilters passando um flag.
    // Solução mais simples: chamar applyFilters, mas alterar a lógica dele abaixo.

    // Neste caso, vamos apenas pegar a lista filtrada atual e renderizar
    // Para simplificar, vamos chamar applyFilters mas vamos criar uma variável global
    // "isChangingPage" ou passar parametro.

    applyFilters(false); // Passamos false para NÃO resetar a página

    // Scroll suave para o topo da lista
    document.querySelector('.products-section').scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// 5. FILTROS E BUSCA
// ==========================================

function filterCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    const buttons = document.querySelectorAll('.filter-btn');
    for (let btn of buttons) {
        if (btn.textContent.toLowerCase().includes(category) || (category === 'todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    }
    applyFilters(true); // Resetar para página 1
}

function toggleTagFilter(checkbox) {
    const value = checkbox.value;
    if (checkbox.checked) {
        selectedTags.push(value);
    } else {
        selectedTags = selectedTags.filter(t => t !== value);
    }
    applyFilters(true); // Resetar para página 1
}

function toggleBadgeFilter(checkbox) {
    const value = checkbox.value;
    if (checkbox.checked) {
        selectedBadges.push(value);
    } else {
        selectedBadges = selectedBadges.filter(b => b !== value);
    }
    applyFilters(true); // Resetar para página 1
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearch = searchInput.value.toLowerCase();
        applyFilters(true); // Resetar para página 1
    }
}

// Função Principal de Filtro
function applyFilters(shouldResetPage = false) {

    // Se for uma nova busca/filtro, volta para página 1
    if (shouldResetPage) {
        currentPage = 1;
    }

    // Pegar valores dos inputs de preço
    const minInputEl = document.getElementById('minPrice');
    const maxInputEl = document.getElementById('maxPrice');

    if (minInputEl) priceMin = minInputEl.value ? parseFloat(minInputEl.value) : null;
    if (maxInputEl) priceMax = maxInputEl.value ? parseFloat(maxInputEl.value) : null;

    let filtered = products;

    // 1. Categoria
    if (currentFilter !== 'todos') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // 2. Busca
    if (currentSearch) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(currentSearch)
        );
    }

    // 3. Tags
    if (selectedTags.length > 0) {
        filtered = filtered.filter(p => selectedTags.includes(p.tag));
    }

    // 4. Badges
    if (selectedBadges.length > 0) {
        filtered = filtered.filter(p => selectedBadges.includes(p.badge));
    }

    // 5. Preço
    if (priceMin !== null) {
        filtered = filtered.filter(p => p.price >= priceMin);
    }
    if (priceMax !== null) {
        filtered = filtered.filter(p => p.price <= priceMax);
    }

    // Renderiza (passando a lista filtrada completa)
    renderProducts(filtered);
}

// ==========================================
// 6. CARRINHO
// ==========================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartBadge();
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadgeHeader');
    if (badge) badge.textContent = total;
}

function openCart() {
    const modal = document.getElementById('cartModal');
    const itemsDiv = document.getElementById('cartItems');

    if (!modal || !itemsDiv) return;

    if (cart.length === 0) {
        itemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 12px; margin-top: 8px;">Adicione produtos para começar!</p>
            </div>
        `;
    } else {
        let html = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-image">👕</div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                            <span style="width: 20px; text-align: center;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">✕ Remover</button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `
            <div class="cart-summary">
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
        itemsDiv.innerHTML = html;
    }
    modal.style.display = 'block';
}

function closeCart(event) {
    if (event && event.target.id !== 'cartModal') return;
    const modal = document.getElementById('cartModal');
    if (modal) modal.style.display = 'none';
}

function updateQty(productId, delta) {
    const item = cart.find(c => c.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        updateCartBadge();
        openCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    updateCartBadge();
    openCart();
}

function sendViaWhatsApp() {
    if (cart.length === 0) {
        alert('Adicione produtos ao carrinho!');
        return;
    }
    let message = '🛒 *Pedido Veste Bem*\n\n';
    let total = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        message += `• ${item.name} (${item.quantity}x) - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    });
    message += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    message += 'Gostaria de finalizar a compra! 💳';
    const whatsappUrl = `https://wa.me/5521999990000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ==========================================
// 6. CARRINHO & CHECKOUT (Lógica Substituída)
// ==========================================

let currentCheckoutStep = 1;

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartBadge();
    
    // Feedback visual opcional
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Adicionado!";
    btn.style.background = "var(--success)";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "";
    }, 1000);
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    // Atualiza badge do Header
    const badgeHeader = document.getElementById('cartBadgeHeader');
    if(badgeHeader) badgeHeader.textContent = total;
    
    // Atualiza badge Flutuante
    const badgeFloating = document.getElementById('cartBadgeFloating');
    if(badgeFloating) badgeFloating.textContent = total;
}

function openCart() {
    const modal = document.getElementById('cartModal');
    currentCheckoutStep = 1; // Sempre abre na etapa 1
    renderStep();
    if(modal) modal.style.display = 'block';
}

function closeCart(event) {
    if (event && event.target.id !== 'cartModal') return;
    const modal = document.getElementById('cartModal');
    if(modal) modal.style.display = 'none';
}

function updateQty(productId, delta) {
    const item = cart.find(c => c.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
        updateCartBadge();
        renderStep(); // Re-renderiza o passo atual (carrinho)
    }
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    updateCartBadge();
    renderStep();
}

// === GERENCIADOR DE ETAPAS ===

function renderStep() {
    // Esconde todos os passos
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';

    // Mostra o passo atual e atualiza botões
    if (currentCheckoutStep === 1) {
        document.getElementById('modalTitle').innerText = "1. Seu Carrinho";
        document.getElementById('step1').style.display = 'block';
        renderCartStep();
    } else if (currentCheckoutStep === 2) {
        document.getElementById('modalTitle').innerText = "2. Endereço de Entrega";
        document.getElementById('step2').style.display = 'block';
        renderAddressControls();
    } else if (currentCheckoutStep === 3) {
        document.getElementById('modalTitle').innerText = "3. Confirmar Pedido";
        document.getElementById('step3').style.display = 'block';
        renderSummaryStep();
    }
}

// --- FASE 1: Lista do Carrinho ---
function renderCartStep() {
    const itemsDiv = document.getElementById('cartItems');
    const footer = document.getElementById('modalFooter');

    if (cart.length === 0) {
        itemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 12px; margin-top: 8px;">Adicione produtos para começar!</p>
            </div>
        `;
        footer.innerHTML = `<button class="btn-secondary" onclick="closeCart()">Continuar Comprando</button>`;
    } else {
        let html = '';
        let total = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            html += `
                <div class="cart-item">
                    <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover;"></div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
                            <span style="width: 20px; text-align: center;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                            <button class="btn-remove" onclick="removeFromCart(${item.id})">✕ Remover</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Total da Fase 1
        html += `
            <div class="cart-summary">
                <div class="summary-row total">
                    <span>Subtotal:</span>
                    <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
        
        itemsDiv.innerHTML = html;
        
        // Botões da Fase 1
        footer.innerHTML = `
            <button class="btn-secondary" onclick="closeCart()">Voltar</button>
            <button class="btn-primary" onclick="goToStep(2)">Continuar para Endereço</button>
        `;
    }
}

// --- FASE 2: Controles ---
function renderAddressControls() {
    const footer = document.getElementById('modalFooter');
    footer.innerHTML = `
        <button class="btn-secondary" onclick="goToStep(1)">Voltar</button>
        <button class="btn-primary" onclick="validateAndGoToStep3()">Revisar Pedido</button>
    `;
}

// --- FASE 3: Resumo ---
function renderSummaryStep() {
    const footer = document.getElementById('modalFooter');
    const itemsList = document.getElementById('summaryItemsList');
    const addressText = document.getElementById('summaryAddressText');
    const totalEl = document.getElementById('summaryTotalValue');

    // Preenche Itens
    let total = 0;
    let itemsHtml = '<ul style="list-style: none; padding: 0;">';
    cart.forEach(item => {
        const sub = item.price * item.quantity;
        total += sub;
        itemsHtml += `<li style="margin-bottom: 4px; font-size: 12px;">• ${item.quantity}x ${item.name} <b>(R$ ${sub.toFixed(2).replace('.', ',')})</b></li>`;
    });
    itemsHtml += '</ul>';
    itemsList.innerHTML = itemsHtml;
    totalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    // Preenche Endereço
    const name = document.getElementById('clientName').value;
    const rua = document.getElementById('clientStreet').value;
    const num = document.getElementById('clientNumber').value;
    const bairro = document.getElementById('clientNeighborhood').value;
    const cidade = document.getElementById('clientCity').value;
    
    addressText.innerHTML = `
        <b>Cliente:</b> ${name}<br>
        <b>Endereço:</b> ${rua}, ${num}<br>
        ${bairro} - ${cidade}
    `;

    footer.innerHTML = `
        <button class="btn-secondary" onclick="goToStep(2)">Corrigir</button>
        <button class="btn-whatsapp" onclick="finalizeOrder()">
            <span>💬</span> Enviar Pedido
        </button>
    `;
}

// === LÓGICA DE NAVEGAÇÃO E VALIDAÇÃO ===

function goToStep(step) {
    currentCheckoutStep = step;
    renderStep();
}

function validateAndGoToStep3() {
    // Validação simples
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const cep = document.getElementById('clientCep').value;
    const num = document.getElementById('clientNumber').value;
    const rua = document.getElementById('clientStreet').value;

    if (!name || !phone || !cep || !num || !rua) {
        alert("Por favor, preencha todos os campos obrigatórios (*).");
        return;
    }
    
    goToStep(3);
}

// === INTEGRAÇÃO VIACEP ===
function checkCep(cepValue) {
    // Remove tudo que não é digito
    const cep = cepValue.replace(/\D/g, '');

    if (cep !== "") {
        // Expressão regular para validar o CEP.
        const validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            // Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('clientStreet').value = "...";
            document.getElementById('clientNeighborhood').value = "...";
            document.getElementById('clientCity').value = "...";

            // Cria um script para buscar
            const script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=fillAddress';
            document.body.appendChild(script);
        } else {
            alert("Formato de CEP inválido.");
        }
    }
}

// Callback do ViaCEP
function fillAddress(content) {
    if (!("erro" in content)) {
        document.getElementById('clientStreet').value = content.logradouro;
        document.getElementById('clientNeighborhood').value = content.bairro;
        document.getElementById('clientCity').value = content.localidade + "/" + content.uf;
        document.getElementById('clientNumber').focus(); // Foca no numero
    } else {
        alert("CEP não encontrado.");
        document.getElementById('clientStreet').value = "";
    }
}

// === MÁSCARAS DE INPUT ===
function maskPhone(input) {
    let value = input.value.replace(/\D/g,'');
    // (11) 99999-9999
    value = value.replace(/^(\d{2})(\d)/g,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    input.value = value.substring(0, 15); // Limita tamanho
}

// === FINALIZAÇÃO (WHATSAPP) ===
function finalizeOrder() {
    // Coleta Dados
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const email = document.getElementById('clientEmail').value;
    const rua = document.getElementById('clientStreet').value;
    const num = document.getElementById('clientNumber').value;
    const bairro = document.getElementById('clientNeighborhood').value;
    const cidade = document.getElementById('clientCity').value;

    let message = `🛒 *NOVO PEDIDO - VESTE BEM*\n`;
    message += `----------------------------------\n`;
    message += `👤 *Cliente:* ${name}\n`;
    message += `📞 *Tel:* ${phone}\n`;
    if(email) message += `✉️ *Email:* ${email}\n`;
    message += `\n📍 *Endereço de Entrega:*\n`;
    message += `${rua}, ${num}\n${bairro} - ${cidade}\n`;
    message += `----------------------------------\n`;
    message += `🛍️ *Itens do Pedido:*\n`;

    let total = 0;
    cart.forEach(item => {
        const sub = item.price * item.quantity;
        total += sub;
        message += `• ${item.quantity}x ${item.name} - R$ ${sub.toFixed(2).replace('.', ',')}\n`;
    });

    message += `\n💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
    message += `----------------------------------\n`;
    message += `Aguardo a confirmação para pagamento!`;

    const whatsappUrl = `https://wa.me/5521999990000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ... (EVENT LISTENERS e INIT MANTIDOS DO CÓDIGO ANTERIOR) ...
const searchInput = document.getElementById('searchInput');
if(searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchProducts();
    });
}

// Init
setInterval(nextSlide, 5000);
initCarouselNav();
// Inicializa renderizando a primeira página
applyFilters(true);