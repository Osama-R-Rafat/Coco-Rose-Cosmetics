// ============================================
// MOBILE ENHANCEMENTS & RESPONSIVE LOGIC
// ============================================

let isMobileInitialized = false;

// Event Handler References (so we can remove them)
let mobileMenuToggleHandler = null;
let mobileNavCloseHandler = null;
let mobileNavOverlayHandler = null;
const mobileNavLinkHandlers = [];
let scrollToTopScrollHandler = null;
let scrollToTopClickHandler = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial check
    checkResponsiveMode();

    // Resize listener
    window.addEventListener('resize', () => {
        checkResponsiveMode();
    });
});

function checkResponsiveMode() {
    const isMobile = window.innerWidth < 768;

    if (isMobile && !isMobileInitialized) {
        initMobile();
    } else if (!isMobile && isMobileInitialized) {
        cleanupMobile();
    }
}

// ============================================
// INIT MOBILE
// ============================================
function initMobile() {
    setupMobileMenu();
    setupScrollToTop();
    enhanceMobileNav();
    isMobileInitialized = true;
}

// ============================================
// CLEANUP MOBILE
// ============================================
function cleanupMobile() {
    // switched to desktop mode

    // Cleanup Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle && mobileMenuToggleHandler) {
        mobileMenuToggle.removeEventListener('click', mobileMenuToggleHandler);
    }

    const mobileNavClose = document.getElementById('mobileNavClose');
    if (mobileNavClose && mobileNavCloseHandler) {
        mobileNavClose.removeEventListener('click', mobileNavCloseHandler);
    }

    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    if (mobileNavOverlay && mobileNavOverlayHandler) {
        mobileNavOverlay.removeEventListener('click', mobileNavOverlayHandler);
    }

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link, index) => {
        if (mobileNavLinkHandlers[index]) {
            link.removeEventListener('click', mobileNavLinkHandlers[index]);
        }
    });
    // Clear handlers array
    mobileNavLinkHandlers.length = 0; // Keeping reference, just emptying

    // Force close menu
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) mobileNav.classList.remove('active');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';

    // Cleanup Scroll To Top
    if (scrollToTopScrollHandler) {
        window.removeEventListener('scroll', scrollToTopScrollHandler);
    }
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop && scrollToTopClickHandler) {
        scrollTop.removeEventListener('click', scrollToTopClickHandler);
        scrollTop.classList.remove('visible'); // Hide it
    }

    isMobileInitialized = false;
}


// ============================================
// MOBILE MENU
// ============================================
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggleHandler = () => {
            if (mobileNav) mobileNav.classList.add('active');
            if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        mobileMenuToggle.addEventListener('click', mobileMenuToggleHandler);
    }

    // Close function
    const closeMobileMenu = () => {
        if (mobileNav) mobileNav.classList.remove('active');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileNavClose) {
        mobileNavCloseHandler = closeMobileMenu;
        mobileNavClose.addEventListener('click', mobileNavCloseHandler);
    }

    if (mobileNavOverlay) {
        mobileNavOverlayHandler = closeMobileMenu;
        mobileNavOverlay.addEventListener('click', mobileNavOverlayHandler);
    }

    // Close menu when clicking nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link) => {
        const handler = () => closeMobileMenu();
        mobileNavLinkHandlers.push(handler);
        link.addEventListener('click', handler);
    });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function setupScrollToTop() {
    const scrollTop = document.getElementById('scrollTop');

    if (!scrollTop) return;

    // Show/hide on scroll
    scrollToTopScrollHandler = () => {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    };
    window.addEventListener('scroll', scrollToTopScrollHandler);

    // Scroll to top on click
    scrollToTopClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    scrollTop.addEventListener('click', scrollToTopClickHandler);
}

// ============================================
// ENHANCED MOBILE NAVIGATION
// ============================================
function enhanceMobileNav() {
    // Note: This logic for smooth scrolling hash links is usually fine to keep 
    // on desktop too, but since we are separating logic, we'll keep it here 
    // or arguably move it to app.js if we want it everywhere. 
    // For now, we leave it as is, but we won't strictly "cleanup" the events 
    // on anchors because they are harmless on desktop. 
    // However, if we wanted to be strict, we would track them too.

    // We will just leave them active as they are standard behavior.

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // We are not tracking these to remove them because 
        // smooth scrolling is good for desktop too.
        // The mobile-specific part (closing menu) was handled inside setupMobileMenu listeners mostly.
    });
}
