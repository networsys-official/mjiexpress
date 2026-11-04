(() => {
  'use strict';
  const ready = () => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const nav = $('#nav');
    const burger = $('#burger');
    const menu = $('#menu');
    const progress = $('#progress');
    const toTop = $('#toTop');

    // Mobile navigation
    const closeMenu = () => {
      menu?.classList.remove('open');
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    };
    burger?.addEventListener('click', () => {
      const opened = menu?.classList.toggle('open') ?? false;
      burger.classList.toggle('open', opened);
      burger.setAttribute('aria-expanded', String(opened));
      burger.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', opened);
    });
    $$('#menu a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    document.addEventListener('click', event => {
      if (menu?.classList.contains('open') && !menu.contains(event.target) && !burger?.contains(event.target)) closeMenu();
    });

    // Scroll progress, sticky header and back-to-top control
    let scrollQueued = false;
    const updateScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      nav?.classList.toggle('scrolled', y > 12);
      toTop?.classList.toggle('visible', y > 500);
      scrollQueued = false;
    };
    window.addEventListener('scroll', () => {
      if (!scrollQueued) {
        scrollQueued = true;
        window.requestAnimationFrame(updateScroll);
      }
    }, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();
    toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Reveal elements as they enter the viewport
    const revealItems = $$('.reveal');
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
      revealItems.forEach(item => revealObserver.observe(item));
    } else {
      revealItems.forEach(item => item.classList.add('is-visible'));
    }

    // Animated button ripple
    document.addEventListener('click', event => {
      const button = event.target.closest('.btn');
      if (!button || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = `${diameter}px`;
      ripple.style.height = `${diameter}px`;
      ripple.style.left = `${event.clientX - rect.left - diameter / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - diameter / 2}px`;
      button.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    });

    // Front-end validation. Connect this form to a backend/email service for delivery.
    const form = $('#contactForm');
    const feedback = $('#formFeedback');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    form?.addEventListener('submit', event => {
      event.preventDefault();
      if (!form || !feedback) return;
      let valid = true;
      const requiredFields = $$('[required]', form);
      requiredFields.forEach(field => {
        const fieldWrap = field.closest('.field');
        const value = field.value.trim();
        const invalid = !value || (field.type === 'email' && !emailPattern.test(value));
        fieldWrap?.classList.toggle('invalid', invalid);
        field.setAttribute('aria-invalid', String(invalid));
        if (invalid) valid = false;
      });
      feedback.className = 'form-feedback';
      if (!valid) {
        feedback.textContent = 'Please complete the required fields with a valid email address.';
        feedback.classList.add('error');
        const firstInvalid = $('.field.invalid input, .field.invalid textarea, .field.invalid select', form);
        firstInvalid?.focus();
        return;
      }
      feedback.textContent = 'Thanks! Your details are validated. Connect a form backend to receive and store enquiries.';
      feedback.classList.add('success');
      // No fake submission is performed: HTML/CSS/JS alone cannot deliver this enquiry to your inbox.
    });
    $$('input, textarea, select', form || document).forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.closest('.field')?.classList.remove('invalid');
          field.setAttribute('aria-invalid', 'false');
        }
      });
      field.addEventListener('change', () => {
        if (field.value.trim()) field.closest('.field')?.classList.remove('invalid');
      });
    });

    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
