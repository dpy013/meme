window.addEventListener("DOMContentLoaded", event => {
    {{ if .Site.Params.autoLoadComments }}
        if (typeof loadComments === 'function') {
            loadComments()
        }
    {{ else }}
        const commentsToggle = document.getElementById('load-comments');

        if (commentsToggle !== null) {
            commentsToggle.addEventListener('click', function () {
                loadComments();
                this.hidden = true;
            });
        }
    {{  end }}
}, {once: true});
