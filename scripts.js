document.addEventListener('DOMContentLoaded', function () {

    // Elementy menu mobilnego
    const mobileMenuToggle = document.querySelector('.menu'); // Przycisk do rozwijania
    const mobileMenu = document.querySelector('.menu .list'); // Menu rozwijane

    // Kliknięcie na mobilne menu
    mobileMenuToggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Zatrzymuje propagację kliknięcia
        mobileMenu.classList.toggle('hidden'); // Przełącza widoczność menu
    });

    // Nasłuchiwanie na kliknięcie w dokument
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            // Jeśli kliknięcie miało miejsce poza przyciskiem lub menu, chowamy menu
            mobileMenu.classList.add('hidden');
        }
    });

    document.addEventListener('DOMContentLoaded', function () {

        // Elementy menu mobilnego
        const mobileMenuToggle = document.querySelector('.menu'); // Przycisk do rozwijania
        const mobileMenu = document.querySelector('.menu .list'); // Menu rozwijane
    
        // Kliknięcie na mobilne menu
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation(); // Zatrzymuje propagację kliknięcia
            mobileMenu.classList.toggle('hidden'); // Przełącza widoczność menu
        });
    
        // Nasłuchiwanie na kliknięcie w dokument
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden'); // Chowamy menu
            }
        });
    
        // Elementy menu desktopowego
        const desktopMenuToggle = document.querySelector('.nav input[type="checkbox"]');
        const desktopMenu = document.querySelector('.desktop-menu');
    
        // Obsługa desktop menu
        desktopMenuToggle.addEventListener('change', function () {
            if (this.checked) {
                $(desktopMenu).slideDown();
            } else {
                $(desktopMenu).slideUp();
            }
        });
    
        // Kliknięcie w elementy menu desktopowego
        desktopMenu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', function () {
                desktopMenuToggle.checked = false; // Ukryj menu
                $(desktopMenu).slideUp(); // Dodaj płynne zwijanie
            });
        });
    
        // Nasłuchiwanie na kliknięcie w dokument dla desktop menu
        document.addEventListener('click', function(event) {
            if (!desktopMenuToggle.contains(event.target) && !desktopMenu.contains(event.target)) {
                desktopMenuToggle.checked = false; // Ukryj menu
                $(desktopMenu).slideUp(); // Dodaj płynne zwijanie
            }
        });

    // Inicjalizacja ScrollReveal
    ScrollReveal().reveal('.gallery-container, .contact-container, .contact-map, #offer', {
        distance: '20px',
        duration: 1000,
        easing: 'ease-in-out',
        origin: 'bottom',
        opacity: 0,
        interval: 200,
        reset: true // Reset animacji po przewinięciu z powrotem
    });

    console.log('ScrollReveal is loaded and ready to use.');

    // Dodanie funkcji płynnego przewijania dla linków w menu
    const menuItems = document.querySelectorAll('.menu .list li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetText = this.textContent.toLowerCase();
            let targetId = '';

            if (targetText === 'oferta') {
                targetId = '#offer';
            } else if (targetText === 'galeria') {
                targetId = '#gallery';
            } else if (targetText === 'kontakt') {
                targetId = '#contact';
            } else if (targetText === 'mapa') {
                targetId = '.contact-map'; 
            }

            if (targetId) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize Carousels
    const carousels = document.querySelectorAll('.gallery-carousel');

    carousels.forEach((carousel) => {
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');
        const carouselInner = carousel.querySelector('.carousel-inner');
        const items = carouselInner.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicators button');

        let currentIndex = 0;

        // Update Carousel
        function updateCarousel() {
            items.forEach((item, index) => {
                item.style.transform = `translateX(-${currentIndex * 100}%)`;
            });

            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        // Go to specific index
        function goToIndex(index) {
            currentIndex = (index + items.length) % items.length;
            updateCarousel();
        }

        // Event Listeners for Controls
        prevButton.addEventListener('click', () => goToIndex(currentIndex - 1));
        nextButton.addEventListener('click', () => goToIndex(currentIndex + 1));

        // Event Listeners for Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToIndex(index));
        });

        // Touch events for mobile
        let touchstartX = 0;
        let touchendX = 0;

        carouselInner.addEventListener('touchstart', (event) => {
            touchstartX = event.changedTouches[0].screenX;
        });

        carouselInner.addEventListener('touchend', (event) => {
            touchendX = event.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchendX < touchstartX) {
                goToIndex(currentIndex + 1); // Swipe left
            }
            if (touchendX > touchstartX) {
                goToIndex(currentIndex - 1); // Swipe right
            }
        }

        // Initialize
        updateCarousel();
    });
});
});
