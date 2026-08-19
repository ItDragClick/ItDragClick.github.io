/**
 * Portfolio Website Interactive Script for ItDragClick
 * Features: Lucide Icons, Theme Switcher, Mobile Nav, Dynamic Filtering, Active Nav Indicator, Discord Copy Notification
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Set Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Theme Toggle (Dark & Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOpenIcon = document.querySelector('.menu-open-icon');
  const menuCloseIcon = document.querySelector('.menu-close-icon');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      if (menuOpenIcon && menuCloseIcon) {
        menuOpenIcon.style.display = isOpen ? 'none' : 'block';
        menuCloseIcon.style.display = isOpen ? 'block' : 'none';
      }
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (menuOpenIcon && menuCloseIcon) {
          menuOpenIcon.style.display = 'block';
          menuCloseIcon.style.display = 'none';
        }
      });
    });
  }

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 6. Project Filtering Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. Discord Copy to Clipboard & Toast Feedback
  const copyDiscordBtn = document.getElementById('copy-discord-btn');
  const heroDiscordBtn = document.getElementById('discord-hero-btn');
  const toast = document.getElementById('toast');
  let toastTimeout;

  const showToast = () => {
    if (!toast) return;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  const copyDiscordHandle = () => {
    const discordHandle = 'itdragclick';
    navigator.clipboard.writeText(discordHandle).then(() => {
      showToast();
      if (copyDiscordBtn) {
        const btnText = copyDiscordBtn.querySelector('.btn-copy-text');
        if (btnText) {
          const originalText = btnText.textContent;
          btnText.textContent = 'Copied! ✓';
          setTimeout(() => {
            btnText.textContent = originalText;
          }, 2500);
        }
      }
    }).catch(err => {
      console.error('Failed to copy: ', err);
      // Fallback
      prompt('Copy Discord Handle:', '@itdragclick');
    });
  };

  if (copyDiscordBtn) {
    copyDiscordBtn.addEventListener('click', copyDiscordHandle);
  }

  if (heroDiscordBtn) {
    heroDiscordBtn.addEventListener('click', () => {
      copyDiscordHandle();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});
