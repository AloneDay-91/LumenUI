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

`init` writes `lumen.json` and `cn()`. `add` copies the component, the local files it needs, and installs the npm packages. `rm` deletes that component. Shared files stay while something else still imports them.

## Options

```bash
lumenui init [--css]
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
| `--css` | With `init`, write `globals.css` when it is missing. |

Node.js 22 or newer.

A GitHub release of Lumen UI publishes this package at the same version.
