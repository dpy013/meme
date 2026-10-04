window.addEventListener('DOMContentLoaded', () => {
    const postBody = document.querySelector('.post-body');
    postBody?.querySelectorAll('h2, h3, h4, h5, h6').forEach((heading) => {
        heading.classList.add('shortcut-x');
        heading.tabIndex = -1;
    });

    document.querySelectorAll('[data-shortcut]').forEach((target) => {
        target.classList.add(`shortcut-${target.dataset.shortcut}`);
        target.removeAttribute('data-shortcut');
    });

    document.addEventListener('keydown', (event) => {
        if (!event.altKey || event.shiftKey || event.ctrlKey || event.metaKey || event.key.length !== 1) return;
        const shortcut = event.key.toLowerCase();
        if (shortcut !== 'x' && shortcut !== 'z') return;

        const targets = [...document.querySelectorAll(`.shortcut-${shortcut}`)]
            .filter((target) => !target.hasAttribute('disabled') && target.getAttribute('aria-hidden') !== 'true' && target.getClientRects().length);
        if (!targets.length) return;

        event.preventDefault();
        const current = targets.indexOf(document.activeElement);
        const target = targets[(current + 1) % targets.length];
        target.closest('#back-to-top')?.classList.add('show');
        target.focus({ preventScroll: false });
    });
}, { once: true });
