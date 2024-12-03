// HEADER FUNCTIONS
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
    });
};

showMenu('nav-toggle', 'nav-menu');

const dropdownItems = document.querySelectorAll('.dropdown__item');

dropdownItems.forEach(item => {
    const dropdownMenu = item.querySelector('.dropdown__menu');
    const dropdownArrow = item.querySelector('.dropdown__arrow');

    item.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling

        // If the dropdown is already open, close it
        if (dropdownMenu.classList.contains('show-dropdown')) {
            dropdownMenu.classList.remove('show-dropdown');
            dropdownArrow.classList.remove('rotate-arrow');
        } else {
            // Close other dropdowns
            dropdownItems.forEach(otherItem => {
                const otherMenu = otherItem.querySelector('.dropdown__menu');
                const otherArrow = otherItem.querySelector('.dropdown__arrow');
                if (otherMenu) otherMenu.classList.remove('show-dropdown');
                if (otherArrow) otherArrow.classList.remove('rotate-arrow');
            });

            // Open the current dropdown
            dropdownMenu.classList.add('show-dropdown');
            dropdownArrow.classList.add('rotate-arrow');
        }
    });
});

// Close dropdown if clicking outside
document.addEventListener('click', () => {
    dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown__menu');
        const dropdownArrow = item.querySelector('.dropdown__arrow');
        if (dropdownMenu) dropdownMenu.classList.remove('show-dropdown');
        if (dropdownArrow) dropdownArrow.classList.remove('rotate-arrow');
    });
});

// Select the header and dropdown menu
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');

// Function to handle scroll event
const handleScroll = () => {
    if (window.scrollY > 50 && !navMenu.classList.contains('show-menu')) {
        header.classList.add('scrolled'); // Add scrolled class when scrolled down
    } else if (!navMenu.classList.contains('show-menu')) {
        header.classList.remove('scrolled'); // Remove scrolled class when at top
    }
};

// Function to handle menu toggle
const handleMenuToggle = () => {
    if (navMenu.classList.contains('show-menu')) {
        header.classList.add('scrolled'); // Always show scrolled appearance when menu is open
    } else {
        // Reapply scroll effect based on scroll position
        if (window.scrollY <= 50) {
            header.classList.remove('scrolled');
        }
    }
};

// Attach the scroll and menu toggle event listeners
window.addEventListener('scroll', handleScroll);
toggle.addEventListener('click', handleMenuToggle);

// Scroll in animations

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));