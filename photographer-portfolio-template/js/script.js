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

    // Фильтрация галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    item.style.display = 'none'; // Сначала скрыть все
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block'; // Показать нужные
                    }
                });
            });
        });
    }

    // Лайтбокс
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevLightbox = document.querySelector('.prev-lightbox');
    const nextLightbox = document.querySelector('.next-lightbox');
    let currentImageIndex;
    let imagesInView = []; // Массив для видимых изображений (после фильтрации)

    function updateImagesInView() {
        imagesInView = [];
        galleryItems.forEach((item, index) => {
            if (item.style.display !== 'none') { // Учитываем только видимые после фильтрации
                imagesInView.push({
                    src: item.querySelector('img').getAttribute('data-src-large') || item.querySelector('img').src,
                    alt: item.querySelector('img').alt,
                    originalIndex: Array.from(galleryItems).indexOf(item) // Сохраняем оригинальный индекс для навигации
                });
            }
        });
    }
    
    galleryItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        imgElement.addEventListener('click', () => {
            updateImagesInView(); // Обновляем список видимых изображений
            // Находим индекс кликнутого изображения в отфильтрованном списке
            currentImageIndex = imagesInView.findIndex(imgData => 
                (imgData.src === (imgElement.getAttribute('data-src-large') || imgElement.src)) &&
                (imgData.alt === imgElement.alt)
            );

            if (currentImageIndex > -1) { // Если изображение найдено в видимых
                lightbox.style.display = 'block';
                lightboxImg.src = imagesInView[currentImageIndex].src;
                captionText.innerHTML = imagesInView[currentImageIndex].alt;
                document.body.style.overflow = 'hidden'; // Запретить скролл фона
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto'; // Разрешить скролл фона
        });
    }

    function showImage(index) {
        if (index >= imagesInView.length) { currentImageIndex = 0; }
        else if (index < 0) { currentImageIndex = imagesInView.length - 1; }
        else { currentImageIndex = index; }
        
        lightboxImg.src = imagesInView[currentImageIndex].src;
        captionText.innerHTML = imagesInView[currentImageIndex].alt;
    }

    if (prevLightbox) {
        prevLightbox.addEventListener('click', () => {
            showImage(currentImageIndex - 1);
        });
    }

    if (nextLightbox) {
        nextLightbox.addEventListener('click', () => {
            showImage(currentImageIndex + 1);
        });
    }
    
    // Закрытие лайтбокса по клику вне изображения (опционально)
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) { // Клик был по фону лайтбокса
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Закрытие лайтбокса по Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });


    // Обработка формы контактов (просто пример)
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь должна быть логика отправки данных формы (например, AJAX)
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            feedbackForm.reset();
        });
    }

});