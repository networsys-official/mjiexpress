
(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    if (window.__mjiAboutInitialized) return;
    window.__mjiAboutInitialized = true;

    /* ==============================
       TIMELINE DATA
    ============================== */

    const steps = [
      ["2009", "The Beginning",
        "Started with two vehicles and a promise of on-time delivery."],

      ["2013", "National Network",
        "Expanded courier and road freight across every major Indian city."],

      ["2016", "Going International",
        "Launched air and sea freight to 50+ countries."],

      ["2019", "Smart Tracking",
        "Introduced real-time GPS tracking and a customer portal."],

      ["2022", "Global Reach",
        "Network grew to 200+ countries with 500+ team members."],

      ["2026", "The Future",
        "Investing in green logistics and AI-driven route planning."]
    ];

    /* ==============================
       TIMELINE RENDER
    ============================== */

    const timeline = $("#timeline");

    if (timeline) {
      timeline.insertAdjacentHTML(
        "beforeend",
        steps.map((s, i) => `
          <div class="tli reveal"
               style="transition-delay:${i * .1}s">
            <div class="tli__b">
              <b>${s[0]}</b>
              <h3>${s[1]}</h3>
              <p>${s[2]}</p>
            </div>
          </div>
        `).join("")
      );
    }

    /* ==============================
       FOOTER YEAR
    ============================== */

    const year = $("#yr");

    if (year) {
      year.textContent = new Date().getFullYear();
    }

    /* ==============================
       MOBILE NAVIGATION
    ============================== */

    const burger = $("#burger");
    const menu = $("#menu");

    const closeMenu = () => {
      menu?.classList.remove("open");
      burger?.classList.remove("open");
      burger?.setAttribute("aria-expanded", "false");
    };

    if (burger && menu) {
      burger.addEventListener("click", () => {
        const opened = menu.classList.toggle("open");

        burger.classList.toggle("open", opened);
        burger.setAttribute("aria-expanded", String(opened));
      });

      $$("a", menu).forEach(link => {
        link.addEventListener("click", closeMenu);
      });
    }

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMenu();
    });

    /* ==============================
       SCROLL PROGRESS & NAVBAR
    ============================== */

    const progress = $("#progress");
    const nav = $("#nav");
    const topButton = $("#totop");
    const timelineFill = $("#tlFill");

    let scrollPending = false;

    const updateScroll = () => {
      const y = window.scrollY;

      const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (progress) {
        progress.style.width =
          `${maxScroll > 0 ? y / maxScroll * 100 : 0}%`;
      }

      nav?.classList.toggle("stuck", y > 20);
      topButton?.classList.toggle("show", y > 600);

      if (timeline && timelineFill) {
        const rect = timeline.getBoundingClientRect();

        const percentage = Math.min(
          Math.max(
            (window.innerHeight * .6 - rect.top) /
            Math.max(rect.height, 1),
            0
          ),
          1
        );

        timelineFill.style.height =
          `${percentage * 100}%`;
      }

      scrollPending = false;
    };

    window.addEventListener("scroll", () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(updateScroll);
      }
    }, { passive: true });

    window.addEventListener("resize", updateScroll);

    updateScroll();

    /* ==============================
       BACK TO TOP
    ============================== */

    topButton?.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    /* ==============================
       REVEAL ANIMATIONS
    ============================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

      const revealObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: .08,
          rootMargin: "0px 0px 40px 0px"
        }
      );

      revealElements.forEach(element => {
        revealObserver.observe(element);
      });

    } else {
      revealElements.forEach(element => {
        element.classList.add("in");
      });
    }

    /* ==============================
       ANIMATED COUNTERS
    ============================== */

    const animateCounter = element => {
      const target = Number(element.dataset.count);

      if (!Number.isFinite(target)) return;

      const start = performance.now();
      const duration = 2000;

      const update = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);

        element.textContent =
          Math.floor(target * eased).toLocaleString();

        if (p < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(update);
    };

    const counters = $$("[data-count]");

    if ("IntersectionObserver" in window) {

      const counterObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              counterObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: .5 }
      );

      counters.forEach(counter => {
        counterObserver.observe(counter);
      });

    } else {
      counters.forEach(animateCounter);
    }

    /* ==============================
       CONTACT FORM VALIDATION
    ============================== */

    const contactForm = $("#contactForm");
    const formNote = $("#formNote");

    if (contactForm) {

      contactForm.addEventListener("submit", e => {
        e.preventDefault();

        let valid = true;

        const fields = $$("[required]", contactForm);

        fields.forEach(input => {
          const value = input.value.trim();

          const invalid =
            !value ||
            (input.type === "email" &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

          input.classList.toggle("err", invalid);

          input.setAttribute(
            "aria-invalid",
            String(invalid)
          );

          if (invalid) valid = false;
        });

        if (!formNote) return;

        if (valid) {
          formNote.style.color = "green";

          formNote.textContent =
            "Thank you! We will contact you shortly.";

          contactForm.reset();

          fields.forEach(input => {
            input.classList.remove("err");
            input.setAttribute("aria-invalid", "false");
          });

        } else {
          formNote.style.color = "#d33";

          formNote.textContent =
            "Please fill all required fields correctly.";
        }
      });

      $$("input, textarea", contactForm).forEach(input => {
        input.addEventListener("input", () => {
          input.classList.remove("err");
          input.setAttribute("aria-invalid", "false");
        });
      });
    }

    /* ==============================
       SMOOTH INTERNAL NAVIGATION
    ============================== */

    $$('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = $(href);

        if (!target) return;

        e.preventDefault();

        closeMenu();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });

    /* ==============================
       BUTTON RIPPLE EFFECT
    ============================== */

    document.addEventListener("click", e => {
      const button = e.target.closest(".btn");

      if (!button) return;

      const rect = button.getBoundingClientRect();

      const diameter = Math.max(
        rect.width,
        rect.height
      );

      const ripple = document.createElement("span");

      ripple.className = "ripple";

      ripple.style.cssText = `
        width:${diameter}px;
        height:${diameter}px;
        left:${e.clientX - rect.left - diameter / 2}px;
        top:${e.clientY - rect.top - diameter / 2}px;
      `;

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });

    console.log("MJI Xpress About page initialized.");

  });

})();
