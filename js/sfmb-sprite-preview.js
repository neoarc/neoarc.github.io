;(function () {
    'use strict';

    const DATA_URL = '/resource/sfmb/sprite-preview-data.json';
    const animationPreviews = [];

    function setFrame(pixels, frame, size) {
        const width = frame.rect[2] - frame.rect[0];
        const height = frame.rect[3] - frame.rect[1];
        const scale = Math.min(4, (size - 8) / Math.max(width, height));
        pixels.style.width = `${width}px`;
        pixels.style.height = `${height}px`;
        pixels.style.backgroundImage = `url("${frame.image}")`;
        pixels.style.backgroundPosition = `-${frame.rect[0]}px -${frame.rect[1]}px`;
        pixels.style.setProperty('--frame-scale', String(scale));
    }

    function toggleBackground(button) {
        const isDark = button.classList.toggle('is-dark');
        button.setAttribute('aria-pressed', String(isDark));
    }

    function makeFrame(frame, size) {
        const width = frame.rect[2] - frame.rect[0];
        const height = frame.rect[3] - frame.rect[1];
        const box = document.createElement('button');
        const pixels = document.createElement('span');

        box.type = 'button';
        box.className = 'sfmb-frame';
        box.title = `Frame ${frame.index} · ${width}×${height} · Click to toggle background`;
        box.setAttribute('aria-label', `Frame ${frame.index}, ${width} by ${height}. Toggle dark background`);
        box.setAttribute('aria-pressed', 'false');
        pixels.className = 'sfmb-frame-pixels';
        setFrame(pixels, frame, size);
        box.appendChild(pixels);
        box.addEventListener('click', () => toggleBackground(box));
        return box;
    }

    function makeAnimationPreview(animation) {
        const button = makeFrame(animation.frames[0], 50);
        button.classList.add('sfmb-animation-preview');
        button.setAttribute('aria-label', 'Slow animation preview. Toggle dark background');
        animationPreviews.push({
            animation,
            button,
            pixels: button.querySelector('.sfmb-frame-pixels'),
            frameIndex: 0,
            nextFrameAt: performance.now() + animationDelay(animation.delay),
        });
        return button;
    }

    function animationDelay(delay) {
        if (!Number.isFinite(delay)) return 450;
        return Math.max(350, Math.min(800, delay * 50));
    }

    function animate(now) {
        animationPreviews.forEach((preview) => {
            if (now < preview.nextFrameAt || preview.animation.frames.length < 2) return;
            preview.frameIndex = (preview.frameIndex + 1) % preview.animation.frames.length;
            const frame = preview.animation.frames[preview.frameIndex];
            setFrame(preview.pixels, frame, 50);
            preview.nextFrameAt = now + animationDelay(preview.animation.delay);
        });
        requestAnimationFrame(animate);
    }

    function enhanceIndex(data) {
        document.querySelectorAll('.post-content h1').forEach((heading) => {
            const section = data.index[heading.textContent.trim()];
            if (!section) return;

            let codeContainer = heading.nextElementSibling;
            while (codeContainer &&
                   codeContainer.tagName !== 'PRE' &&
                   !codeContainer.querySelector('pre') &&
                   !/^H[1-6]$/.test(codeContainer.tagName)) {
                codeContainer = codeContainer.nextElementSibling;
            }
            if (!codeContainer || /^H[1-6]$/.test(codeContainer.tagName)) return;

            const codeBlock = codeContainer.tagName === 'PRE'
                ? codeContainer
                : codeContainer.querySelector('pre');

            const list = document.createElement('ul');
            list.className = 'sprite-frame-list';

            codeBlock.textContent.split(/\r?\n/).forEach((line) => {
                const match = line.trim().match(/^(.*?)\s*=\s*(\d+)$/);
                if (!match) return;

                const index = Number(match[2]);
                const entry = document.createElement('li');
                const label = document.createElement('code');
                const number = document.createElement('span');
                entry.className = 'sprite-frame-entry';
                label.textContent = match[1];
                number.className = 'sprite-frame-index';
                number.textContent = `INDEX ${index}`;

                if (section.frames[index])
                    entry.appendChild(makeFrame(section.frames[index], 50));
                else
                    entry.appendChild(document.createElement('span'));
                entry.appendChild(label);
                entry.appendChild(number);
                list.appendChild(entry);
            });

            codeContainer.replaceWith(list);
        });
    }

    function enhanceNamedAnimations(data) {
        document.querySelectorAll('.post-content h2').forEach((heading) => {
            const animations = data.named[heading.textContent.trim()];
            if (!animations) return;

            let list = heading.nextElementSibling;
            while (list && list.tagName !== 'UL' && !/^H[1-6]$/.test(list.tagName))
                list = list.nextElementSibling;
            if (!list || list.tagName !== 'UL') return;

            list.querySelectorAll(':scope > li').forEach((item) => {
                const animation = animations[item.textContent.trim()];
                if (!animation || animation.frames.length === 0) return;

                const previews = document.createElement('span');
                const strip = document.createElement('span');
                const staticGroup = document.createElement('span');
                const animatedGroup = document.createElement('span');
                const staticLabel = document.createElement('span');
                const animatedLabel = document.createElement('span');
                previews.className = 'named-animation-previews';
                staticGroup.className = 'named-animation-preview-group';
                animatedGroup.className = 'named-animation-preview-group';
                staticLabel.className = 'named-animation-preview-label';
                animatedLabel.className = 'named-animation-preview-label';
                staticLabel.textContent = 'FRAMES';
                animatedLabel.textContent = 'ANIMATION';
                strip.className = 'named-animation-frames';
                animation.frames.forEach((frame) =>
                    strip.appendChild(makeFrame(frame, 38)));
                staticGroup.append(staticLabel, strip);
                animatedGroup.append(animatedLabel, makeAnimationPreview(animation));
                previews.append(staticGroup, animatedGroup);
                item.appendChild(previews);
            });
        });

        const content = document.querySelector('.post-content');
        if (content && Object.keys(data.named).length > 0) {
            const label = document.createElement('p');
            label.className = 'named-animation-theme';
            label.textContent = `PREVIEW THEME: ${data.theme}`;
            const firstHeading = content.querySelector('h1');
            if (firstHeading) content.insertBefore(label, firstHeading);
        }
    }

    function enhanceTitle(data) {
        const title = document.querySelector('.sfmb-game-title');
        const section = data.index['Etc.sprite'];
        const frame = section && section.frames[0];
        if (!title || !frame) return;

        const width = frame.rect[2] - frame.rect[0];
        const height = frame.rect[3] - frame.rect[1];
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();
        if (!context || width <= 0 || height <= 0) return;

        canvas.width = width;
        canvas.height = height;
        canvas.setAttribute('aria-hidden', 'true');
        context.imageSmoothingEnabled = false;
        image.addEventListener('load', () => {
            context.drawImage(
                image,
                frame.rect[0], frame.rect[1], width, height,
                0, 0, width, height);
            title.replaceChildren(canvas);
        });
        image.addEventListener('error', () =>
            console.warn('SFMB title atlas could not be loaded.'));
        image.src = frame.image;
    }

    function init() {
        fetch(DATA_URL)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((data) => {
                enhanceIndex(data);
                enhanceNamedAnimations(data);
                enhanceTitle(data);
                if (animationPreviews.length > 0) requestAnimationFrame(animate);
            })
            .catch((error) => console.warn('SFMB sprite preview data could not be loaded.', error));
    }

    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', init);
    else
        init();
})();
