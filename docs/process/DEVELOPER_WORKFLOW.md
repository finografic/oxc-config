# Developer Workflow

Complete guide to the development, testing, and release workflow for this package.

---

## 🔄 Daily Development

### Development Mode

```bash
pnpm dev           # Watch mode for building
pnpm test          # Watch mode for testing
```

### Code Quality

```bash
pnpm lint          # oxlint (repo root config)
pnpm lint:fix      # oxlint --fix
pnpm typecheck     # TypeScript --noEmit
pnpm build         # tsdown → dist/ (needed after src/ changes for root configs)
pnpm schemas:update        # refresh internal/schemas from node_modules
pnpm oxlint:config:capture # snapshot resolved root oxlint → internal/configs/
pnpm oxlint:config:capture:defaults # snapshot defaults config
```

---

## 🎯 Git Workflow

### What Happens When You Commit

```bash
git add .
git commit -m "feat: add new feature"
```

**Automatic hooks run:**

1. ✅ **pre-commit hook** triggers
   - Runs `npx lint-staged --allow-empty` (oxlint + oxfmt on staged globs; md-lint on markdown)
   - Runs `oxfmt --no-error-on-unmatched-pattern` on the repo
   - Fast (roughly seconds to a minute depending on tree size)

2. ✅ **Commit proceeds** if lint/format pass

After pulling hook changes, run `pnpm install` (runs `prepare` → `simple-git-hooks`) or `npx simple-git-hooks` so `.git/hooks/pre-commit` stays in sync.

**No pre-push hook** - tests run before releases only

---

## 📦 Release Workflow

### The Complete Flow

```bash
pnpm release:github:patch  # or .minor or .major
```

**What happens automatically:**

```
1. release:check runs:
   ├─ pnpm format:check # oxfmt --check entire codebase
   ├─ pnpm lint:fix      # Lint entire codebase
   ├─ pnpm typecheck     # Type check entire codebase
   └─ pnpm test:run      # Run ALL tests (non-watch mode)

2. If checks pass:
   ├─ Version bumps in package.json
   ├─ Git commit created
   └─ pre-commit: lint-staged (on package.json only)

3. Push to GitHub:
   ├─ Commit pushed
   ├─ Tag pushed (e.g., v0.5.21)
   └─ No pre-push hook (already validated)

4. GitHub Actions triggers:
   ├─ Workflow detects tag
   ├─ Builds package
   ├─ Publishes to GitHub Packages
   └─ Creates GitHub Release
```

---

## ⚙️ Configuration Details

### package.json Scripts

See `package.json` in the repo root for the canonical script list. Highlights:

- **`pnpm dev`** — `tsdown --watch`
- **`pnpm test` / `pnpm test:run`** — Vitest (watch vs single run)
- **`pnpm lint` / `pnpm lint:fix`** — oxlint with root `oxlint.config.ts`
- **`pnpm format` / `pnpm format:check`** — oxfmt with root `oxfmt.config.ts`
- **`pnpm typecheck`** — `tsc --noEmit`
- **`pnpm schemas:update`** — copy oxfmt/oxlint JSON schemas into `internal/schemas/`
- **`pnpm oxlint:config:capture`** — write resolved oxlint JSON to `internal/configs/oxlint.config.json`
- **`pnpm release:check`** — format, lint fix, typecheck, tests before version bump

### .simple-git-hooks.mjs

```javascript
export default {
  'pre-commit': 'npx lint-staged --allow-empty && oxfmt --no-error-on-unmatched-pattern',
  // No pre-push - tests run in release:check
};
```

**Why no pre-push?**

- Tests already run in `release:check` before version bump
- Avoids redundancy (tests run twice)
- Faster pushes
- Developers can push WIP branches

### lint-staged Configuration

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx,mjs,cjs}": [
      "oxfmt --no-error-on-unmatched-pattern",
      "oxlint -c oxlint.config.ts --fix --no-error-on-unmatched-pattern"
    ],
    "*.md": ["oxfmt --no-error-on-unmatched-pattern", "md-lint --fix"],
    "*.{json,jsonc,yml,yaml,toml}": ["oxfmt --no-error-on-unmatched-pattern"]
  }
}
```

**Key points:**

- ✅ oxlint runs (with fix) on staged TS/JS; oxfmt runs on code, markdown, and data files
- ✅ Runs on staged files only (`--allow-empty` avoids failure when no files match)
- ✅ Auto-fixes when possible; blocks commit if errors remain

---

## 🧪 Testing Strategy

### Test Scripts Explained

```bash
pnpm test          # vitest (watch mode for dev)
pnpm test:run      # vitest run (run once and exit)
pnpm test:coverage # vitest run --coverage
```

**Why the distinction?**

| Context     | Command         | Behavior                                |
| ----------- | --------------- | --------------------------------------- |
| Development | `pnpm test`     | ⏱️ Watch mode - re-runs on file changes |
| Releases    | `pnpm test:run` | ✅ Runs once and exits - doesn't block  |
| CI/CD       | `pnpm test:run` | ✅ Runs once and exits                  |

**Important:** `vitest` alone enters watch mode when run from terminal, but `vitest run` always runs once and exits. Use `test:run` in scripts that need to continue after tests complete.

---

## Git Hooks Generated

**Automatic Setup:** Git hooks are automatically generated when you run `pnpm install` (which triggers the `prepare` script that runs `simple-git-hooks`).

The following hooks are created in `.git/hooks/`:

### pre-commit

```bash
#!/bin/sh
npx lint-staged --allow-empty && oxfmt --no-error-on-unmatched-pattern
```

**Purpose:** Lint-staged (oxlint + oxfmt + md-lint on matching globs), then full-tree oxfmt  
**Speed:** Dominated by full-tree oxfmt on large repos  
**Blocking:** Yes (commit fails if a step fails)

### No pre-push Hook

**Deliberately omitted** to avoid redundancy. All checks run in `release:check` before version bump.

---

## 🚨 Troubleshooting

### Tests Hang in Watch Mode

**Problem:** `pnpm release:github:patch` hangs after tests

**Cause:** Using `pnpm test` instead of `pnpm test:run`

**Solution:** Ensure `release:check` uses `test:run`:

```json
"release:check": "pnpm format:check && pnpm lint:fix && pnpm typecheck && pnpm test:run"
```

### Commits Blocked by Lint

**Problem:** Can't commit because lint fails

**Solution:**

```bash
pnpm lint:fix       # Auto-fix issues
git add .           # Re-stage fixed files
git commit -m "..."
```

### Release Fails

**Problem:** `release:check` fails

**Solution:** Fix issues before trying again:

```bash
pnpm lint:fix       # Fix lint issues
pnpm typecheck      # Check types
pnpm test:run       # Verify tests pass
```

---

## 📋 Checklist: Before Release

- [ ] All changes committed
- [ ] On `master` branch
- [ ] `pnpm format:check` passes
- [ ] `pnpm lint:fix` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test:run` passes
- [ ] Ready to publish

Then run:

```bash
pnpm release:github:patch
```

---

## 🎯 Philosophy

This workflow is designed for:

1. **Fast commits** - Only lint changed files
2. **Thorough releases** - Full validation before publishing
3. **No redundancy** - Each check runs once, not multiple times
4. **Developer friendly** - Can commit WIP, validation happens before release
5. **CI/CD ready** - Same commands work locally and in GitHub Actions

---

## Related Documentation

- [Release Process](./RELEASE_PROCESS.md) — release commands and verification
- [GitHub Packages Setup](./GITHUB_PACKAGES_SETUP.md) - Initial configuration (if applicable)
