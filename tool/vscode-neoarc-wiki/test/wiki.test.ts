import assert from 'node:assert/strict';
import test from 'node:test';
import { planWikiInitialization, wrapAsWikilink } from '../src/wiki';

const timestamp = '2026-09-09 12:34:56 +0900';

test('initializes an empty document with canonical Front Matter and heading', () => {
  const result = planWikiInitialization('', 'new-note', timestamp);
  assert.equal(result.kind, 'insert');
  if (result.kind === 'insert') {
    assert.match(result.text, /title   : "new-note"/);
    assert.match(result.text, /updated : 2026-09-09 12:34:56 \+0900/);
    assert.match(result.text, /\{:toc\}\n\n# new-note\n$/);
  }
});
test('uses the first level-one heading as title', () => {
  const result = planWikiInitialization('# Human Title\nBody\n', 'file-name', timestamp);
  assert.equal(result.kind, 'insert');
  if (result.kind === 'insert') assert.match(result.text, /title   : "Human Title"/);
});
test('preserves CRLF line endings', () => {
  const result = planWikiInitialization('# Title\r\nBody\r\n', 'file', timestamp);
  assert.equal(result.kind, 'insert');
  if (result.kind === 'insert') assert.equal(result.text.replace(/\r\n/g, '').includes('\n'), false);
});
test('inserts after a UTF-8 BOM', () => {
  const result = planWikiInitialization('\uFEFFBody', 'file', timestamp);
  assert.equal(result.kind, 'insert');
  if (result.kind === 'insert') assert.equal(result.offset, 1);
});
test('does not alter an initialized document', () => {
  assert.deepEqual(planWikiInitialization('---\ntitle: x\n---\n', 'file', timestamp), {kind:'already-initialized'});
});
test('refuses an unclosed Front Matter block', () => {
  assert.deepEqual(planWikiInitialization('---\ntitle: x\n', 'file', timestamp), {kind:'malformed-front-matter'});
});
test('wraps text and preserves surrounding whitespace', () => {
  assert.equal(wrapAsWikilink('  target page  '), '  [[target page]]  ');
});
test('leaves existing wiki links unchanged', () => {
  assert.equal(wrapAsWikilink('[[page]]'), '[[page]]');
  assert.equal(wrapAsWikilink('[[page]]{label}'), '[[page]]{label}');
});
test('rejects empty and multiline text', () => {
  assert.equal(wrapAsWikilink('   '), undefined);
  assert.equal(wrapAsWikilink('one\ntwo'), undefined);
});
