// ========================================
// CIKAO PARK WEBSITE JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Gallery Configuration
    // ========================================
    const galleries = {
        waterpark: {
            mainImg: document.getElementById('waterpark-main'),
            thumbs: document.querySelectorAll('#waterpark-thumbs .thumb'),
            currentIndex: 1
        },
        satwa: {
            mainImg: document.getElementById('satwa-main'),
            thumbs: document.querySelectorAll('#satwa-thumbs .thumb'),
            currentIndex: 1
        },
        wahana: {
            mainImg: document.getElementById('wahana-main'),
            thumbs: document.querySelectorAll('#wahana-thumbs .thumb'),
            currentIndex: 1
        },
        kuliner: {
            mainImg: document.getElementById('kuliner-main'),
            thumbs: document.querySelectorAll('#kuliner-thumbs .thumb'),
            currentIndex: 1
        },
        foto: {
            mainImg: document.getElementById('foto-main'),
            thumbs: document.querySelectorAll('#foto-thumbs .thumb'),
            currentIndex: 1
        },
        ilusi: {
            mainImg: document.getElementById('ilusi-main'),
            thumbs: document.querySelectorAll('#ilusi-thumbs .thumb'),
            currentIndex: 1
        },
        pendopo: {
            mainImg: document.getElementById('pendopo-main'),
            thumbs: document.querySelectorAll('#pendopo-thumbs .thumb'),
            currentIndex: 1
        },
        fasilitas: {
            mainImg: document.getElementById('fasilitas-main'),
            thumbs: document.querySelectorAll('#fasilitas-thumbs .thumb'),
            currentIndex: 1
        }
    };

    // ========================================
    // Gallery Functions
    // ========================================
    function updateGallery(galleryName, index) {
        const gallery = galleries[galleryName];
        if (!gallery || !gallery.mainImg || !gallery.thumbs.length) return;
        
        // Get the source from the thumbnail
        const thumb = gallery.thumbs[index];
        if (!thumb) return;
        
        // Update main image with fade effect
        gallery.mainImg.style.opacity = '0';
        setTimeout(() => {
            gallery.mainImg.src = thumb.src;
            gallery.mainImg.style.opacity = '1';
        }, 200);
        
        // Update active state on thumbnails
        gallery.thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
        
        gallery.currentIndex = index;
    }

    function navigateGallery(galleryName, direction) {
        const gallery = galleries[galleryName];
        if (!gallery) return;
        
        let newIndex = gallery.currentIndex;
        
        if (direction === 'next') {
            newIndex = (newIndex + 1) % gallery.thumbs.length;
        } else {
            newIndex = (newIndex - 1 + gallery.thumbs.length) % gallery.thumbs.length;
        }
        
        updateGallery(galleryName, newIndex);
    }

    // ========================================
    // Event Listeners - Thumbnails
    // ========================================
    Object.keys(galleries).forEach(galleryName => {
        const gallery = galleries[galleryName];
        if (gallery.thumbs) {
            gallery.thumbs.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    updateGallery(galleryName, index);
                });
            });
        }
    });

    // ========================================
    // Event Listeners - Navigation Buttons
    // ========================================
    document.querySelectorAll('.btn-nav').forEach(btn => {
        btn.addEventListener('click', function() {
            const galleryName = this.getAttribute('data-gallery');
            const direction = this.getAttribute('data-direction');
            navigateGallery(galleryName, direction);
        });
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // ========================================
    // Navbar Shadow on Scroll
    // ========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
        } else {
            navbar.classList.remove('shadow');
        }
    });

    // ========================================
    // Scroll Animations
    // ========================================
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Run on load

    // ========================================
    // Add Image Transition Style
    // ========================================
    Object.keys(galleries).forEach(galleryName => {
        const gallery = galleries[galleryName];
        if (gallery.mainImg) {
            gallery.mainImg.style.transition = 'opacity 0.3s ease';
        }
    });

    // ========================================
    // Touch/Swipe Support for Galleries
    // ========================================
    Object.keys(galleries).forEach(galleryName => {
        const mainSlide = document.querySelector(`#${galleryName === 'foto' ? 'taman-bunga' : galleryName} .main-slide`);
        if (!mainSlide) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        mainSlide.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        mainSlide.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(galleryName);
        }, { passive: true });
        
        function handleSwipe(gallery) {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigateGallery(gallery, 'next');
                } else {
                    navigateGallery(gallery, 'prev');
                }
            }
        }
    });

    // ========================================
    // Auto-rotate galleries (optional - currently disabled)
    // ========================================
    // Uncomment below to enable auto-rotation
    /*
    const autoRotateInterval = 5000; // 5 seconds
    
    Object.keys(galleries).forEach(galleryName => {
        setInterval(() => {
            navigateGallery(galleryName, 'next');
        }, autoRotateInterval);
    });
    */

    // ========================================
    // Lazy Loading for Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Cikao Park website loaded successfully!');
});