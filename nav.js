// Navigation functionality
(function() {
    'use strict';
    
    // Navigation HTML template
    const navHTML = `
        <nav class="navbar" role="navigation" aria-label="Main navigation">
            <div class="nav-container">
                <a href="/" class="nav-logo">BuildLog</a>
                <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" id="nav-toggle">
                    ☰
                </button>
                <ul class="nav-menu" id="nav-menu">
                    <li><a href="/#features">Features</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li class="nav-item-dropdown">
                        <a href="/what-is-construction-daily-log.html">Resources</a>
                        <ul class="nav-dropdown">
                            <li><a href="/what-is-construction-daily-log.html">What Is a Daily Work Log?</a></li>
                            <li><a href="/how-to-create-osha-compliant-daily-reports.html">Daily Reports & Regulations</a></li>
                            <li><a href="/construction-site-documentation-checklist.html">Field Documentation Checklist</a></li>
                            <li><a href="/best-practices-recording-site-activities.html">Best Practices</a></li>
                            <li><a href="/construction-compliance-software-guide.html">Daily Log Software Guide</a></li>
                        </ul>
                    </li>
                    <li><a href="/blog/">Blog</a></li>
                    <li><a href="/app" class="nav-cta">Launch App</a></li>
                </ul>
            </div>
        </nav>
    `;
    
    function initNavigation() {
        // Insert navigation at the beginning of body
        const body = document.body;
        if (body && !document.querySelector('.navbar')) {
            body.insertAdjacentHTML('afterbegin', navHTML);
        }
        
        // Initialize navigation functionality
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navToggle.textContent = isExpanded ? '☰' : '✕';
            });
            
            // Mobile dropdown toggle for Resources (must be set up before universal handler)
            const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
            dropdownItems.forEach(item => {
                const mainLink = item.querySelector('a:first-child');
                if (mainLink) {
                    // Check if mobile on click
                    mainLink.addEventListener('click', function(e) {
                        if (window.innerWidth <= 767) {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent universal handler from closing menu
                            item.classList.toggle('active');
                        }
                    });
                }
            });
            
            // Close menu when clicking on a link (but not dropdown parent links on mobile)
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function(e) {
                    // Don't close menu if this is a dropdown parent link on mobile
                    const dropdownItem = link.closest('.nav-item-dropdown');
                    if (dropdownItem && window.innerWidth <= 767 && dropdownItem.querySelector('a:first-child') === link) {
                        return; // Let the dropdown handler manage this
                    }
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.textContent = '☰';
                });
            });
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
})();

