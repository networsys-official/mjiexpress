
(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    if (window.__mjiHomeInitialized) return;
    window.__mjiHomeInitialized = true;

    /* ==============================
       HOMEPAGE DATA
    ============================== */

    const services = [
      ["✈️", "Air Freight", "Fast global air cargo with priority handling."],
      ["🚢", "Sea Freight", "FCL & LCL ocean shipping at low cost."],
      ["🚚", "Road Transport", "Reliable nationwide trucking and delivery."],
      ["📦", "Courier Express", "Door-to-door parcels in 24–72 hours."],
      ["🏭", "Warehousing", "Secure storage with inventory control."],
      ["🛃", "Customs Clearance", "Hassle-free import & export documentation."],
      ["🧊", "Cold Chain", "Temperature-controlled perishable cargo."],
      ["🏗️", "Project Cargo", "Heavy and oversized equipment moves."],
      ["🛒", "E-commerce Fulfilment", "Pick, pack and ship for online stores."],
      ["📍", "Live Tracking", "Real-time GPS shipment visibility."],
      ["🛡️", "Cargo Insurance", "Full coverage for peace of mind."],
      ["📥", "Door Pickup", "Scheduled pickup from your location."],
      ["🌐", "International Shipping", "200+ countries and territories covered."],
      ["♻️", "Reverse Logistics", "Easy returns and exchange handling."],
      ["💰", "Bulk Saver Plans", "Discounted rates for regular shippers."]
    ];

    const events = [
      ["12", "NOV", "Global Logistics Summit", "Delhi • 10:00 AM"],
      ["28", "NOV", "Freight Forwarders Meet", "Mumbai • 11:30 AM"],
      ["09", "DEC", "E-commerce Shipping Expo", "Noida • 9:30 AM"],
      ["18", "DEC", "Customs & Trade Workshop", "Online • 4:00 PM"]
    ];

    const reviews = [
      ["Aarav Mehta", "Importer", "Super fast clearance and the tracking is spot on. Saved us 30% on freight!", 11],
      ["Sara Williams", "Online Seller", "MJI Xpress is our go-to courier. Zero damages, always on time.", 32],
      ["Rohit Sharma", "Manufacturer", "Professional team and truly transparent pricing. Highly recommended.", 12],
      ["Emily Chen", "Retailer", "Great support 24/7. International deliveries are now stress-free.", 45]
    ];

    const faqs = [
      ["How can I track my shipment?", "Enter your tracking number in the Tracking Order box and get live status updates instantly."],
      ["Which countries do you ship to?", "We deliver to 200+ countries through our trusted global partner network."],
      ["How do I get a shipping quote?", "Use the contact form or call us; we reply with a free quote within 24 hours."],
      ["Do you handle customs clearance?", "Yes, our experts manage all documentation and duties for smooth clearance."],
      ["Is my cargo insured?", "Optional full-value cargo insurance is available on every shipment."]
    ];

    const blogs = [
      ["Oct 28, 2026", "5 Ways to Cut International Shipping Costs", "Smart consolidation and routing tips that save money.", 21],
      ["Oct 15, 2026", "Air vs Sea Freight: Which Is Right?", "A simple guide to choosing the best mode for your cargo.", 26],
      ["Oct 02, 2026", "Packing Guide for Fragile Goods", "Keep your products safe from door to door.", 37]
    ];

    const img = (seed, width, height) =>
      `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;

    /* ==============================
       SAFE HTML RENDERING
    ============================== */

    const render = (selector, html) => {
      const element = $(selector);
      if (element) element.innerHTML = html;
    };

    render("#serviceGrid", services.map((s, i) => `
      <div class="card reveal" style="transition-delay:${(i % 4) * .1}s">
        <div class="ico" style="animation-delay:${-i * .3}s">${s[0]}</div>
        <h3>${s[1]}</h3>
        <p>${s[2]}</p>
      </div>
    `).join(""));

    render("#eventList", events.map((e, i) => `
      <div class="ev reveal" style="transition-delay:${i * .1}s">
        <div class="date">
          <b>${e[0]}</b>${e[1]}
        </div>
        <div>
          <h3>${e[2]}</h3>
          <small>📍 ${e[3]}</small>
        </div>
      </div>
    `).join(""));

    render("#slides", reviews.map(r => `
      <div class="slide">
        <img src="${img("p" + r[3], 160, 160)}"
             alt="${r[0]}"
             loading="lazy">
        <div class="stars">★★★★★</div>
        <p>${r[2]}</p>
        <h4>${r[0]}</h4>
        <small>${r[1]}</small>
      </div>
    `).join(""));

    render("#faqList", faqs.map((f, i) => `
      <div class="qa${i === 0 ? " open" : ""}">
        <button type="button" aria-expanded="${i === 0}">
          ${f[0]}<i>+</i>
        </button>
        <div>${f[1]}</div>
      </div>
    `).join(""));

    render("#blogList", blogs.map(b => `
      <article class="post reveal">
        <div class="im">
          <img loading="lazy"
               src="${img("blog" + b[3], 600, 380)}"
               alt="${b[1]}">
        </div>
        <div class="bd">
          <small>${b[0]}</small>
          <h3>${b[1]}</h3>
          <p>${b[2]}</p>
          <a href="#blog" class="more">Read More →</a>
        </div>
      </article>
    `).join(""));

    const year = $("#yr");
    if (year) year.textContent = new Date().getFullYear();

    /* ==============================
       NAVIGATION
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
       SCROLL EFFECTS
    ============================== */

    const navLinks = $$(".menu a:not(.btn)")
      .filter(link => {
        const href = link.getAttribute("href");
        return href && href.startsWith("#");
      });

    const sections = navLinks.map(link =>
      $(link.getAttribute("href"))
    );

    let scrollPending = false;

    const updateScroll = () => {
      const y = window.scrollY;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress = $("#progress");
      const nav = $("#nav");
      const topButton = $("#totop");

      if (progress) {
        progress.style.width =
          `${maxScroll > 0 ? y / maxScroll * 100 : 0}%`;
      }

      nav?.classList.toggle("stuck", y > 20);
      topButton?.classList.toggle("show", y > 600);

      let current = -1;

      sections.forEach((section, i) => {
        if (
          section &&
          section.getBoundingClientRect().top < window.innerHeight * .4
        ) {
          current = i;
        }
      });

      navLinks.forEach((link, i) => {
        link.classList.toggle("active", i === current);
      });

      scrollPending = false;
    };

    window.addEventListener("scroll", () => {
      if (!scrollPending) {
        scrollPending = true;
        requestAnimationFrame(updateScroll);
      }
    }, { passive: true });

    updateScroll();

    window.addEventListener("resize", updateScroll);

    $("#totop")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==============================
       REVEAL ANIMATIONS
    ============================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .1 });

      revealElements.forEach(element => observer.observe(element));
    } else {
      revealElements.forEach(element => element.classList.add("in"));
    }

    /* ==============================
       COUNTERS
    ============================== */

    const animateCounter = element => {
      const target = Number(element.dataset.count);
      if (!Number.isFinite(target)) return;

      const start = performance.now();

      const update = now => {
        const p = Math.min((now - start) / 2000, 1);
        const eased = 1 - Math.pow(1 - p, 3);

        element.textContent =
          Math.floor(target * eased).toLocaleString();

        if (p < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      });

      $$("[data-count]").forEach(el => counterObserver.observe(el));
    } else {
      $$("[data-count]").forEach(animateCounter);
    }

    /* ==============================
       TESTIMONIAL SLIDER
    ============================== */

    const slides = $("#slides");
    const dots = $("#dots");
    const slider = $("#slider");

    let currentSlide = 0;
    let sliderTimer = null;
    let touchStart = 0;

    if (slides && dots && slider && reviews.length) {

      render("#dots", reviews.map((_, i) => `
        <button type="button"
                aria-label="Slide ${i + 1}"></button>
      `).join(""));

      const dotButtons = $$("button", dots);

      const go = index => {
        currentSlide = (index + reviews.length) % reviews.length;

        slides.style.transform =
          `translateX(-${currentSlide * 100}%)`;

        dotButtons.forEach((dot, i) => {
          dot.classList.toggle("on", i === currentSlide);
          dot.setAttribute(
            "aria-current",
            String(i === currentSlide)
          );
        });
      };

      const stopSlider = () => {
        clearInterval(sliderTimer);
      };

      const startSlider = () => {
        stopSlider();

        if (!document.hidden) {
          sliderTimer = setInterval(() => {
            go(currentSlide + 1);
          }, 4500);
        }
      };

      dotButtons.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          go(i);
          startSlider();
        });
      });

      slider.addEventListener("mouseenter", stopSlider);
      slider.addEventListener("mouseleave", startSlider);

      slider.addEventListener("touchstart", e => {
        touchStart = e.touches[0].clientX;
      }, { passive: true });

      slider.addEventListener("touchend", e => {
        const difference =
          e.changedTouches[0].clientX - touchStart;

        if (Math.abs(difference) > 40) {
          go(currentSlide + (difference < 0 ? 1 : -1));
          startSlider();
        }
      }, { passive: true });

      document.addEventListener("visibilitychange", () => {
        document.hidden ? stopSlider() : startSlider();
      });

      go(0);
      startSlider();
    }

    /* ==============================
       FAQ ACCORDION
    ============================== */

    const qas = $$(".qa");
    const faqImage = $("#faqImg");

    let faqTimer = null;
    let faqImageTimer = null;
    let faqIndex = 0;

    const openFAQ = index => {
      if (!qas.length) return;

      faqIndex = index;

      qas.forEach((qa, i) => {
        const content = $("div", qa);
        const button = $("button", qa);
        const opened = i === index;

        qa.classList.toggle("open", opened);
        button?.setAttribute("aria-expanded", String(opened));

        if (content) {
          content.style.maxHeight = opened
            ? `${content.scrollHeight}px`
            : "0px";
        }
      });

      if (faqImage) {
        clearTimeout(faqImageTimer);

        faqImage.classList.add("swap");

        faqImageTimer = setTimeout(() => {
          faqImage.src = img("faq" + index, 700, 600);

          faqImage.onload = () => {
            faqImage.classList.remove("swap");
          };

          faqImage.onerror = () => {
            faqImage.classList.remove("swap");
          };
        }, 250);
      }
    };

    qas.forEach((qa, i) => {
      $("button", qa)?.addEventListener("click", () => {
        const isOpen = qa.classList.contains("open");

        if (isOpen) {
          qa.classList.remove("open");
          const content = $("div", qa);
          if (content) content.style.maxHeight = "0px";
          $("button", qa)?.setAttribute("aria-expanded", "false");
        } else {
          openFAQ(i);
        }
      });
    });

    if (qas.length) {
      const initial = qas.findIndex(qa =>
        qa.classList.contains("open")
      );

      openFAQ(initial >= 0 ? initial : 0);

      faqTimer = setInterval(() => {
        if (
          document.hidden ||
          qas.some(qa => qa.matches(":hover")) ||
          qas.some(qa => qa.contains(document.activeElement))
        ) return;

        openFAQ((faqIndex + 1) % qas.length);
      }, 7000);
    }

    /* ==============================
       BUTTON RIPPLE
    ============================== */

    document.addEventListener("click", e => {
      const button = e.target.closest(".btn");
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);

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

    /* ==============================
       TRACKING FORM - DEMO
    ============================== */

    const trackForm = $("#trackForm");

    trackForm?.addEventListener("submit", e => {
      e.preventDefault();

      const number = $("#trackNo")?.value.trim();
      const result = $("#trackRes");

      if (!number || !result) return;

      result.textContent = "Searching...";

      setTimeout(() => {
        result.textContent =
          `Order ${number.toUpperCase()}: Demo status – In transit. Connect your tracking API for live updates.`;
      }, 900);
    });

    /* ==============================
       CONTACT FORM - DEMO
    ============================== */

    const contactForm = $("#contactForm");

    contactForm?.addEventListener("submit", e => {
      e.preventDefault();

      const note = $("#formNote");
      if (!note) return;

      let valid = true;

      $$("[required]", contactForm).forEach(input => {
        const value = input.value.trim();

        const invalid =
          !value ||
          (input.type === "email" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

        input.classList.toggle("err", invalid);

        if (invalid) valid = false;
      });

      if (valid) {
        note.style.color = "green";
        note.textContent =
          "Thank you! We will contact you shortly.";

        contactForm.reset();
      } else {
        note.style.color = "#d33";
        note.textContent =
          "Please fill all required fields correctly.";
      }
    });

    console.log("MJI Xpress Homepage initialized.");

  });

})();
