import assert from 'node:assert/strict';
import test from 'node:test';
import {
  formatTimestamp,
  planUpdatedTimestamp,
} from '../src/frontmatter';

function applyReplacement(
  text: string,
  replacement: ReturnType<typeof planUpdatedTimestamp>['replacement'],
): string {
  assert.ok(replacement);
  return text.slice(0, replacement.start)
    + replacement.text
    + text.slice(replacement.end);
}

test('formats a stable Asia/Seoul timestamp', () => {
  const date = new Date('2026-09-09T05:32:18.987Z');
  assert.equal(
    formatTimestamp(date, 'Asia/Seoul'),
    '2026-09-09 14:32:18 +0900',
  );
});

test('updates the value and preserves spacing before the colon', () => {
  const source = [
    '---',
    'layout  : wiki',
    'updated : 2023-08-15 00:53:02 +0900',
    '---',
    '# Title',
    '',
  ].join('\n');
  const timestamp = '2026-09-09 14:32:18 +0900';
  const result = planUpdatedTimestamp(source, timestamp);
  const updated = applyReplacement(source, result.replacement);

  assert.match(updated, /^updated : 2026-09-09 14:32:18 \+0900$/m);
  assert.equal(result.issue, undefined);
});

test('preserves CRLF line endings', () => {
  const source = [
    '---',
    'updated: 2025-01-01 00:00:00 +0900',
    '---',
    '# Title',
    '',
  ].join('\r\n');
  const result = planUpdatedTimestamp(source, '2026-09-09 14:32:18 +0900');
  const updated = applyReplacement(source, result.replacement);

  assert.equal((updated.match(/\r\n/g) ?? []).length, 4);
  assert.equal(updated.includes('\n') && !updated.includes('\r\n'), false);
});

test('finds updated after the first ten lines', () => {
  const source = [
    '---',
    'layout: wiki',
    'title: Title',
    'summary:',
    'date: 2025-01-01',
    'tag:',
    'toc: true',
    'public: true',
    'parent:',
    'latex: false',
    'extra: true',
    'updated: 2025-01-01 00:00:00 +0900',
    '---',
  ].join('\n');

  assert.ok(planUpdatedTimestamp(
    source,
    '2026-09-09 14:32:18 +0900',
  ).replacement);
});

test('preserves an inline YAML comment', () => {
  const source = [
    '---',
    'updated: 2025-01-01 00:00:00 +0900  # maintained automatically',
    '---',
  ].join('\n');
  const result = planUpdatedTimestamp(source, '2026-09-09 14:32:18 +0900');
  const updated = applyReplacement(source, result.replacement);

  assert.match(
    updated,
    /updated: 2026-09-09 14:32:18 \+0900  # maintained automatically/,
  );
});

test('reports missing front matter', () => {
  const result = planUpdatedTimestamp(
    '# Title\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'missing-front-matter');
  assert.equal(result.replacement, undefined);
});

test('reports unclosed front matter', () => {
  const result = planUpdatedTimestamp(
    '---\nupdated: 2025-01-01 00:00:00 +0900\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'unclosed-front-matter');
});

test('reports a missing updated field without inserting one', () => {
  const result = planUpdatedTimestamp(
    '---\nlayout: wiki\n---\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'missing-updated');
  assert.equal(result.replacement, undefined);
});

test('reports duplicate updated fields without changing either', () => {
  const result = planUpdatedTimestamp(
    [
      '---',
      'updated: 2025-01-01 00:00:00 +0900',
      'updated: 2025-01-02 00:00:00 +0900',
      '---',
    ].join('\n'),
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'duplicate-updated');
  assert.equal(result.replacement, undefined);
});

test('ignores updated text in the body', () => {
  const result = planUpdatedTimestamp(
    '---\nlayout: wiki\n---\nupdated: 2025-01-01 00:00:00 +0900\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'missing-updated');
});

test('reports an unexpected updated value', () => {
  const result = planUpdatedTimestamp(
    '---\nupdated: yesterday\n---\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, 'invalid-updated');
  assert.equal(result.replacement, undefined);
});

test('accepts an empty updated value', () => {
  const result = planUpdatedTimestamp(
    '---\nupdated : \n---\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.ok(result.replacement);
});

test('does not produce an edit when the value already matches', () => {
  const result = planUpdatedTimestamp(
    '---\nupdated: 2026-09-09 14:32:18 +0900\n---\n',
    '2026-09-09 14:32:18 +0900',
  );
  assert.equal(result.issue, undefined);
  assert.equal(result.replacement, undefined);
});

