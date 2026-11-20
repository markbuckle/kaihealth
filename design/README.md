# Design

`tokens/tokens.css` is the one file for palette, fonts, type sizes, borders, radii, shadows and motion.

`wireframe/` holds two frozen snapshots: `landing.html` seeded the landing page and `dashboard.html` seeded the member dashboard's layout and Home page. Do not edit them. For anything already built, the code and the tokens are the source of truth. Dashboard screens not built yet still start from `dashboard.html`.

Dashboard links to screens that do not exist yet come from `apps/web/content/dashboard-nav.ts`. Each page there has a `ready` flag: until it is `true`, the page renders disabled with a "Soon" label instead of as a link.

## How the tokens file works

There are two tiers.

1. **Named values**: the raw sets, for example `--color-teal-600`, `--font-serif`, `--radius-pill`, `--text-16`.
2. **Roles**: what a value is for, for example `--color-page`, `--color-accent`, `--font-heading`, `--radius-card`. A role points at a named value. Components use roles by default.

Most tokens sit inside `@theme` blocks. Every line there becomes a CSS variable and a Tailwind class at the same time, so there is nothing else to update:

| Token | Variable | Classes |
| --- | --- | --- |
| `--color-page` | `var(--color-page)` | `bg-page`, `text-page`, `border-page` |
| `--color-teal-600` | `var(--color-teal-600)` | `bg-teal-600`, `text-teal-600` |
| `--font-heading` | `var(--font-heading)` | `font-heading` |
| `--text-64` | `var(--text-64)` | `text-64` |
| `--radius-pill` | `var(--radius-pill)` | `rounded-pill` |
| `--spacing-gutter` | `var(--spacing-gutter)` | `px-gutter`, `gap-gutter` |
| `--container-content` | `var(--container-content)` | `max-w-content` |

Avoid names Tailwind already uses for a built-in class, such as `--container-prose`: Tailwind's own `max-w-prose` wins. That is why the reading width is `--container-reading`.

The prefix decides which classes a token creates: `--color-`, `--font-`, `--text-` (sizes), `--leading-`, `--tracking-`, `--spacing-`, `--container-`, `--radius-`, `--shadow-`, `--blur-`, `--ease-`. Border styles and durations have no Tailwind class family, so they sit in a plain `:root` block and are used as `var(--border-hairline)` or `var(--duration-fast)`.

## Change the palette

- Change a colour everywhere: edit its named value, for example `--color-teal-600`.
- Point a role at a different colour: edit the role line, for example `--color-accent: var(--color-rose-500);`.
- Add a colour: add one line to the palette, named by hue and step (higher is darker), for example `--color-teal-300: #7fd3e0;`.
- Change a dark band: edit the same role inside the `[data-theme="dark"]` block.

Run `pnpm check:contrast` afterwards to see whether text still passes WCAG AA.

## Add or swap a font

1. In `apps/web/app/fonts.ts`, load the face with `next/font`, give it a `variable` such as `--font-fraunces`, and add it to the `fontVariables` list.
2. In `tokens.css`, add or edit one line: `--font-display: var(--font-fraunces), Georgia, serif;`.
3. To use it for all headings, point the role at it: `--font-heading: var(--font-display);`.

## Add a border or radius style

- Radius: add one line, for example `--radius-blob: 2rem;`. The class `rounded-blob` now exists. To make every card use it: `--radius-card: var(--radius-blob);`.
- Border: add one line in the `:root` block, for example `--border-double: 3px double;`. To make every card use it: `--border-card: var(--border-double);`. If you want a class for it, add a matching `@utility border-double` block in `apps/web/app/globals.css` next to the others.

## Add a component variant

Every primitive in `apps/web/components/ui/` takes a `variant` prop. To add a treatment, add one entry to that component's variants map and use it: `<Card variant="outlined-strong">`. Do not copy the component.

A value that is only an experiment can be written inline in the component. Mark it `// one-off:` with a reason. If it sticks, promote it to a token.

## Scope a style to one section

Colour: put `data-theme="dark"` on any element. Every role inside it switches to the dark values.

```html
<section data-theme="dark" class="bg-page text-text">...</section>
```

`data-theme="light"` switches back to the light roles inside a dark band, as the light dashboard card in the dark hero does. Its block in `tokens.css` repeats the light colour roles, so when you change a light colour role, change it in both places.

The member dashboard sets `data-theme` on its root from the visitor's light or dark choice, and also carries `data-style="app"`. In dark, the `[data-style="app"][data-theme="dark"]` block gives the dashboard its own surface, border, button and accent, as the dashboard wireframe draws them, while the landing page's dark bands keep theirs. To change the dashboard's dark look, edit that block.

### Status colours

`status-good`, `status-neutral`, `status-warn` and `status-flag` mark the four result statuses: optimal, in range, borderline and out of range. They colour dots, range-bar zones and chart marks only. Status labels always stay in the text colour, so the status colours never need to pass as text.

Fonts, borders and radii work the same way with `data-style`. Add a block to `tokens.css` that re-points only the roles you want to change, then put the attribute on a section:

```css
[data-style="editorial"] {
  --font-heading: var(--font-sans);
  --radius-card: var(--radius-sharp);
  --border-card: var(--border-strong);
}
```

```html
<section data-style="editorial">...</section>
```

No `data-style` blocks exist yet. Add one when a design needs it.
