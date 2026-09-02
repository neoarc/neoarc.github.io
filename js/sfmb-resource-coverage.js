;(function () {
    'use strict';

    const DATA_URL = '/resource/sfmb/resource-coverage-data.json';

    function makeIcon(frame, className) {
        const box = document.createElement('span');
        if (!frame || !Array.isArray(frame.rect) || frame.rect.length !== 4) {
            box.className = `${className} is-missing`;
            box.setAttribute('aria-hidden', 'true');
            return box;
        }

        const width = frame.rect[2] - frame.rect[0];
        const height = frame.rect[3] - frame.rect[1];
        const pixels = document.createElement('span');
        const scale = Math.min(1, 24 / Math.max(width, height));
        box.className = frame.outline === 'dark' ? `${className} needs-dark-outline` : className;
        box.setAttribute('aria-hidden', 'true');
        pixels.className = 'sfmb-coverage-icon-pixels';
        pixels.style.width = `${width}px`;
        pixels.style.height = `${height}px`;
        pixels.style.backgroundImage = `url("${frame.image}")`;
        pixels.style.backgroundPosition = `-${frame.rect[0]}px -${frame.rect[1]}px`;
        pixels.style.setProperty('--coverage-icon-scale', String(scale));
        box.appendChild(pixels);
        return box;
    }

    function makeThemeHeader(theme, stats) {
        const heading = document.createElement('th');
        const name = document.createElement('span');
        const coverage = document.createElement('span');
        heading.scope = 'col';
        heading.className = 'sfmb-coverage-theme';
        heading.title = theme.baseTheme
            ? `${theme.name} (${theme.id}) · ${stats.covered}/${stats.total} complete, ${stats.partial} partial (${stats.percent}%) · Base Theme: ${theme.baseTheme}`
            : `${theme.name} (${theme.id}) · ${stats.covered}/${stats.total} complete, ${stats.partial} partial (${stats.percent}%)`;
        heading.appendChild(makeIcon(theme.icon, 'sfmb-coverage-theme-icon'));
        name.className = 'sfmb-coverage-theme-name';
        name.textContent = theme.id;
        heading.appendChild(name);
        coverage.className = 'sfmb-coverage-theme-count';
        coverage.textContent = stats.partial
            ? `${stats.covered}/${stats.total}\n△${stats.partial}`
            : `${stats.covered}/${stats.total}`;
        coverage.textContent += `\n${stats.frames.toLocaleString()}f`;
        if (stats.unknownFrames) coverage.textContent += ` +${stats.unknownFrames}?`;
        coverage.setAttribute('aria-label', `${stats.percent}% complete, ${stats.partial} partial, ${stats.frames} known actual frames, ${stats.unknownFrames} frame counts unavailable`);
        heading.appendChild(coverage);
        return heading;
    }

    function makeRowHeader(row) {
        const heading = document.createElement('th');
        const label = document.createElement('span');
        heading.scope = 'row';
        heading.className = 'sfmb-coverage-resource';
        heading.title = row.sprite ? `${row.name} · ${row.sprite}` : row.name;
        heading.appendChild(makeIcon(row.icon, 'sfmb-coverage-resource-icon'));
        label.className = 'sfmb-coverage-resource-name';
        label.textContent = row.name;
        heading.appendChild(label);
        return heading;
    }

    function makeCoverageCell(cell, theme, row) {
        const td = document.createElement('td');
        const mark = document.createElement('span');
        const hasFrameCount = Number.isInteger(cell.actualFrames);
        const resourceName = row.name;
        const status = cell.status || (cell.available ? 'complete' : 'missing');
        td.className = status === 'complete' ? 'is-covered' :
            status === 'partial' ? 'is-partial' : 'is-missing';
        if (status === 'complete') {
            const inherited = cell.source && cell.source.toLowerCase() !== theme.id.toLowerCase();
            mark.textContent = '✓';
            const source = inherited ? `inherited from ${cell.source}` : `provided by ${theme.id}`;
            const implementation = cell.method === 'extended'
                ? ` using ${cell.sprite}.sprite`
                : cell.method === 'sheet'
                    ? ` using ${cell.sprite}[${cell.frameIndex}]`
                    : '';
            td.title = `${resourceName} is ${source}${implementation}.`;
            if (hasFrameCount)
                td.title += ` ${cell.actualFrames} actual sprite frames.`;
            td.setAttribute('aria-label', `${theme.id}: ${resourceName} available` +
                (hasFrameCount ? `, ${cell.actualFrames} actual sprite frames` : ''));
        }
        else if (status === 'partial') {
            mark.textContent = '△';
            td.title = `${resourceName} is partially implemented for ${theme.id}: ${cell.visibleFrames}/${cell.totalFrames} representative frames contain visible pixels. Review may be required.`;
            td.setAttribute('aria-label', `${theme.id}: ${resourceName} partially implemented, ${cell.visibleFrames} of ${cell.totalFrames} frames`);
        }
        else {
            mark.textContent = '×';
            td.title = `${resourceName} is missing for ${theme.id}.` +
                (hasFrameCount ? ` ${cell.actualFrames} actual sprite frames.` : '');
            td.setAttribute('aria-label', `${theme.id}: ${resourceName} missing` +
                (hasFrameCount ? `, ${cell.actualFrames} actual sprite frames` : ''));
        }
        mark.setAttribute('aria-hidden', 'true');
        mark.className = 'sfmb-coverage-mark';
        td.appendChild(mark);
        if (hasFrameCount) {
            const frames = document.createElement('small');
            frames.className = 'sfmb-coverage-frame-count';
            frames.textContent = `${cell.actualFrames}f`;
            frames.setAttribute('aria-hidden', 'true');
            td.appendChild(frames);
        }
        else if (cell.available) {
            const frames = document.createElement('small');
            frames.className = 'sfmb-coverage-frame-count is-unknown';
            frames.textContent = '?f';
            frames.setAttribute('aria-hidden', 'true');
            td.appendChild(frames);
            td.title += ' Actual frame count is unavailable.';
        }
        return td;
    }

    function renderSection(root, data, section) {
        const summary = document.createElement('p');
        const scroller = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const corner = document.createElement('th');
        const themeStats = data.themes.map((theme, themeIndex) => {
            const covered = section.rows.filter((row) => row.coverage[themeIndex].available).length;
            const partial = section.rows.filter((row) => row.coverage[themeIndex].status === 'partial').length;
            const frames = section.rows.reduce((sum, row) =>
                sum + (Number.isInteger(row.coverage[themeIndex].actualFrames)
                    ? row.coverage[themeIndex].actualFrames
                    : 0), 0);
            const unknownFrames = section.rows.filter((row) =>
                row.coverage[themeIndex].available &&
                !Number.isInteger(row.coverage[themeIndex].actualFrames)).length;
            return {
                covered,
                partial,
                frames,
                unknownFrames,
                total: section.rows.length,
                percent: section.rows.length ? Math.round(covered * 100 / section.rows.length) : 0,
            };
        });
        const covered = themeStats.reduce((sum, stats) => sum + stats.covered, 0);
        const partial = themeStats.reduce((sum, stats) => sum + stats.partial, 0);
        const frames = themeStats.reduce((sum, stats) => sum + stats.frames, 0);
        const unknownFrames = themeStats.reduce((sum, stats) => sum + stats.unknownFrames, 0);

        summary.className = 'sfmb-coverage-summary';
        summary.textContent = `${section.rows.length} resources · ${covered}/${section.rows.length * data.themes.length} complete` +
            (partial ? ` · ${partial} partial` : '');

        summary.textContent += ` · ${frames.toLocaleString()} known actual frames` +
            (unknownFrames ? ` · ${unknownFrames} frame counts unavailable` : '');

        corner.scope = 'col';
        corner.className = 'sfmb-coverage-corner';
        corner.textContent = section.rowLabel;
        headerRow.appendChild(corner);
        data.themes.forEach((theme, index) =>
            headerRow.appendChild(makeThemeHeader(theme, themeStats[index])));
        thead.appendChild(headerRow);
        table.appendChild(thead);

        let body;
        let lastCharacter;
        section.rows.forEach((row) => {
            const group = section.groupBy ? row[section.groupBy] : section.id;
            if (group !== lastCharacter) {
                body = document.createElement('tbody');
                body.dataset.group = group;
                table.appendChild(body);
                lastCharacter = group;
            }
            const tr = document.createElement('tr');
            tr.appendChild(makeRowHeader(row));
            row.coverage.forEach((cell, index) =>
                tr.appendChild(makeCoverageCell(cell, data.themes[index], row)));
            body.appendChild(tr);
        });

        table.className = 'sfmb-coverage-table';
        scroller.className = 'sfmb-coverage-scroll';
        scroller.tabIndex = 0;
        scroller.setAttribute('aria-label', `Scrollable ${section.title.toLowerCase()} coverage table`);
        scroller.appendChild(table);
        root.replaceChildren(summary, scroller);
    }

    function getThemeStats(section, themeIndex) {
        const covered = section.rows.filter((row) => row.coverage[themeIndex].available).length;
        const partial = section.rows.filter((row) => row.coverage[themeIndex].status === 'partial').length;
        const frames = section.rows.reduce((sum, row) =>
            sum + (Number.isInteger(row.coverage[themeIndex].actualFrames)
                ? row.coverage[themeIndex].actualFrames
                : 0), 0);
        const unknownFrames = section.rows.filter((row) =>
            row.coverage[themeIndex].available &&
            !Number.isInteger(row.coverage[themeIndex].actualFrames)).length;
        return {
            covered,
            partial,
            frames,
            unknownFrames,
            total: section.rows.length,
            percent: section.rows.length ? Math.round(covered * 100 / section.rows.length) : 0,
        };
    }

    function makeOverviewValue(stats) {
        const td = document.createElement('td');
        const value = document.createElement('span');
        value.textContent = `${stats.percent}% (${stats.covered}/${stats.total})`;
        td.title = `${stats.covered}/${stats.total} complete (${stats.percent}%)` +
            (stats.partial ? `, ${stats.partial} partial` : '');
        td.className = stats.percent === 100 ? 'is-complete' :
            stats.covered || stats.partial ? 'is-incomplete' : 'is-empty';
        td.appendChild(value);
        const frames = document.createElement('small');
        frames.className = 'sfmb-coverage-overview-frames';
        frames.textContent = `${stats.frames.toLocaleString()} known frames` +
            (stats.unknownFrames ? ` · ${stats.unknownFrames} unknown` : '');
        td.appendChild(frames);
        if (stats.partial) {
            const partial = document.createElement('small');
            partial.textContent = `△${stats.partial}`;
            td.appendChild(partial);
        }
        return td;
    }

    function renderOverview(root, data) {
        const sections = data.sections.filter((section) =>
            !section.resourceType || section.resourceType === 'sprite');
        const summary = document.createElement('p');
        const scroller = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const body = document.createElement('tbody');
        const themeHeader = document.createElement('th');
        const totalResources = sections.reduce((sum, section) => sum + section.rows.length, 0);
        const totalFrames = sections.reduce((sectionSum, section) =>
            sectionSum + section.rows.reduce((rowSum, row) =>
                rowSum + row.coverage.reduce((cellSum, cell) =>
                    cellSum + (Number.isInteger(cell.actualFrames) ? cell.actualFrames : 0), 0), 0), 0);
        const unknownFrames = sections.reduce((sectionSum, section) =>
            sectionSum + section.rows.reduce((rowSum, row) =>
                rowSum + row.coverage.filter((cell) =>
                    cell.available && !Number.isInteger(cell.actualFrames)).length, 0), 0);

        summary.className = 'sfmb-coverage-summary sfmb-coverage-overview';
        summary.textContent = `${data.themes.length} Game Themes · ${totalResources} tracked resources`;
        summary.textContent += ` · ${totalFrames.toLocaleString()} known actual frames` +
            (unknownFrames ? ` · ${unknownFrames} frame counts unavailable` : '');
        themeHeader.scope = 'col';
        themeHeader.textContent = 'Game Theme';
        headerRow.appendChild(themeHeader);
        const totalHeader = document.createElement('th');
        totalHeader.scope = 'col';
        totalHeader.textContent = 'All sprites';
        headerRow.appendChild(totalHeader);
        sections.forEach((section) => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.textContent = section.title.replace(/ Sprites$/, '').replace('Character & Power-up', 'Character');
            th.title = section.title;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        data.themes.forEach((theme, themeIndex) => {
            const row = document.createElement('tr');
            const heading = document.createElement('th');
            const name = document.createElement('span');
            const stats = sections.map((section) => getThemeStats(section, themeIndex));
            const combined = stats.reduce((result, current) => ({
                covered: result.covered + current.covered,
                partial: result.partial + current.partial,
                frames: result.frames + current.frames,
                unknownFrames: result.unknownFrames + current.unknownFrames,
                total: result.total + current.total,
                percent: 0,
            }), { covered: 0, partial: 0, frames: 0, unknownFrames: 0, total: 0, percent: 0 });
            combined.percent = combined.total ? Math.round(combined.covered * 100 / combined.total) : 0;

            heading.scope = 'row';
            heading.title = theme.baseTheme
                ? `${theme.name} (${theme.id}) · Base Theme: ${theme.baseTheme}`
                : `${theme.name} (${theme.id})`;
            heading.appendChild(makeIcon(theme.icon, 'sfmb-coverage-theme-icon'));
            name.textContent = theme.id;
            heading.appendChild(name);
            row.appendChild(heading);
            row.appendChild(makeOverviewValue(combined));
            stats.forEach((sectionStats) => row.appendChild(makeOverviewValue(sectionStats)));
            body.appendChild(row);
        });

        const footer = document.createElement('tfoot');
        const footerRow = document.createElement('tr');
        const footerHeading = document.createElement('th');
        const sectionTotals = sections.map((section) => {
            const stats = data.themes.map((theme, themeIndex) => getThemeStats(section, themeIndex));
            const total = stats.reduce((result, current) => ({
                covered: result.covered + current.covered,
                partial: result.partial + current.partial,
                frames: result.frames + current.frames,
                unknownFrames: result.unknownFrames + current.unknownFrames,
                total: result.total + current.total,
                percent: 0,
            }), { covered: 0, partial: 0, frames: 0, unknownFrames: 0, total: 0, percent: 0 });
            total.percent = total.total ? Math.round(total.covered * 100 / total.total) : 0;
            return total;
        });
        const grandTotal = sectionTotals.reduce((result, current) => ({
            covered: result.covered + current.covered,
            partial: result.partial + current.partial,
            frames: result.frames + current.frames,
            unknownFrames: result.unknownFrames + current.unknownFrames,
            total: result.total + current.total,
            percent: 0,
        }), { covered: 0, partial: 0, frames: 0, unknownFrames: 0, total: 0, percent: 0 });
        grandTotal.percent = grandTotal.total
            ? Math.round(grandTotal.covered * 100 / grandTotal.total)
            : 0;

        footerHeading.scope = 'row';
        footerHeading.textContent = 'All themes';
        footerRow.appendChild(footerHeading);
        footerRow.appendChild(makeOverviewValue(grandTotal));
        sectionTotals.forEach((stats) => footerRow.appendChild(makeOverviewValue(stats)));
        footer.appendChild(footerRow);

        table.className = 'sfmb-coverage-overview-table';
        table.append(thead, body, footer);
        scroller.className = 'sfmb-coverage-scroll is-overview';
        scroller.tabIndex = 0;
        scroller.setAttribute('aria-label', 'Scrollable Game Theme resource coverage overview');
        scroller.appendChild(table);
        root.replaceChildren(summary, scroller);
    }

    function renderSpriteCoverage(data) {
        const sections = data.sections.filter((section) =>
            !section.resourceType || section.resourceType === 'sprite');
        sections.forEach((section) => {
            const root = document.getElementById(`sfmb-sprite-coverage-${section.id}`);
            if (root) renderSection(root, data, section);
        });
    }

    function showError(root, error) {
        const message = document.createElement('p');
        message.className = 'sfmb-coverage-status is-error';
        message.textContent = 'Resource coverage could not be loaded. Please try again later.';
        root.replaceChildren(message);
        console.warn('SFMB resource coverage data could not be loaded.', error);
    }

    function init() {
        const overviewRoot = document.getElementById('sfmb-resource-coverage-overview');
        const spriteRoots = [...document.querySelectorAll('[id^="sfmb-sprite-coverage-"]')];
        if (!overviewRoot && !spriteRoots.length) return;
        fetch(DATA_URL)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then((data) => {
                if (overviewRoot) renderOverview(overviewRoot, data);
                renderSpriteCoverage(data);
            })
            .catch((error) => {
                if (overviewRoot) showError(overviewRoot, error);
                spriteRoots.forEach((root) => showError(root, error));
            });
    }

    if (document.readyState === 'loading')
        document.addEventListener('DOMContentLoaded', init);
    else
        init();
})();
