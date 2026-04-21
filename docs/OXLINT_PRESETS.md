# @finografic/oxc-config - oxlint presets

## Set of **`oxlint`** scenarios (presets)

Here's how each one actually differs:

---

### Client — React/Vite

```ts
env: { builtin: true, browser: true }   // drop node
options: { typeCheck: true, typeAware: true }
categories: { correctness: 'error', perf: 'error' }
```

Plus `react-perf` plugin rules matter most here.

---

### Hono Server — Node

```ts
env: { builtin: true, node: true }      // your default
options: { typeCheck: true, typeAware: true }
categories: { correctness: 'error', perf: 'error' }
```

This is basically your `oxlintConfig` default as-is.

---

### CLI Util

```ts
env: { builtin: true, node: true }
options: { typeCheck: true, typeAware: true }
categories: { correctness: 'error', perf: 'error' }
```

Same as server, but you'd likely want `no-console: 'allow'` in rules — CLI tools write to stdout intentionally. Worth a `cliRules` export that just overrides that one rule.

---

### Config-only Library (like this package itself)

```ts
env: { builtin: true, node: true }
options: { typeCheck: true, typeAware: true, reportUnusedDisableDirectives: 'error' }
categories: { correctness: 'error' }   // drop perf — no runtime perf concerns
```

Also `no-console: 'allow'`, and you'd drop `react`/`react-perf`/`vitest` from plugins if there's no React or tests.

---

### Zsh/Bash scripts

This is the outlier — oxlint doesn't lint shell scripts at all. You'd use `shellcheck` for that. If you mean a Node CLI that _calls_ shell commands, that's just the CLI Util scenario above.

---

## Practical takeaway

The only env/options differences that actually matter across these are:

|             | `browser` | `node` | `typeAware` | `react` plugin | `perf` category |
| ----------- | --------- | ------ | ----------- | -------------- | --------------- |
| Client      | ✓         | —      | ✓           | ✓              | ✓               |
| Server/Hono | —         | ✓      | ✓           | —              | ✓               |
| CLI         | —         | ✓      | ✓           | —              | ✓               |
| Config lib  | —         | ✓      | ✓           | —              | —               |

Rather than exporting separate full configs for each scenario, I'd keep `oxlintConfig` as the Node/server default and export the individual `lintEnv` variants as named constants — `lintEnvBrowser`, `lintEnvNode` — so consumers swap just that one piece. The rest composes fine as-is.
