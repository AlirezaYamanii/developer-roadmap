document.addEventListener('DOMContentLoaded', () => {
  // --- Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');

  // Check if device supports hover (ignore touch devices)
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorOutline) {
    document.body.classList.add('custom-cursor-active');
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot follows exactly
      cursorDot.style.transform = `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`;

      // Outline follows with slight delay using requestAnimationFrame
      cursorOutline.animate(
        {
          transform: `translate(calc(${posX}px - 50%), calc(${posY}px - 50%))`,
        },
        { duration: 500, fill: 'forwards' },
      );
    });

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('cursor-hover');
        cursorDot.style.backgroundColor = 'transparent';
      });
      el.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('cursor-hover');
        cursorDot.style.backgroundColor = 'var(--accent-color)';
      });
    });
  }

  // --- Theme Toggle (Dark/Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Check for saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Scroll Animations (Intersection Observer) ---
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const skillProgressBars = document.querySelectorAll('.skill-progress');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add visible class for fade-up elements
        entry.target.classList.add('visible');

        // Animate skill bars if they are in the viewport
        if (entry.target.classList.contains('skills-wrapper')) {
          skillProgressBars.forEach((bar) => {
            bar.classList.add('animate');
          });
        }

        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach((el) => {
    scrollObserver.observe(el);
  });

  // Observe skills wrapper specifically to trigger bars
  const skillsWrapper = document.querySelector('.skills-wrapper');
  if (skillsWrapper) {
    scrollObserver.observe(skillsWrapper);
  }
});
