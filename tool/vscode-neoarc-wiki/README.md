# Neoarc Wiki VS Code extension

Repository-local editing support for the Neoarc Jekyll wiki. Version 2 keeps the
safe save-time `updated` timestamp behavior and adds the core navigation,
authoring, and local-preview commands used during the Vimwiki migration.

## Safety boundaries

- Save-time timestamp updates are disabled by default; enable them per workspace
  with `neoarcWiki.updatedTimestamp.enabled`.
- Commands that edit content only handle local Markdown files below `_wiki/`.
- Saving changes only the value of exactly one `updated` field in the first
  Front Matter block.
- Saving does not add a missing field or modify duplicate or malformed fields.
- Document initialization never replaces existing Front Matter and refuses an
  unclosed Front Matter block.
- Timestamps use `Asia/Seoul` unless the workspace selects another IANA time zone.

## Commands

Run these from the VS Code Command Palette:

- `Neoarc Wiki: Open Index` opens `_wiki/index.md`.
- `Neoarc Wiki: Convert Selection to Wikilink` wraps each single-line selection
  as `[[selection]]`. With no selection, it wraps the word at each cursor.
- `Neoarc Wiki: Initialize Current Document` adds the repository's canonical
  Jekyll Front Matter and TOC to a document that has none. An empty document also
  receives a level-one heading based on its filename.
- `Neoarc Wiki: Start Jekyll Server` runs `__JEKYLL_LOCAL.bat` on Windows or
  `bundle exec jekyll serve --incremental --trace` elsewhere in a dedicated
  terminal. A duplicate server task is not started.
- `Neoarc Wiki: Stop Jekyll Server` terminates the server task started above.
- `Neoarc Wiki: Validate Front Matter` scans `_wiki/**/*.md` and reports
  missing, duplicate, malformed, or invalid `updated` fields in Problems.

Foam's `Foam: Create New Note From Template` command can use
`.foam/templates/new-note.md`, which creates the same Jekyll Front Matter and
TOC immediately.

No default keyboard shortcuts are imposed. Bind the commands in VS Code's
Keyboard Shortcuts editor if desired.

## Development

```powershell
npm install
npm test
npm run package
```

`npm run package` creates `neoarc-wiki-0.2.0.vsix`. Install it from the VS
Code Extensions view with `Extensions: Install from VSIX...`, or run:

```powershell
code --install-extension neoarc-wiki-0.2.0.vsix --force
```

Reload the VS Code window after installation.
