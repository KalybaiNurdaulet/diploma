        // ... (предыдущий JS) ...

        // JS для смены фона хедера при скролле
        const header = document.querySelector('.showcase-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) { // 50px - точка скролла, когда хедер изменится
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }