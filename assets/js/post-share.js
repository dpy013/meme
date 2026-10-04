window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-copy-link]').forEach((button) => {
        const label = button.dataset.copyLabel;
        const copiedLabel = button.dataset.copiedLabel;
        const failedLabel = button.dataset.copyFailedLabel;

        button.addEventListener('click', async () => {
            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(button.dataset.copyLink);
                } else {
                    const input = document.createElement('textarea');
                    input.value = button.dataset.copyLink;
                    input.style.position = 'fixed';
                    input.style.opacity = '0';
                    document.body.appendChild(input);
                    input.select();
                    if (!document.execCommand('copy')) throw new Error('Copy failed');
                    input.remove();
                }
                button.textContent = copiedLabel;
            } catch (_) {
                button.textContent = failedLabel;
            }
            window.setTimeout(() => { button.textContent = label; }, 1200);
        });
    });
}, { once: true });