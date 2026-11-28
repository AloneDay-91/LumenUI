# Changelog

## [1.4.1](https://github.com/AloneDay-91/LumenUI/compare/v1.3.1...v1.4.1) (2026-11-28)


### Added

* **vue:** add 130 Vue 3 components on Reka UI, 111 Vue examples, `--framework vue` CLI support, and `/docs/vue` guide
* **docs:** switch component pages between React and Vue from the sidebar, with a Callout notice on components not yet available for Vue
* **docs:** add per-stack framework guides (Next.js, Vite, React Router, Astro, TanStack Start, Vite + Vue, Nuxt, Laravel + Inertia, Astro + Vue)
* **shaders:** add real-time WebGL shaders gallery and studio (53 presets across 25 GLSL engines)
* **ui:** add 19 components (Video, Audio Player, Comparison Slider, Kanban, Selection Bar, Inline Edit, Diff Viewer, Phone Input, Currency Input, Markdown, Mention Input, Emoji Picker, Event Calendar, Heatmap, Gauge, Number Ticker, Signature Pad, Image Cropper, Onboarding Checklist)
* **theme:** add Medusa preset aligned with the Medusa UI design system (surfaces, elevations, tags, buttons, fields, controls)
* **nav:** open the site header as a floating Navigation Menu panel (`variant="panel"`) with smooth Base UI morphing transitions
* **docs:** add What's new sidebar card and GitHub edit/issue links on every docs page


### Changed

* **color-picker:** read and write hex, rgb, hsl, and oklch with opacity, eyedropper, swatches, and inline panel
* **customize:** set Lumen as the default theme, rework controls, and widen the preview
* **chart:** step series down from `--primary`
* **blocks:** remove the legacy Blocks section and update navigation and sitemap


### Fixed

* **nav:** smooth `variant="panel"` transitions and use semantic `accent` hover tokens
* **customize:** avoid dark-mode hydration mismatch
* **sidebar:** follow the theme radius token on menu items

## [1.3.1](https://github.com/AloneDay-91/LumenUI/compare/v1.3.0...v1.3.1) (2026-11-18)


### Fixed

* **video:** keep the showcase film from shifting the page ([7f5329e](https://github.com/AloneDay-91/LumenUI/commit/7f5329e87be173b9c4db7102ece7fdb8d9221050))
* **video:** keep the showcase film from shifting the page ([7bfc9e2](https://github.com/AloneDay-91/LumenUI/commit/7bfc9e2a7e6dd4d9518256bcc3bfacb234b28afb))

## [1.3.0](https://github.com/AloneDay-91/LumenUI/compare/v1.2.0...v1.3.0) (2026-11-17)


### Added

* **analytics:** load tracker and replay from public env ([e305903](https://github.com/AloneDay-91/LumenUI/commit/e30590336ec2f0d0efa07e64dff81fd42da760f3))
* **blocks:** put Blocks on the docs layout ([544f6be](https://github.com/AloneDay-91/LumenUI/commit/544f6beb2eeaa685cdcd8a2fac26eaa18150f2ef))
* **blocks:** rebuild the Lumen kit as frozen, standalone blocks ([cd90be7](https://github.com/AloneDay-91/LumenUI/commit/cd90be74fa3d860e81979656047d72ff1c368ba7))
* **docs:** new theme, version select and split copy button ([3e3e70e](https://github.com/AloneDay-91/LumenUI/commit/3e3e70e25ae1561f39a6e5657f9af049bcbfde53))
* **docs:** version badges and a version menu ([3a2bb78](https://github.com/AloneDay-91/LumenUI/commit/3a2bb789e58588697cc723bafcfbc0570e9ffc2c))
* **marketing:** restyle the landing and footer ([8fab364](https://github.com/AloneDay-91/LumenUI/commit/8fab3643d42f149f2a8d4a5cc39c02f2759dd9d1))
* **marketing:** restyle the landing and footer ([14110a3](https://github.com/AloneDay-91/LumenUI/commit/14110a3b1ed90e997b43027249ce4d5decc5411f))
* **ui:** outline fields and a scroll fade by default ([374f76e](https://github.com/AloneDay-91/LumenUI/commit/374f76e4e00a3e65bb84fb5a5bbca8216c756b04))

## [1.2.0](https://github.com/AloneDay-91/LumenUI/compare/v1.1.1...v1.2.0) (2026-11-17)


### Added

* **ai:** add AI patterns built on one Trace ([320d04c](https://github.com/AloneDay-91/LumenUI/commit/320d04cca60d580094690491998f2337a0ab6b40))
* **css:** add scroll-fade and shimmer utilities ([4584da7](https://github.com/AloneDay-91/LumenUI/commit/4584da7034589e701e7a4bdc61ffc72a6cad6c9c))
* **docs:** titled changelog releases and clearer component pages ([77ff1c8](https://github.com/AloneDay-91/LumenUI/commit/77ff1c8df3f6ae4daed32352d808955a86b2566c))
* **ui:** add ten components for actions, forms, data, and overlays ([0e3a898](https://github.com/AloneDay-91/LumenUI/commit/0e3a8981c44036729644db3eddd7e38fe1f40d71))
* **ui:** add thirteen components, a loading Button and status toasts ([c3ceed1](https://github.com/AloneDay-91/LumenUI/commit/c3ceed11429a15911a086aa63dbab608efaf5574))


### Fixed

* **button:** give the outline variant its own light fill ([7b0aa85](https://github.com/AloneDay-91/LumenUI/commit/7b0aa858e71fd4c7ccb3dcd58a188bf6f54811c3))
* **deps:** upgrade Next.js from 16.4.2 to 16.4.6 ([6848908](https://github.com/AloneDay-91/LumenUI/commit/68489085da2bf241a8b8381caa8eee28f8e07a45))
* **docs:** keep prose sizing off component paragraphs ([c02a899](https://github.com/AloneDay-91/LumenUI/commit/c02a899be817ddc0c379ab5519281377e60f6f93))
* **input-group:** stop the inner Input from painting its own fill ([028f0ec](https://github.com/AloneDay-91/LumenUI/commit/028f0ec98701cd8a1ea576a73d7cd4643194736d))
* **theme:** crimson destructive, warm neutrals and a visible focus ring ([d5ed5d2](https://github.com/AloneDay-91/LumenUI/commit/d5ed5d28697911ca9bc28864820ac2445f18c909))
* **toast:** wrap long descriptions under the title and move the action below ([f7af629](https://github.com/AloneDay-91/LumenUI/commit/f7af6294a07963d044dcc76b6c6315b7544026ba))

## [1.1.1](https://github.com/AloneDay-91/LumenUI/compare/v1.1.0...v1.1.1) (2026-11-06)


### Fixed

* **deps:** update minimatch ([#27](https://github.com/AloneDay-91/LumenUI/issues/27)) ([828cecd](https://github.com/AloneDay-91/LumenUI/commit/828cecd0528ca4b6062247a17fa9363fcaab3a7b))

## [1.1.0](https://github.com/AloneDay-91/LumenUI/compare/v1.0.7...v1.1.0) (2026-10-29)


### Added

* **cli:** keep edited files unless --overwrite ([9d8c5b3](https://github.com/AloneDay-91/LumenUI/commit/9d8c5b3eaf665be69597d2ed52c397f1a02d5604))
* **docs:** rewrite the installation path and add guides ([017a348](https://github.com/AloneDay-91/LumenUI/commit/017a34844566bd5717cbe59886a0c3d9daf058ed))
* **sidebar:** open on hover and collapse smoothly ([160c93e](https://github.com/AloneDay-91/LumenUI/commit/160c93e4c4eb198c0fd3405a3a1b8694bf0a69e8))
* **ui:** shared hues for Alert and Badge, effect-free component state ([7c9bb72](https://github.com/AloneDay-91/LumenUI/commit/7c9bb728f5b66f8b145b0802153fe04329ccc056))


### Fixed

* **ci:** pass the CLI tests to node --test as a glob ([01c5264](https://github.com/AloneDay-91/LumenUI/commit/01c5264c6c750c57f8238f6abd586bff92abe3f3))
