/**
 * ============================================================================
 * MOHAMED HANY — PORTFOLIO CLIENT JAVASCRIPT
 * Features: Dark/Light Mode, Mobile Navigation, Scroll-Spy, Scroll Reveals,
 * Form Validation, Back-To-Top Controller
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE CONTROLLER (DEFAULT: DARK MODE)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('mh_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('mh_portfolio_theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileMenu() {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenuBtn.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // Close mobile drawer when clicking any nav link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile drawer when clicking outside
  document.addEventListener('click', (event) => {
    if (
      mobileDrawer &&
      mobileDrawer.classList.contains('open') &&
      !mobileDrawer.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close mobile drawer on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. STICKY HEADER SCROLL EFFECT
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // --------------------------------------------------------------------------
  // 4. SCROLL-SPY ACTIVE NAVIGATION STATE
  // --------------------------------------------------------------------------
  const navSections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav .mobile-nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120; // Header offset buffer

    navSections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Desktop links
        desktopLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Mobile links
        mobileLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --------------------------------------------------------------------------
  // 5. VIEWPORT SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Trigger once
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // --------------------------------------------------------------------------
  // 6. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
  handleBackToTopVisibility();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6.1 HERO TYPEWRITER EFFECT (ROTATING ROLES)
  // --------------------------------------------------------------------------
  const typedRoleEl = document.getElementById('typedRole');

  if (typedRoleEl) {
    const roles = [
      'Data Analyst',
      'Cloud Computing Enthusiast',
      'SQL & Power BI Developer',
      'AWS Cloud Foundations',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeTick() {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        charIndex += 1;
        typedRoleEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeTick, 1800);
          return;
        }
        setTimeout(typeTick, 70);
      } else {
        charIndex -= 1;
        typedRoleEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeTick, 350);
          return;
        }
        setTimeout(typeTick, 38);
      }
    }

    typeTick();
  }

  // --------------------------------------------------------------------------
  // 6.2 ANIMATED STAT COUNTERS (FIRST IMPRESSION NUMBERS)
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-num');

  function animateCountUp(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const countersObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statNumbers.forEach((el) => countersObserver.observe(el));
  } else {
    statNumbers.forEach((el) => {
      el.textContent = el.dataset.target || '0';
    });
  }

  // --------------------------------------------------------------------------
  // 6.3 ANIMATED SKILL BARS (PROFICIENCY BREAKDOWN)
  // --------------------------------------------------------------------------
  const skillBarFills = document.querySelectorAll('.bar-fill');

  if ('IntersectionObserver' in window) {
    const barsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width || '0%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    skillBarFills.forEach((el) => barsObserver.observe(el));
  } else {
    skillBarFills.forEach((el) => {
      el.style.width = el.dataset.width || '0%';
    });
  }

  // --------------------------------------------------------------------------
  // Bar percentage values count up next to each bar
  // --------------------------------------------------------------------------
  const barValues = document.querySelectorAll('.bar-value');

  if ('IntersectionObserver' in window) {
    const barValueObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.value, 10) || 0;
            const duration = 1200;
            const startTime = performance.now();

            function tickValue(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = `${Math.round(target * eased)}%`;
              if (progress < 1) {
                requestAnimationFrame(tickValue);
              } else {
                el.textContent = `${target}%`;
              }
            }
            requestAnimationFrame(tickValue);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.35 }
    );
    barValues.forEach((el) => barValueObserver.observe(el));
  } else {
    barValues.forEach((el) => {
      el.textContent = `${el.dataset.value || 0}%`;
    });
  }

  // --------------------------------------------------------------------------
  // 7. CLIENT-SIDE CONTACT FORM VALIDATION & HANDLING
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const subjectInput = document.getElementById('userSubject');
  const messageInput = document.getElementById('userMessage');
  const successNotice = document.getElementById('formSuccessNotice');
  const submitBtn = document.getElementById('submitBtn');

  // Error label elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  function isValidEmail(email) {
    // RFC 5322 compatible email regex standard
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function clearErrors() {
    const inputs = [nameInput, emailInput, subjectInput, messageInput];
    const errors = [nameError, emailError, subjectError, messageError];

    inputs.forEach((input) => {
      if (input) input.classList.remove('input-error');
    });

    errors.forEach((err) => {
      if (err) err.textContent = '';
    });
  }

  if (contactForm) {
    // Real-time input error removal on typing
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const errorSpan = document.getElementById(
            input.id.replace('user', '').toLowerCase() + 'Error'
          );
          if (errorSpan) errorSpan.textContent = '';
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        nameError.textContent = 'Please enter your name.';
        hasError = true;
      }

      // Validate Email
      if (!emailInput.value.trim()) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter your email address.';
        hasError = true;
      } else if (!isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('input-error');
        emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('input-error');
        subjectError.textContent = 'Please enter a subject for your inquiry.';
        hasError = true;
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('input-error');
        messageError.textContent = 'Please enter your message.';
        hasError = true;
      } else if (messageInput.value.trim().length < 10) {
        messageInput.classList.add('input-error');
        messageError.textContent = 'Message must be at least 10 characters long.';
        hasError = true;
      }

      if (hasError) {
        return;
      }

      // Build a prefilled WhatsApp message with the submitted details
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      const text = encodeURIComponent(
        'Hi Mohamed Hany,\n\n' +
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Subject: ' + subject + '\n\n' +
        'Message:\n' + message
      );

      const whatsappNumber = '201095342259';
      const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + text;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Opening WhatsApp...</span>';
      }

      if (successNotice) {
        successNotice.classList.add('show');
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span>';
        }
        if (successNotice) {
          successNotice.classList.remove('show');
        }
      }, 6000);
    });
  }
});
