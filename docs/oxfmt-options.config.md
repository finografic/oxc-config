# Oxfmt Configuration - Options

[config-file-reference](https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html)

## arrowParens

type: `"always" | "avoid"`

Include parentheses around a sole arrow function parameter.

- Default: `"always"`

## bracketSameLine

type: `boolean`

Put the `>` of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line, instead of being alone on the next line (does not apply to self closing elements).

- Default: `false`

## bracketSpacing

type: `boolean`

Print spaces between brackets in object literals.

- Default: `true`

## embeddedLanguageFormatting

type: `"auto" | "off"`

Control whether to format embedded parts (For example, CSS-in-JS, or JS-in-Vue, etc.) in the file.

NOTE: XXX-in-JS support is incomplete.

- Default: `"auto"`

## endOfLine

type: `"lf" | "crlf" | "cr"`

Which end of line characters to apply.

NOTE: `"auto"` is not supported.

- Default: `"lf"`
- Overrides `.editorconfig.end_of_line`

## htmlWhitespaceSensitivity

type: `"css" | "strict" | "ignore"`

Specify the global whitespace sensitivity for HTML, Vue, Angular, and Handlebars.

- Default: `"css"`

## ignorePatterns

type: `string[]`

Ignore files matching these glob patterns. Patterns are based on the location of the Oxfmt configuration file.

- Default: `[]`

## insertFinalNewline

type: `boolean`

Whether to insert a final newline at the end of the file.

- Default: `true`
- Overrides `.editorconfig.insert_final_newline`

## jsdoc

type: `object`

Enable JSDoc comment formatting.

When enabled, JSDoc comments are normalized and reformatted: tag aliases are canonicalized, descriptions are capitalized, long lines are wrapped, and short comments are collapsed to single-line.

Pass an object (`jsdoc: {}`) to enable with defaults, or omit to disable.

- Default: Disabled

### jsdoc.addDefaultToDescription

type: `boolean`

Append default values to `@param` descriptions (e.g. "Default is `value`").

- Default: `true`

### jsdoc.bracketSpacing

type: `boolean`

Add spaces inside JSDoc type braces: `{string}` → `{ string }`.

- Default: `false`

### jsdoc.capitalizeDescriptions

type: `boolean`

Capitalize the first letter of tag descriptions.

- Default: `true`

### jsdoc.commentLineStrategy

type: `string`

How to format comment blocks.

- `"singleLine"` — Convert to single-line `/** content */` when possible.
- `"multiline"` — Always use multi-line format.
- `"keep"` — Preserve original formatting.
- Default: `"singleLine"`

### jsdoc.descriptionTag

type: `boolean`

Emit `@description` tag instead of inline description.

- Default: `false`

### jsdoc.descriptionWithDot

type: `boolean`

Add a trailing dot to the end of descriptions.

- Default: `false`

### jsdoc.keepUnparsableExampleIndent

type: `boolean`

Preserve indentation in unparsable `@example` code.

- Default: `false`

### jsdoc.lineWrappingStyle

type: `string`

Strategy for wrapping description lines at print width.

- `"greedy"` — Always re-wrap text to fit within print width.
- `"balance"` — Preserve original line breaks if all lines fit within print width.
- Default: `"greedy"`

### jsdoc.preferCodeFences

type: `boolean`

Use fenced code blocks (`````) instead of 4-space indentation for code without a language tag.

- Default: `false`

### jsdoc.separateReturnsFromParam

type: `boolean`

Add a blank line between the last `@param` and `@returns`.

- Default: `false`

### jsdoc.separateTagGroups

type: `boolean`

Add blank lines between different tag groups (e.g. between `@param` and `@returns`).

- Default: `false`

## jsxSingleQuote

type: `boolean`

Use single quotes instead of double quotes in JSX.

- Default: `false`

## objectWrap

type: `"preserve" | "collapse"`

How to wrap object literals when they could fit on one line or span multiple lines.

By default, formats objects as multi-line if there is a newline prior to the first property. Authors can use this heuristic to contextually improve readability, though it has some downsides.

- Default: `"preserve"`

## printWidth

type: `integer`

Specify the line length that the printer will wrap on.

If you don't want line wrapping when formatting Markdown, you can set the `proseWrap` option to disable it.

- Default: `100`
- Overrides `.editorconfig.max_line_length`

## proseWrap

type: `"always" | "never" | "preserve"`

How to wrap prose.

By default, formatter will not change wrapping in markdown text since some services use a linebreak-sensitive renderer, e.g. GitHub comments and BitBucket. To wrap prose to the print width, change this option to "always". If you want to force all prose blocks to be on a single line and rely on editor/viewer soft wrapping instead, you can use "never".

- Default: `"preserve"`

## quoteProps

type: `"as-needed" | "consistent" | "preserve"`

Change when properties in objects are quoted.

- Default: `"as-needed"`

## semi

type: `boolean`

Print semicolons at the ends of statements.

- Default: `true`

## singleAttributePerLine

type: `boolean`

Enforce single attribute per line in HTML, Vue, and JSX.

- Default: `false`

## singleQuote

type: `boolean`

Use single quotes instead of double quotes.

For JSX, you can set the `jsxSingleQuote` option.

- Default: `false`

## tabWidth

type: `integer`

Specify the number of spaces per indentation-level.

- Default: `2`
- Overrides `.editorconfig.indent_size`

## trailingComma

type: `"all" | "es5" | "none"`

Print trailing commas wherever possible in multi-line comma-separated syntactic structures.

A single-line array, for example, never gets trailing commas.

- Default: `"all"`

## useTabs

type: `boolean`

Indent lines with tabs instead of spaces.

- Default: `false`
- Overrides `.editorconfig.indent_style`
