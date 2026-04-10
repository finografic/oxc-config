# Oxfmt Configuration - Sorting

<https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#sortimports>

## sortImports

type: `object`

Sort import statements.

Using the similar algorithm as [eslint-plugin-perfectionist/sort-imports](https://perfectionist.dev/rules/sort-imports). For details, see each field's documentation.

- Default: Disabled

### sortImports.customGroups

type: `array`

Define your own groups for matching very specific imports.

The `customGroups` list is ordered: The first definition that matches an element will be used. Custom groups have a higher priority than any predefined group.

If you want a predefined group to take precedence over a custom group, you must write a custom group definition that does the same as what the predefined group does, and put it first in the list.

If you specify multiple conditions like `elementNamePattern`, `selector`, and `modifiers`, all conditions must be met for an import to match the custom group (AND logic).

- Default: `[]`

#### sortImports.customGroups[n]

type: `object`

##### sortImports.customGroups[n].elementNamePattern

type: `string[]`

default: `[]`

List of glob patterns to match import sources for this group.

##### sortImports.customGroups[n].groupName

type: `string`

default: `""`

Name of the custom group, used in the `groups` option.

##### sortImports.customGroups[n].modifiers

type: `string[]`

Modifiers to match the import characteristics. All specified modifiers must be present (AND logic).

Possible values: `"side_effect"`, `"type"`, `"value"`, `"default"`, `"wildcard"`, `"named"`

##### sortImports.customGroups[n].selector

type: `string`

Selector to match the import kind.

Possible values: `"type"`, `"side_effect_style"`, `"side_effect"`, `"style"`, `"index"`, `"sibling"`, `"parent"`, `"subpath"`, `"internal"`, `"builtin"`, `"external"`, `"import"`

### sortImports.groups

type: `array`

Specifies a list of predefined import groups for sorting.

Each import will be assigned a single group specified in the groups option (or the `unknown` group if no match is found). The order of items in the `groups` option determines how groups are ordered.

Within a given group, members will be sorted according to the type, order, ignoreCase, etc. options.

Individual groups can be combined together by placing them in an array. The order of groups in that array does not matter. All members of the groups in the array will be sorted together as if they were part of a single group.

Predefined groups are characterized by a single selector and potentially multiple modifiers. You may enter modifiers in any order, but the selector must always come at the end.

The list of selectors is sorted from most to least important:

- `type` — TypeScript type imports.
- `side_effect_style` — Side effect style imports.
- `side_effect` — Side effect imports.
- `style` — Style imports.
- `index` — Main file from the current directory.
- `sibling` — Modules from the same directory.
- `parent` — Modules from the parent directory.
- `subpath` — Node.js subpath imports.
- `internal` — Your internal modules.
- `builtin` — Node.js Built-in Modules.
- `external` — External modules installed in the project.
- `import` — Any import.

The list of modifiers is sorted from most to least important:

- `side_effect` — Side effect imports.
- `type` — TypeScript type imports.
- `value` — Value imports.
- `default` — Imports containing the default specifier.
- `wildcard` — Imports containing the wildcard (`* as`) specifier.
- `named` — Imports containing at least one named specifier.
- Default: See below

```
["builtin", "external", ["internal", "subpath"], ["parent", "sibling", "index"], "style", "unknown"]
```

Also, you can override the global `newlinesBetween` setting for specific group boundaries by including a `{ "newlinesBetween": boolean }` marker object in the `groups` list at the desired position.

#### sortImports.groups[n]

type: `object | array | string`

##### sortImports.groups[n].newlinesBetween

type: `boolean`

### sortImports.ignoreCase

type: `boolean`

Specifies whether sorting should be case-sensitive.

- Default: `true`

### sortImports.internalPattern

type: `string[]`

Specifies a prefix for identifying internal imports.

This is useful for distinguishing your own modules from external dependencies.

- Default: `["~/", "@/"]`

### sortImports.newlinesBetween

type: `boolean`

Specifies whether to add newlines between groups.

When `false`, no newlines are added between groups.

- Default: `true`

### sortImports.order

type: `"asc" | "desc"`

Specifies whether to sort items in ascending or descending order.

- Default: `"asc"`

### sortImports.partitionByComment

type: `boolean`

Enables the use of comments to separate imports into logical groups.

When `true`, all comments will be treated as delimiters, creating partitions.

```
import { b1, b2 } from "b";
// PARTITION
import { a } from "a";
import { c } from "c";
```

- Default: `false`

### sortImports.partitionByNewline

type: `boolean`

Enables the empty line to separate imports into logical groups.

When `true`, formatter will not sort imports if there is an empty line between them. This helps maintain the defined order of logically separated groups of members.

```
import { b1, b2 } from "b";

import { a } from "a";
import { c } from "c";
```

- Default: `false`

### sortImports.sortSideEffects

type: `boolean`

Specifies whether side effect imports should be sorted.

By default, sorting side-effect imports is disabled for security reasons.

- Default: `false`

## sortPackageJson

type: `object | boolean`

Sort `package.json` keys.

The algorithm is NOT compatible with [prettier-plugin-sort-packagejson](https://github.com/matzkoh/prettier-plugin-packagejson). But we believe it is clearer and easier to navigate. For details, see each field's documentation.

- Default: `true`

### sortPackageJson.sortScripts

type: `boolean`

Sort the `scripts` field alphabetically.

- Default: `false`
