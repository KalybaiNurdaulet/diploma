document.addEventListener('DOMContentLoaded', function() {
    // Установите дату и время запуска (год, месяц (0-11), день, час, минута, секунда)
    const launchDate = new Date("Jan 1, 2026 00:00:00").getTime();

    const countdownTimer = document.getElementById('countdown-timer');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const notifyForm = document.getElementById('notify-form');
    const emailInput = document.getElementById('email-input');
    const formMessage = document.getElementById('form-message');


    if (countdownTimer) {
        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = launchDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerHTML = String(days).padStart(2, '0');
            if (hoursEl) hoursEl.innerHTML = String(hours).padStart(2, '0');
            if (minutesEl) minutesEl.innerHTML = String(minutes).padStart(2, '0');
            if (secondsEl) secondsEl.innerHTML = String(seconds).padStart(2, '0');

            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownTimer.innerHTML = "<p style='font-size: 1.5rem;'>Мы запустились!</p>";
            }
        }, 1000);
    }

    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь должна быть логика отправки email (например, AJAX на сервер или интеграция с сервисом)
            // Для примера просто показываем сообщение
            formMessage.textContent = 'Спасибо! Мы сообщим вам о запуске.';
            formMessage.className = 'success'; // Добавляем класс для стилизации
            emailInput.value = '';

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000); // Убрать сообщение через 5 секунд
        });
    }
});