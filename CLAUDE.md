# CLAUDE.md

Kai Health (a working name, set once in `apps/web/lib/config.ts`) is a portfolio concept for a Canadian preventive-health membership. It is not a real service. Phase 0: synthetic data only, free tiers, every outside service behind an interface we own. See `docs/architecture.md`.

## Working principle

Keep every code change as clean and scalable as possible while achieving what the prompt asks for. In practice:

- Solve the request with the smallest change that will still read well as the project grows.
- Reuse the tokens, primitives and typed content that exist before adding new ones.
- One source of truth per fact. If a value is needed twice, it becomes a token, a config constant or typed content.
- No speculative abstractions and no dead code. Add structure when the second use arrives.
- Leave the files you touch at least as tidy as you found them.

## Layout

```
design/
  tokens/tokens.css        the one file for palette, fonts, borders, radii, shadows
  wireframe/landing.html   frozen starting snapshot
  README.md                how to change tokens
apps/web/
  app/                     routes, globals.css, fonts.ts, styleguide/, coming-soon/
  components/              one component per page section
  components/ui/           Radix wrappers and plain primitives
  content/                 copy, FAQ and synthetic sample data as typed data
  lib/config.ts            brand name, feature flags
  scripts/check-contrast.mjs
docs/                      architecture.md, branch-protection.md
.claude/  .github/
```

### Reserved for later (do not create until needed: no folders, no .gitkeep)

These follow docs/architecture.md, not Dispatch.

- Phase 0 backend lives inside apps/web. No separate API app: endpoints are Next.js route handlers and server actions.
- apps/web/lib/ports/ - one TypeScript interface per outside service: auth, billing, lab partner, mailer, AI drafts. Written when first used.
- apps/web/lib/adapters/ - one implementation per port (Supabase auth, Stripe test mode, mock lab partner, and so on). Only adapters import vendor SDKs. Wired together in one composition file.
- supabase/ - Supabase CLI migrations and a seed.sql of synthetic data. Separate identity and clinical schemas linked only by a random subject id, a versioned consent ledger, an append-only audit log, FHIR-shaped result tables. Ask before choosing a query layer.
- infra/ (Phase 1) - infrastructure as code for the AWS Canada accounts (ca-central-1, ca-west-1). Tool chosen then.
- ml/ (Phase 3) - Python ML zone in a separate account, fed only through the consent-gated de-identification gate. Outside the pnpm workspace and Biome.

packages/ and Turborepo come only when a second app needs shared code. Ask before creating either.

## How the design evolves

- The wireframe in `design/wireframe/landing.html` seeded the first build. It is a frozen snapshot. Do not edit it and do not treat it as current.
- After the first build, the code and `design/tokens/tokens.css` are the source of truth.
- The palette, fonts, borders and layout will keep changing, and new designs will be added that the wireframe never had. Tokens exist to make common changes one-line edits. They are defaults, never a reason to refuse or flatten a new design.
- Components use role tokens by default. Any component may use a named value directly.
- One-off values inside a component are allowed for experiments. Mark them `// one-off:` with a reason so they can be promoted to tokens if they stick.
- `data-theme="dark"` on any element re-points the colour roles inside it. A `data-style="..."` attribute may re-point font, border or radius roles the same way. See `design/README.md`.
- All fonts load in `apps/web/app/fonts.ts` with `next/font`. No runtime requests to a font host.

## UI components

- `apps/web/components/ui/` holds Radix wrappers and plain primitives. Nothing outside `components/ui/` imports from `@radix-ui`.
- Individual `@radix-ui/react-*` packages only, and only where behaviour needs them. No Radix Themes, Radix Colors or shadcn/ui.
- Every primitive takes a `variant` prop from the start, even with one variant. A new treatment is a new variant, not a fork.
- Class names are joined with a small local helper. No variant library.
- Radix states are styled with data attributes (`data-[state=open]:`). Wrappers are client components. Sections stay server components.
- Decorative SVG artwork is its own component in `ui/`, with fills pointing at palette variables.

## Stack and dependencies

- TypeScript strict, Next.js App Router, React, Tailwind CSS v4 driven by CSS variables, Radix Primitives.
- Vercel free plan, no host-specific features.
- No database, auth, payments, analytics or email SDK yet.
- Ask before adding any dependency. If 20 lines of local code solves it, write that.
- `@biomejs/biome` is pinned to exactly 2.5.11 and pnpm to 11.24.0.

## Tooling

- pnpm only. Never npm, npx or yarn in scripts, hooks, CI or docs.
- `pnpm start` runs the dev server. `pnpm format`, `pnpm lint`, `pnpm typecheck` and `pnpm build` must pass before a change is handed over.
- Biome is the only linter and formatter. `design/` is not linted.
- `pnpm check:contrast` reports WCAG AA contrast for role pairs. It never fails the build and is not part of CI.
- Imports inside `apps/web` are relative. There is no path alias, because the root `tsc` run would not see one.

## Branch workflow

- Never commit or push to `main`. Every change goes through a branch (`feat/`, `fix/`, `chore/`) and a pull request.
- Merge commits only. Every commit message is a conventional commit.
- Claude never runs `git commit` or `git push` and never opens or merges a pull request. Claude leaves changes in the working tree and provides the commit message plus the pull request title and body.
- No Claude attribution or co-author lines.
- Hooks in `.claude/hooks/` block commits on `main`, block em dashes and format files on save. They need `jq`.
- CI is `.github/workflows/ci.yml`, job name `checks`. The ruleset is in `.github/rulesets/protect-main.json` and `docs/branch-protection.md` explains how to apply it.

### Pull request format

- The title uses the conventional commit format.
- The body follows `.github/pull_request_template.md`: Description, How to test it, Related resources, Additional comments.
- The description is required, in plain language for a reader who does not know the codebase.
- Include a before and after screenshot for visual changes.

## Conventions

- No `any`. No `as` casts to silence a type error. No non-null assertions outside tests.
- Comments are single-line `//` and explain why, not what.
- Single hyphens in prose, comments, copy and commit messages. Never an em dash or a double hyphen.
- Files are kebab-case, components are PascalCase.
- Server components by default. Semantic HTML, one `h1` per page, keyboard-reachable controls, visible focus states, alt text, reduced motion respected.
- Responsive from 360px up.

## Privacy guardrails

- Collect no personal or health information. No analytics, tracking pixels or third-party scripts.
- Calls to action go to `/coming-soon`. Any waitlist form is rendered disabled, with a note that it is a demo.
- Sample results must be obviously synthetic and labelled as such in `content/`.
- The footer carries a visible line saying this is a concept project, not a real testing service, and that no real data is collected.
- Add no medical claims that are not already in the product copy. Keep placeholders as clearly marked placeholders. Do not invent content.
