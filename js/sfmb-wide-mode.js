;(function () {
    'use strict';

    const STORAGE_KEY = 'sfmb-wiki-wide';
    const root = document.documentElement;

    function updateButton(button) {
        const enabled = root.classList.contains('sfmb-wide');
        button.setAttribute('aria-pressed', String(enabled));
        button.textContent = enabled ? 'NORMAL' : 'WIDE';
        button.title = enabled
            ? 'Use the normal SFMB Wiki layout'
            : 'Use a wider SFMB Wiki layout';
    }

    function init() {
        const button = document.getElementById('sfmb-wide-toggle');
        if (!button) return;
        updateButton(button);
        button.addEventListener('click', function () {
            root.classList.toggle('sfmb-wide');
            try {
                localStorage.setItem(STORAGE_KEY, String(root.classList.contains('sfmb-wide')));
            } catch (error) {}
            updateButton(button);
        });
    }

    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', init);
    else
        init();
})();
