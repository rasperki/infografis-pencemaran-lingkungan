document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. REFERENSI ELEMEN ---
    const btn = document.getElementById('submit-btn');
    const commitCheck = document.getElementById('commit-check');
    const modal = document.getElementById('success-modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.getElementById('close-modal');

    // --- 2. LOGIKA SCROLL (ANIMASI BERULANG) ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi Masuk
                if (entry.target.classList.contains('animate-card')) {
                    anime({
                        targets: entry.target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutQuart'
                    });
                } else if (entry.target.classList.contains('bar')) {
                    anime({
                        targets: entry.target,
                        width: el => el.getAttribute('data-width'),
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    });
                }
            } else {
                // Animasi Keluar (Reset saat scroll menjauh)
                if (entry.target.classList.contains('animate-card')) {
                    anime({ targets: entry.target, translateY: 30, opacity: 0, duration: 300 });
                } else if (entry.target.classList.contains('bar')) {
                    anime({ targets: entry.target, width: 0, duration: 300 });
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-card, .bar').forEach(el => scrollObserver.observe(el));

    // --- 3. LOGIKA CAROUSEL ---
    const carousel = document.getElementById('carousel');
    const dots = document.querySelectorAll('.dot');
    if (carousel) {
        carousel.addEventListener('scroll', () => {
            const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        });
    }

    // --- 4. LOGIKA TOMBOL & MODAL (MULTIPLE ANIMATIONS) ---
    btn.addEventListener('click', () => {
        if (!commitCheck.checked) {
            // Animasi Shake jika gagal
            anime({
                targets: '.footer-action',
                translateX: [-10, 10, -10, 10, 0],
                duration: 400,
                easing: 'easeInOutSine'
            });
            alert('Centang komitmenmu dulu ya! 🌱');
            return;
        }

        // Tampilkan Modal dengan Animasi Berlapis
        modal.style.display = 'flex';
        
        // Timeline Animasi: Modal muncul dulu, baru konten di dalamnya
        const tl = anime.timeline({
            easing: 'easeOutElastic(1, .6)',
            duration: 800
        });

        tl.add({
            targets: modalContent,
            scale: [0.5, 1],
            opacity: [0, 1],
        })
        .add({
            targets: '.modal-content img, .modal-content h3, .modal-content p',
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100) // Efek muncul satu per satu di dalam modal
        }, '-=400'); // Mulai sedikit lebih awal sebelum modal selesai membesar

        // Update Tombol
        btn.innerText = "Sudah Berkomitmen! ✨";
        btn.style.background = "#4ade80";
        btn.disabled = true;
    });

    // Tutup Modal
    closeModal.addEventListener('click', () => {
        anime({
            targets: modalContent,
            scale: 0,
            opacity: 0,
            duration: 400,
            easing: 'easeInBack',
            complete: () => modal.style.display = 'none'
        });
    });
});