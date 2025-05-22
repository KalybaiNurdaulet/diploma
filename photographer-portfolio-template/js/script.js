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
                    item.style.display = 'none';
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
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
    let imagesInView = [];

    function updateImagesInView() {
        imagesInView = [];
        galleryItems.forEach((item, index) => {
            if (item.style.display !== 'none') {
                imagesInView.push({
                    src: item.querySelector('img').getAttribute('data-src-large') || item.querySelector('img').src,
                    alt: item.querySelector('img').alt,
                    originalIndex: Array.from(galleryItems).indexOf(item)
                });
            }
        });
    }
    
    galleryItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        imgElement.addEventListener('click', () => {
            updateImagesInView(); 
            currentImageIndex = imagesInView.findIndex(imgData => 
                (imgData.src === (imgElement.getAttribute('data-src-large') || imgElement.src)) &&
                (imgData.alt === imgElement.alt)
            );

            if (currentImageIndex > -1) {
                lightbox.style.display = 'block';
                lightboxImg.src = imagesInView[currentImageIndex].src;
                captionText.innerHTML = imagesInView[currentImageIndex].alt;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    function showImage(index) {
        if (imagesInView.length === 0) return; // Егер көрінетін суреттер болмаса, шығу
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
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (lightbox && lightbox.style.display === 'block' && imagesInView.length > 0) { // Тексеру қосылды
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });

    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Хабарламаңыз үшін рахмет! Жақын арада сізбен хабарласамыз.'); // Хабарлама аударылды
            feedbackForm.reset();
        });
    }
});