document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');

    if (menuToggle && mainNavUl) {
        menuToggle.addEventListener('click', () => {
            mainNavUl.classList.toggle('active');
        });
    }

    // Плавный скролл к якорям и закрытие меню
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Закрыть мобильное меню после клика
                if (mainNavUl.classList.contains('active')) {
                    mainNavUl.classList.remove('active');
                }
            }
        });
    });

    // Обновление года в футере
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // (Опционально) Анимация элементов при прокрутке (простой пример)
    // Для более сложных анимаций лучше использовать библиотеки типа AOS.js или Intersection Observer API
    const animatedItems = document.querySelectorAll('.feature-item, .step-item, .screenshot-item, .pricing-plan');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // observer.unobserve(entry.target); // Раскомментировать, если анимация нужна только один раз
            }
        });
    }, { threshold: 0.1 }); // Срабатывает, когда 10% элемента видно

    animatedItems.forEach(item => {
        item.style.opacity = '0'; // Изначально скрыть
        item.style.transform = 'translateY(30px)'; // Сместить вниз
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(item);
    });

});