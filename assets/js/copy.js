{{ $src := partial "utils/lib.html" (dict "$" . "type" "clipboard") }}

window.addEventListener("DOMContentLoaded", () => {
    const copyText = '{{ i18n "copy" }}';
    const copiedText = '{{ i18n "copied" }}';
    const copyCodeText = '{{ i18n "copyCode" }}';
    const copyQuoteText = '{{ i18n "copyQuote" }}';

    document.querySelectorAll('.post-body > pre').forEach((pre) => {
        const wrapper = document.createElement('div');
        pre.parentNode.replaceChild(wrapper, pre);
        wrapper.appendChild(pre);
    });

    function addCopyButtons(clipboard) {
        const targets = document.querySelectorAll('table.lntable, .highlight > pre, .post-body > div > pre, .post-body blockquote');

        targets.forEach((target) => {
            const quoteText = target.matches('blockquote') ? target.innerText : null;
            const codeBlock = target.classList.contains('lntable')
                ? target.querySelectorAll('.lntd')[1]
                : target.querySelector('code');
            if (!quoteText && !codeBlock) return;

            target.style.position = 'relative';
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.type = 'button';
            button.innerText = copyText;
            button.setAttribute('aria-label', target.matches('blockquote') ? copyQuoteText : copyCodeText);
            button.title = button.getAttribute('aria-label');

            button.addEventListener('click', () => {
                clipboard.writeText(quoteText || codeBlock.innerText).then(() => {
                    button.innerText = copiedText;
                    window.setTimeout(() => { button.innerText = copyText; }, 1000);
                }).catch((error) => {
                    button.innerText = 'Error';
                    console.error(error);
                });
            });
            target.appendChild(button);
        });
    }

    if (navigator.clipboard) {
        addCopyButtons(navigator.clipboard);
    } else {
        const script = document.createElement('script');
        script.src = '{{ $src }}';
        script.defer = true;
        script.onload = () => addCopyButtons(clipboard);
        document.head.appendChild(script);
    }
}, { once: true });
