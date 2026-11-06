/* =========================================
   MJI XPRESS GLOBAL - FOOTER ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footer = document.querySelector(".mji-footer");

    if (!footer) return;

    /* Dynamic copyright year */

    const yearElement = footer.querySelector("#footer-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* Scroll reveal animation */

    const revealElements = footer.querySelectorAll(".footer-reveal");

    if ("IntersectionObserver" in window) {

        const footerObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(function (element) {
            footerObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });

    }

});