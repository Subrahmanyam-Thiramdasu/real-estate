/**
 * NARASINGARAO | Premium Real Estate Website
 * Near Anakapalli, Vizag Region, Andhra Pradesh
 * Frontend Architecture & Interactions Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  initNavigation();
  initMobileMenu();
  initScrollReveals();
  initPropertyFilters();
  initContactForm();
  initSmoothScroll();
});

/**
 * 1. Hero Reveal Sequence
 * Slowly reveals hero background image and staggers text elements
 */
function initHeroAnimation() {
  const heroBg = document.querySelector('.hero-bg-image');
  if (heroBg) {
    // Check if image is already cached or loaded
    if (heroBg.complete) {
      heroBg.classList.add('loaded');
    } else {
      heroBg.addEventListener('load', () => {
        heroBg.classList.add('loaded');
      });
    }
  }

  // Stagger reveal of hero text items
  const heroRevealItems = document.querySelectorAll('.hero-reveal');
  heroRevealItems.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 200 + index * 160);
  });
}

/**
 * 2. Sticky Navbar with Transition on Scroll
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 3. Mobile Hamburger Menu & Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 4. IntersectionObserver Scroll Reveals
 */
function initScrollReveals() {
  // If user prefers reduced motion, reveal everything immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-item').forEach(item => {
    revealObserver.observe(item);
  });
}

/**
 * 5. Property Showcase Category Filter
 */
function initPropertyFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const propertyCards = document.querySelectorAll('.property-card');

  if (!filterBtns.length || !propertyCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      propertyCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = '';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 6. Contact Form - Direct WhatsApp Lead Generator
 */
function initContactForm() {
  const form = document.getElementById('property-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('lead-name')?.value.trim() || '';
    const phone = document.getElementById('lead-phone')?.value.trim() || '';
    const propertyType = document.getElementById('lead-interest')?.value || 'Property Enquiry';
    const message = document.getElementById('lead-message')?.value.trim() || '';

    if (!name || !phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    // Build polite, structured WhatsApp message
    let whatsappText = `Hello Narasingarao,\n\n`;
    whatsappText += `My name is *${name}* (${phone}).\n`;
    whatsappText += `I am looking for: *${propertyType}* around Anakapalli / Vizag region.\n`;
    if (message) {
      whatsappText += `Requirements / Note: ${message}\n\n`;
    } else {
      whatsappText += `\n`;
    }
    whatsappText += `Please share available details and options.`;

    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/919573249190?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * 7. Smooth Scroll for Anchor Links with Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight + 10;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
