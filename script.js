// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto slide
let autoSlideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
document.querySelector('.hero').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.hero').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Calendar
const calendarEl = document.getElementById('calendar');
const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const dayNames = ['Sn', 'Sl', 'Rb', 'Km', 'Jm', 'Sb', 'Mg'];

function generateCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let calendarHTML = `
        <div class="calendar-nav">
            <button onclick="previousMonth()">
                <i class="fas fa-chevron-left"></i>
            </button>
            <span>${monthNames[month]} ${year}</span>
            <button onclick="nextMonth()">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        <div class="calendar-grid">
    `;
    
    // Add day names
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-day">${day}</div>`;
    });
    
    // Add empty cells for days before the first day of month
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = 0; i < adjustedFirstDay; i++) {
        calendarHTML += `<div class="calendar-date"></div>`;
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isPast = date < today.setHours(0, 0, 0, 0);
        const isToday = date.toDateString() === new Date().toDateString();
        
        let classes = 'calendar-date';
        if (isPast) classes += ' disabled';
        if (isToday) classes += ' selected';
        
        calendarHTML += `<div class="${classes}" onclick="selectDate(${day}, ${month}, ${year})">${day}</div>`;
    }
    
    calendarHTML += `</div>`;
    calendarEl.innerHTML = calendarHTML;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

function selectDate(day, month, year) {
    const selectedDate = new Date(year, month, day);
    const today = new Date().setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        return;
    }
    
    const allDates = document.querySelectorAll('.calendar-date');
    allDates.forEach(date => date.classList.remove('selected'));
    event.target.classList.add('selected');
    
    console.log('Selected date:', `${day}/${month + 1}/${year}`);
}

// Initialize calendar
generateCalendar(currentMonth, currentYear);

// Book Ticket Button
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach(button => {
    button.addEventListener('click', () => {
        const whatsappUrl = 'https://wa.me/6282129118900?text=Order%20Tiket%20AWB';
        window.open(whatsappUrl, '_blank');
    });
});

// Facility Detail Buttons
const facilityButtons = document.querySelectorAll('.facility-btn');
facilityButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const facilityName = button.closest('.facility-card').querySelector('h3').textContent;
        alert(`Informasi lengkap tentang ${facilityName} akan segera hadir!`);
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Navigation Links
const allLinks = document.querySelectorAll('a[href^="#"]');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.facility-card, .about-content, .ticket-widget');
animatedElements.forEach(el => observer.observe(el));

// Search Button (placeholder functionality)
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', () => {
    const searchTerm = prompt('Cari wahana atau informasi:');
    if (searchTerm) {
        alert(`Mencari: ${searchTerm}\n\nFitur pencarian akan segera hadir!`);
    }
});

// Console welcome message
console.log('%cAnugerah Waterpark Bunder', 'color: #4CAF50; font-size: 24px; font-weight: bold;');
console.log('%cSelamat datang! Visit us at Purwakarta', 'color: #666; font-size: 14px;');