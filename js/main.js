// ============================================================
// MANUAL DE COMPUTACIÓN - JAVASCRIPT
// Versión optimizada para PC, Tablet, Android, iOS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. BARRA DE PROGRESO (optimizada) ---
    var progressBar = document.getElementById('progressBar');
    if (progressBar) {
        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    progressBar.style.width = (scrollTop / scrollHeight) * 100 + '%';
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // --- 2. BOTÓN VOLVER ARRIBA (touch friendly) ---
    var backBtn = document.getElementById('backToTop');
    if (backBtn) {
        var btnVisible = false;
        window.addEventListener('scroll', function() {
            var shouldShow = window.scrollY > 300;
            if (shouldShow !== btnVisible) {
                btnVisible = shouldShow;
                backBtn.classList.toggle('visible', shouldShow);
            }
        });
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        // Touch devices
        backBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, { passive: false });
    }

    // --- 3. NAVEGACIÓN SUAVE (también para iOS/Android) ---
    var nav = document.querySelector('.nav');
    var navMenu = document.getElementById('navMenu');
    var navToggle = document.getElementById('navToggle');

    document.querySelectorAll('.nav a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            var targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            var navHeight = nav ? nav.offsetHeight : 60;
            var targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            if (targetPos < 0) targetPos = 0;

            window.scrollTo({ top: targetPos, behavior: 'smooth' });

            if (navMenu && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
            }
        });
    });

    // --- 4. MENÚ RESPONSIVO (táctil) ---
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        });
        navToggle.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show');
        }, { passive: true });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        });
        document.addEventListener('touchstart', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        }, { passive: true });
    }

    // --- 5. SOMBRA EN NAV AL SCROLL ---
    if (nav) {
        var navScrolled = false;
        window.addEventListener('scroll', function() {
            var shouldScroll = window.scrollY > 50;
            if (shouldScroll !== navScrolled) {
                navScrolled = shouldScroll;
                nav.classList.toggle('scrolled', shouldScroll);
            }
        });
    }

    // --- 6. ANIMACIÓN DE SECCIONES (Intersection Observer) ---
    var sections = document.querySelectorAll('.section');
    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
        sections.forEach(function(s) { sectionObserver.observe(s); });
    } else {
        sections.forEach(function(s) { s.classList.add('visible'); });
    }

    // --- 7. EJERCICIOS - BOTONES DE ACCIÓN ---
    document.querySelectorAll('.ejercicio-accion').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var originalText = this.textContent;
            this.textContent = '✅ ¡Completado!';
            this.style.background = '#16a34a';
            this.style.boxShadow = '0 4px 12px rgba(22,163,74,0.25)';

            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
            }, 2000);
        });
        // Touch support
        btn.addEventListener('touchstart', function() {
            var originalText = this.textContent;
            this.textContent = '✅ ¡Completado!';
            this.style.background = '#16a34a';
            this.style.boxShadow = '0 4px 12px rgba(22,163,74,0.25)';
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.boxShadow = '';
            }, 2000);
        }, { passive: true });
    });

    // --- 8. DETECCIÓN DE DISPOSITIVO (consola informativa) ---
    var isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
    var deviceType = isMobile ? (isTablet ? 'Tablet' : 'Móvil') : 'PC/Desktop';

    console.log('✅ Manual de Computación J.S. N°V cargado');
    console.log('📱 Dispositivo detectado: ' + deviceType);
    console.log('📑 ' + sections.length + ' secciones disponibles');
    console.log('💡 Modo responsivo activo para todos los dispositivos');

});