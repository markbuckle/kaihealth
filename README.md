# Kai Health

A portfolio concept for a Canadian preventive-health membership: 100+ lab tests a year, clinician-explained results and a biomarker dashboard.

Concept project. Not a real testing service. No real data is collected. "Kai Health" is a working name.

## Run it

Needs Node 22.13 or later, pnpm 11.24.0 and, for the Claude Code hooks, `jq`.

```sh
pnpm install
pnpm start
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm start` | Runs the web app dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Biome lint and format check |
| `pnpm format` | Biome lint and format, writing fixes |
| `pnpm typecheck` | TypeScript, no output |
| `pnpm check:contrast` | WCAG AA contrast report for the colour roles; reports only, never fails |

In development, http://localhost:3000/styleguide shows every token and UI component. It is off in production builds.

## Where things are

- `apps/web` the Next.js app
- `design/tokens/tokens.css` every colour, font, radius and border in one file
- `design/README.md` how to change the design
- `docs/architecture.md` the phased architecture plan
- `docs/branch-protection.md` how to protect `main`
- `CLAUDE.md` conventions and workflow

## Contributing

Never commit to `main`. Work on a `feat/`, `fix/` or `chore/` branch and open a pull request. See `CLAUDE.md`.
