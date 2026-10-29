# lumenui

Copy [Lumen UI](https://ui.elouanb.fr/) components into your project. The CLI writes the source. It does not install a component package.

## Use

```bash
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button
npx @aloneday/lumenui@latest add button card dialog
npx @aloneday/lumenui@latest add all
npx @aloneday/lumenui@latest rm button
npx @aloneday/lumenui@latest list
```

`init` writes `lumen.json`, `cn()`, and `globals.css`. `add` copies the component, the local files it needs, installs the npm packages, and writes that stylesheet when the project does not already have the Lumen tokens. `rm` deletes that component. Shared files stay while something else still imports them.

Both commands also install `tailwindcss`, `@tailwindcss/postcss`, and `tw-animate-css`, and add `postcss.config.mjs` when the project has no PostCSS config. If `globals.css` exists without the Lumen tokens, it is replaced and the previous file is kept as `globals.css.bak`.

## Options

```bash
lumenui init
lumenui add <component>...
lumenui add all
lumenui rm <component>...
lumenui list
```

| Flag | |
| --- | --- |
| `--cwd <dir>` | Project directory. Default: the current directory. |
| `--force` | Remove a component even when others still import it. |
| `--dry-run` | Print the files and packages without writing. |

Node.js 22.23.4 or newer.

A GitHub release of Lumen UI publishes this package at the same version via npm Trusted Publisher (OIDC).
