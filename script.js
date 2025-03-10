// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const backToTop = document.querySelector('.back-to-top');
const contentCategories = document.querySelectorAll('.content-categories li');
const galleryGrid = document.querySelector('.gallery-grid');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Change icon based on theme
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Save theme preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Tab Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding tab pane
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Content Categories
contentCategories.forEach(category => {
    category.addEventListener('click', () => {
        contentCategories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
        
        // Filter content based on category (to be implemented when content is added)
        const selectedCategory = category.getAttribute('data-category');
        console.log('Selected category:', selectedCategory);
    });
});

// Gallery Images
const galleryImages = [
    { src: 'Images/Gap.jpeg', caption: 'Gap Picnic' },
    { src: 'Images/BchGuyss.jpeg', caption: 'Bch Guys' },
    { src: 'Images/fbProfile.jpg', caption: 'Amrit Khanal' },
    { src: 'Images/Football.jpeg', caption: 'Football with bch boys' },
    { src: 'Images/GroupImage.jpg', caption: 'Ktaa haru' },
    { src: 'Images/Hetauda.jpg', caption: 'Amrit Khanal' },
    { src: 'Images/Laboratory.jpg', caption: 'Laboratory' },
    { src: 'Images/MinistryProject.jpg', caption: 'Ministry Project' },
    { src: 'Images/My Childhood1.jpg', caption: 'First fb Photo 😍' }
];

// Populate Gallery
function populateGallery() {
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
        
        // Open lightbox on click
        galleryItem.addEventListener('click', () => {
            openLightbox(index);
        });
    });
}

// Initialize Gallery
populateGallery();

// Lightbox functionality
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].caption;
    lightbox.style.display = 'block';
    
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
}

function closeLightboxFunc() {
    lightbox.style.display = 'none';
    
    // Enable scrolling on body
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].caption;
}

// Lightbox event listeners
closeLightbox.addEventListener('click', closeLightboxFunc);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
