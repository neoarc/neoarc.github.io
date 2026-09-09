import * as path from 'node:path';
import * as vscode from 'vscode';
import {
  formatTimestamp,
  FrontMatterIssue,
  planUpdatedTimestamp,
} from './frontmatter';
import { planWikiInitialization, wrapAsWikilink } from './wiki';

const DIAGNOSTIC_SOURCE = 'neoarc-wiki';
const TASK_SOURCE = 'Neoarc Wiki';
const SERVE_TASK_NAME = 'Serve Jekyll';

const ISSUE_MESSAGES: Record<FrontMatterIssue, string> = {
  'missing-front-matter': 'The document does not start with YAML Front Matter.',
  'unclosed-front-matter': 'The YAML Front Matter block is not closed.',
  'missing-updated': "The Front Matter does not contain an 'updated' field.",
  'duplicate-updated': "The Front Matter contains more than one 'updated' field.",
  'invalid-updated': "The 'updated' value must use 'YYYY-MM-DD HH:mm:ss +0900' format.",
};

function extensionConfiguration(uri?: vscode.Uri): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration('neoarcWiki.updatedTimestamp', uri);
}

function isEnabled(uri: vscode.Uri): boolean {
  return extensionConfiguration(uri).get<boolean>('enabled', false);
}

function isWikiMarkdown(uri: vscode.Uri): boolean {
  if (uri.scheme !== 'file' || !uri.fsPath.toLowerCase().endsWith('.md')) return false;
  const folder = vscode.workspace.getWorkspaceFolder(uri);
  if (!folder) return false;
  const relative = vscode.workspace.asRelativePath(uri, false).replace(/\\/g, '/');
  return relative.startsWith('_wiki/');
}

function rangeFromOffsets(document: vscode.TextDocument, start: number, end: number): vscode.Range {
  return new vscode.Range(document.positionAt(start), document.positionAt(end));
}

function diagnosticFor(
  document: vscode.TextDocument,
  issue: FrontMatterIssue,
  start = 0,
  end = 0,
): vscode.Diagnostic {
  const diagnostic = new vscode.Diagnostic(
    rangeFromOffsets(document, start, Math.max(start, end)),
    ISSUE_MESSAGES[issue],
    vscode.DiagnosticSeverity.Warning,
  );
  diagnostic.source = DIAGNOSTIC_SOURCE;
  return diagnostic;
}

async function fileExists(uri: vscode.Uri): Promise<boolean> {
  try {
    await vscode.workspace.fs.stat(uri);
    return true;
  } catch {
    return false;
  }
}

async function findWikiWorkspaceFolder(): Promise<vscode.WorkspaceFolder | undefined> {
  const activeUri = vscode.window.activeTextEditor?.document.uri;
  const activeFolder = activeUri ? vscode.workspace.getWorkspaceFolder(activeUri) : undefined;
  if (activeFolder && await fileExists(vscode.Uri.joinPath(activeFolder.uri, '_wiki', 'index.md'))) {
    return activeFolder;
  }

  for (const folder of vscode.workspace.workspaceFolders ?? []) {
    if (await fileExists(vscode.Uri.joinPath(folder.uri, '_wiki', 'index.md'))) return folder;
  }
  return undefined;
}

async function validateWorkspace(diagnostics: vscode.DiagnosticCollection): Promise<void> {
  diagnostics.clear();
  const files = await vscode.workspace.findFiles('_wiki/**/*.md', '**/{node_modules,_site}/**');
  let issueCount = 0;

  for (const uri of files) {
    const document = await vscode.workspace.openTextDocument(uri);
    const result = planUpdatedTimestamp(
      document.getText(),
      formatTimestamp(new Date(), 'Asia/Seoul'),
    );
    if (!result.issue) continue;

    issueCount += 1;
    diagnostics.set(uri, [diagnosticFor(
      document,
      result.issue,
      result.issueStart,
      result.issueEnd,
    )]);
  }

  if (issueCount === 0) {
    void vscode.window.showInformationMessage(
      `Neoarc Wiki: ${files.length} document(s) have valid Front Matter.`,
    );
  } else {
    void vscode.window.showWarningMessage(
      `Neoarc Wiki: found Front Matter issues in ${issueCount} document(s).`,
    );
  }
}

async function openIndex(): Promise<void> {
  const folder = await findWikiWorkspaceFolder();
  if (!folder) {
    void vscode.window.showErrorMessage('Neoarc Wiki: no workspace containing _wiki/index.md was found.');
    return;
  }
  const document = await vscode.workspace.openTextDocument(
    vscode.Uri.joinPath(folder.uri, '_wiki', 'index.md'),
  );
  await vscode.window.showTextDocument(document);
}

async function convertSelectionToWikilink(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !isWikiMarkdown(editor.document.uri)) {
    void vscode.window.showWarningMessage('Neoarc Wiki: open a Markdown document below _wiki first.');
    return;
  }

  const replacements: Array<{ range: vscode.Range; text: string }> = [];
  for (const selection of editor.selections) {
    const range = selection.isEmpty
      ? editor.document.getWordRangeAtPosition(selection.active, /[^\s\[\]]+/)
      : selection;
    if (!range) continue;
    const wrapped = wrapAsWikilink(editor.document.getText(range));
    if (wrapped !== undefined) replacements.push({ range, text: wrapped });
  }

  if (replacements.length === 0) {
    void vscode.window.showWarningMessage('Neoarc Wiki: select single-line text or place the cursor on a word.');
    return;
  }
  await editor.edit((builder) => {
    for (const replacement of replacements) builder.replace(replacement.range, replacement.text);
  });
}

