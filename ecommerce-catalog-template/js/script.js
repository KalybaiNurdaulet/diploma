document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
        });
    }

    // Обновление года в футере
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Фильтрация товаров (простой пример)
    const filterButtons = document.querySelectorAll('.product-filters .filter-btn');
    const productCards = document.querySelectorAll('.product-grid .product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');

                productCards.forEach(card => {
                    card.style.display = 'none';
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    }
                });
            });
        });
    }

    // Логика для страницы товара (смена главного изображения, выбор цвета)
    if (document.body.classList.contains('product-detail-page') || document.querySelector('.product-detail-page')) {
        const mainImage = document.querySelector('.main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');
        const colorSwatches = document.querySelectorAll('.color-swatches .color-swatch');

        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    mainImage.src = this.src.replace('-thumb', ''); // Предполагаем, что главное фото не содержит "-thumb"
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }

        if (colorSwatches.length > 0) {
            colorSwatches.forEach(swatch => {
                swatch.addEventListener('click', function() {
                    colorSwatches.forEach(s => s.classList.remove('active'));
                    this.classList.add('active');
                    // Здесь можно добавить логику смены главного изображения по цвету, если есть разные фото для цветов
                    // console.log('Выбран цвет:', this.dataset.color);
                });
            });
        }
    }

    // Счетчик корзины (демонстрационный)
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart, .btn-add-to-cart-detail');
    const cartCountSpan = document.querySelector('.cart-count');
    let cartItemsCount = 0;

    if (cartCountSpan) { // Инициализация счетчика
        cartCountSpan.textContent = cartItemsCount;
    }
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке, если это кнопка в карточке товара
            cartItemsCount++;
            if (cartCountSpan) {
                cartCountSpan.textContent = cartItemsCount;
                // Анимация для счетчика
                cartCountSpan.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCountSpan.style.transform = 'scale(1)';
                }, 200);
            }
            // alert('Товар добавлен в корзину (демо)');
        });
    });

});