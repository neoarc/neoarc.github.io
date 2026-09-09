export type WikiInitializationPlan =
  | { kind: 'insert'; offset: number; text: string }
  | { kind: 'already-initialized' }
  | { kind: 'malformed-front-matter' };

function lineEnding(text: string): '\r\n' | '\n' {
  return text.includes('\r\n') ? '\r\n' : '\n';
}

function documentTitle(text: string, fallbackTitle: string): string {
  const match = text.match(/^#\s+(.+?)\s*$/m);
  return match?.[1] || fallbackTitle;
}

export function planWikiInitialization(text: string, fallbackTitle: string, timestamp: string): WikiInitializationPlan {
  const offset = text.startsWith('\uFEFF') ? 1 : 0;
  const body = text.slice(offset);
  const eol = lineEnding(body);

  if (/^---(?:\r?\n|$)/.test(body)) {
    return /^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/.test(body)
      ? { kind: 'already-initialized' }
      : { kind: 'malformed-front-matter' };
  }

  const title = documentTitle(body, fallbackTitle);
  const header = [
    '---', 'layout  : wiki', `title   : ${JSON.stringify(title)}`, 'summary :',
    `date    : ${timestamp}`, `updated : ${timestamp}`, 'tag     :',
    'toc     : true', 'public  : true', 'parent  :', 'latex   : false',
    '---', '* TOC', '{:toc}', '', '',
  ].join(eol);
  const initialHeading = body.length === 0 ? `# ${title}${eol}` : '';
  return { kind: 'insert', offset, text: `${header}${initialHeading}` };
}

export function wrapAsWikilink(text: string): string | undefined {
  if (/\r|\n/.test(text)) return undefined;
  const match = text.match(/^(\s*)(.*?)(\s*)$/);
  const core = match?.[2] ?? '';
  if (!core) return undefined;
  if (/^\[\[[^\]]+\]\](?:\{[^}]*\})?$/.test(core)) return text;
  return `${match?.[1] ?? ''}[[${core}]]${match?.[3] ?? ''}`;
}