async function initializeCurrentDocument(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !isWikiMarkdown(editor.document.uri)) {
    void vscode.window.showWarningMessage('Neoarc Wiki: open a Markdown document below _wiki first.');
    return;
  }

  const timeZone = extensionConfiguration(editor.document.uri).get<string>('timeZone', 'Asia/Seoul');
  let timestamp: string;
  try {
    timestamp = formatTimestamp(new Date(), timeZone);
  } catch {
    void vscode.window.showErrorMessage(`Neoarc Wiki: invalid time zone "${timeZone}".`);
    return;
  }

  const fallbackTitle = path.basename(editor.document.uri.fsPath, path.extname(editor.document.uri.fsPath));
  const plan = planWikiInitialization(editor.document.getText(), fallbackTitle, timestamp);
  if (plan.kind === 'already-initialized') {
    void vscode.window.showInformationMessage('Neoarc Wiki: this document already has Front Matter.');
    return;
  }
  if (plan.kind === 'malformed-front-matter') {
    void vscode.window.showErrorMessage('Neoarc Wiki: the existing Front Matter is not closed; initialization was cancelled.');
    return;
  }

  await editor.edit((builder) => {
    builder.insert(editor.document.positionAt(plan.offset), plan.text);
  });
}

function runningServeTask(): vscode.TaskExecution | undefined {
  return vscode.tasks.taskExecutions.find(
    (execution) => execution.task.source === TASK_SOURCE && execution.task.name === SERVE_TASK_NAME,
  );
}

async function startJekyllServer(): Promise<void> {
  if (runningServeTask()) {
    void vscode.window.showInformationMessage('Neoarc Wiki: the Jekyll server is already running.');
    return;
  }

  const folder = await findWikiWorkspaceFolder();
  if (!folder || folder.uri.scheme !== 'file') {
    void vscode.window.showErrorMessage('Neoarc Wiki: no local wiki workspace was found.');
    return;
  }

  const cwd = folder.uri.fsPath;
  const execution = process.platform === 'win32'
    ? new vscode.ShellExecution(
      'cmd.exe',
      ['/d', '/c', path.join(cwd, '__JEKYLL_LOCAL.bat')],
      { cwd },
    )
    : new vscode.ShellExecution(
      'bundle',
      ['exec', 'jekyll', 'serve', '--incremental', '--trace'],
      { cwd },
    );
  const task = new vscode.Task(
    { type: 'neoarc-wiki-jekyll' },
    folder,
    SERVE_TASK_NAME,
    TASK_SOURCE,
    execution,
  );
  task.isBackground = true;
  task.presentationOptions = {
    reveal: vscode.TaskRevealKind.Always,
    panel: vscode.TaskPanelKind.Dedicated,
    clear: false,
  };
  await vscode.tasks.executeTask(task);
}

function stopJekyllServer(): void {
  const execution = runningServeTask();
  if (!execution) {
    void vscode.window.showInformationMessage('Neoarc Wiki: the Jekyll server is not running.');
    return;
  }
  execution.terminate();
}

export function activate(context: vscode.ExtensionContext): void {
  const diagnostics = vscode.languages.createDiagnosticCollection(DIAGNOSTIC_SOURCE);
  context.subscriptions.push(diagnostics);

  context.subscriptions.push(vscode.workspace.onWillSaveTextDocument((event) => {
    const document = event.document;
    if (!document.isDirty || !isWikiMarkdown(document.uri) || !isEnabled(document.uri)) return;

    const timeZone = extensionConfiguration(document.uri).get<string>('timeZone', 'Asia/Seoul');
    let timestamp: string;
    try {
      timestamp = formatTimestamp(new Date(), timeZone);
    } catch {
      return;
    }

    const result = planUpdatedTimestamp(document.getText(), timestamp);
    if (!result.replacement) return;

    event.waitUntil(Promise.resolve([vscode.TextEdit.replace(
      rangeFromOffsets(document, result.replacement.start, result.replacement.end),
      result.replacement.text,
    )]));
  }));

  context.subscriptions.push(
    vscode.commands.registerCommand('neoarcWiki.validateFrontMatter', () => validateWorkspace(diagnostics)),
    vscode.commands.registerCommand('neoarcWiki.openIndex', openIndex),
    vscode.commands.registerCommand('neoarcWiki.convertSelectionToWikilink', convertSelectionToWikilink),
    vscode.commands.registerCommand('neoarcWiki.initializeCurrentDocument', initializeCurrentDocument),
    vscode.commands.registerCommand('neoarcWiki.startJekyllServer', startJekyllServer),
    vscode.commands.registerCommand('neoarcWiki.stopJekyllServer', stopJekyllServer),
  );
}

export function deactivate(): void {
  // All resources are owned by context.subscriptions.
}
