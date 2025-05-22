document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
        });
    }

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

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

    if (document.body.classList.contains('product-detail-page') || document.querySelector('.product-detail-page')) {
        const mainImage = document.querySelector('.main-product-image');
        const thumbnails = document.querySelectorAll('.thumbnail-images .thumbnail');
        const colorSwatches = document.querySelectorAll('.color-swatches .color-swatch');

        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // Предполагаем, что у миниатюр такой же URL, но меньшего размера.
                    // Для примера, если основное фото `.../image.jpg`, миниатюра `.../image-thumb.jpg`
                    // В нашем случае, для стоковых фото, URL миниатюры уже содержит параметры размера.
                    // Поэтому просто копируем src миниатюры в src основного изображения, если логика именно такая.
                    // ИЛИ, если для основного изображения другой URL, нужно будет его сформировать.
                    // Для примера, если миниатюры УЖЕ являются уменьшенными версиями главных фото:
                    // mainImage.src = this.src.replace('-thumb1', '').replace('-thumb2', '').replace('-thumb3', ''); // Упрощенный пример
                    // Для стоковых фото, где URL миниатюры может быть уникальным:
                    if (this.src.includes('w=100&h=100')) { // Пример, как отличить URL миниатюры
                        mainImage.src = this.src.replace('w=100&h=100', 'w=800&h=800'); // Заменяем на больший размер
                    } else {
                         mainImage.src = this.src; // Или просто используем src миниатюры, если это уже главное изображение
                    }

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
                    // console.log('Таңдалған түс:', this.dataset.color);
                });
            });
        }
    }

    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart, .btn-add-to-cart-detail');
    const cartCountSpan = document.querySelector('.cart-count');
    let cartItemsCount = 0;

    if (cartCountSpan) {
        cartCountSpan.textContent = cartItemsCount;
    }
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartItemsCount++;
            if (cartCountSpan) {
                cartCountSpan.textContent = cartItemsCount;
                cartCountSpan.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartCountSpan.style.transform = 'scale(1)';
                }, 200);
            }
            // alert('Тауар себетке қосылды (демо)'); // Закомментировано, чтобы не мешать
        });
    });
});