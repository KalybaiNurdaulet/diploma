document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Плавный скролл к якорям (опционально, но приятно)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Учитываем высоту фиксированного хедера
                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Закрыть мобильное меню, если оно открыто и это ссылка из меню
                if (navMenu.classList.contains('active') && this.closest('.nav-menu')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Обработка формы бронирования (просто пример, без отправки)
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время для подтверждения бронирования.');
            // Здесь можно добавить AJAX запрос на сервер для реальной отправки данных
            this.reset(); // Очистить форму
        });
    }

});