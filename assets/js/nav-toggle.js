window.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".nav-toggle");
    const header = document.querySelector(".header");
    const curtain = document.querySelector(".nav-curtain");
    const menu = document.getElementById("menu");

    if (!button || !header || !curtain || !menu) return;

    const close = ({ restoreFocus = false, immediate = false } = {}) => {
        if (button.getAttribute("aria-expanded") !== "true") return;

        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", button.dataset.openLabel);
        button.classList.remove("open");
        header.classList.remove("open");

        if (immediate) {
            header.classList.remove("fade");
            curtain.removeAttribute("style");
        } else {
            header.classList.add("fade");
        }

        if (restoreFocus) button.focus();
    };

    const open = () => {
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("aria-label", button.dataset.closeLabel);
        button.classList.add("open");
        header.classList.remove("fade");
        header.classList.add("open");
        curtain.style.display = "block";
    };

    button.addEventListener("click", () => {
        button.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    curtain.addEventListener("click", () => close({ restoreFocus: true }));
    curtain.addEventListener("animationend", () => {
        if (button.getAttribute("aria-expanded") === "false") curtain.removeAttribute("style");
    });
    menu.addEventListener("click", event => {
        if (event.target.closest("a")) close({ immediate: true });
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") close({ restoreFocus: true });
    });

    const maxWidth = getComputedStyle(document.documentElement).getPropertyValue("--max-width");
    const mediaQuery = matchMedia(`(max-width: ${maxWidth})`);
    mediaQuery.addEventListener("change", event => {
        if (!event.matches) close({ immediate: true });
    });
    window.addEventListener("scroll", () => close(), { passive: true });
}, { once: true });
