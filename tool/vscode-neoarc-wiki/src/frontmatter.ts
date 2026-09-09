export type FrontMatterIssue =
  | 'missing-front-matter'
  | 'unclosed-front-matter'
  | 'missing-updated'
  | 'duplicate-updated'
  | 'invalid-updated';

export interface TextReplacement {
  start: number;
  end: number;
  text: string;
}

export interface FrontMatterResult {
  replacement?: TextReplacement;
  issue?: FrontMatterIssue;
  issueStart?: number;
  issueEnd?: number;
}

interface LineInfo {
  start: number;
  contentEnd: number;
  end: number;
  content: string;
}

const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} [+-]\d{4}$/;

function readLines(text: string): LineInfo[] {
  const lines: LineInfo[] = [];
  let start = 0;

  while (start < text.length) {
    const newline = text.indexOf('\n', start);
    const end = newline === -1 ? text.length : newline + 1;
    let contentEnd = newline === -1 ? text.length : newline;
    if (contentEnd > start && text.charCodeAt(contentEnd - 1) === 13) {
      contentEnd -= 1;
    }
    lines.push({
      start,
      contentEnd,
      end,
      content: text.slice(start, contentEnd),
    });
    start = end;
  }

  if (text.length === 0 || text.endsWith('\n')) {
    lines.push({
      start: text.length,
      contentEnd: text.length,
      end: text.length,
      content: '',
    });
  }

  return lines;
}

function delimiterContent(content: string, allowBom: boolean): string {
  const withoutBom = allowBom && content.charCodeAt(0) === 0xfeff
    ? content.slice(1)
    : content;
  return withoutBom.trim();
}

export function formatTimestamp(date: Date, timeZone: string): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const values: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  }

  const zonedAsUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );
  const sourceWithoutMilliseconds = Math.floor(date.getTime() / 1000) * 1000;
  const offsetMinutes = Math.round((zonedAsUtc - sourceWithoutMilliseconds) / 60_000);
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absoluteOffset = Math.abs(offsetMinutes);
  const offsetHours = String(Math.floor(absoluteOffset / 60)).padStart(2, '0');
  const offsetRemainder = String(absoluteOffset % 60).padStart(2, '0');

  return `${values.year}-${values.month}-${values.day} `
    + `${values.hour}:${values.minute}:${values.second} `
    + `${sign}${offsetHours}${offsetRemainder}`;
}

export function planUpdatedTimestamp(
  text: string,
  timestamp: string,
): FrontMatterResult {
  const lines = readLines(text);
  if (lines.length === 0 || delimiterContent(lines[0].content, true) !== '---') {
    return {
      issue: 'missing-front-matter',
      issueStart: 0,
      issueEnd: Math.min(text.length, lines[0]?.contentEnd ?? 0),
    };
  }

  let closingLine = -1;
  for (let index = 1; index < lines.length; index += 1) {
    if (delimiterContent(lines[index].content, false) === '---') {
      closingLine = index;
      break;
    }
  }

  if (closingLine === -1) {
    return {
      issue: 'unclosed-front-matter',
      issueStart: lines[0].start,
      issueEnd: lines[0].contentEnd,
    };
  }

  const matches: Array<{
    line: LineInfo;
    valueStart: number;
    valueEnd: number;
    value: string;
    trailingComment: string;
  }> = [];

  for (let index = 1; index < closingLine; index += 1) {
    const line = lines[index];
    const match = /^(\s*updated\s*:\s*)(.*)$/.exec(line.content);
    if (!match) {
      continue;
    }

    const rawValue = match[2];
    const commentMatch = /^(.*?)(\s+#.*)?$/.exec(rawValue);
    const value = (commentMatch?.[1] ?? rawValue).trim();
    const trailingComment = commentMatch?.[2] ?? '';
    const valueStart = line.start + match[1].length;

    matches.push({
      line,
      valueStart,
      valueEnd: line.contentEnd,
      value,
      trailingComment,
    });
  }

  if (matches.length === 0) {
    return {
      issue: 'missing-updated',
      issueStart: lines[0].start,
      issueEnd: lines[closingLine].contentEnd,
    };
  }

  if (matches.length > 1) {
    return {
      issue: 'duplicate-updated',
      issueStart: matches[1].line.start,
      issueEnd: matches[1].line.contentEnd,
    };
  }

  const match = matches[0];
  if (match.value !== '' && !TIMESTAMP_PATTERN.test(match.value)) {
    return {
      issue: 'invalid-updated',
      issueStart: match.line.start,
      issueEnd: match.line.contentEnd,
    };
  }

  const replacementText = timestamp + match.trailingComment;
  if (text.slice(match.valueStart, match.valueEnd) === replacementText) {
    return {};
  }

  return {
    replacement: {
      start: match.valueStart,
      end: match.valueEnd,
      text: replacementText,
    },
  };
}

