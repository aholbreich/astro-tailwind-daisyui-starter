# Astro + Tailwind CSS 4 + Daisy UI 5 project stater

* **T**ailwind
* **D**aisyUI

A minimalistic Astro project starter that includes Astro 5, Tailwind 4 with DaisyUI 5. No Java Script is preinstalled.

For Preinstalled Java Scripts see:

* A child starter + Alpine.js [astrostart_TDA](https://github.com/aholbreich/astrostart_TDA)
* A child starter + Vue.js [astro_start_daisyui_vue](https://github.com/aholbreich/astro_start_daisyui_vue)


The purpose is the demonstration of the integration of the [listed Dependencies](#Dependencies) 
Also, it includes a few example components or project configuration.


[Live Demo](https://astro-start-tailwind.vercel.app/)

## Usage
### 1. Start you project using this template
Bootstrap your new project using this template with:

```bash
pnpm create astro@latest --template aholbreich/astrostart_TD
```

Alternatively clone this repo and just start coding. The following commands should be helpful:

### 2. Make it run locally

`pnpm install`
`pnpm dev` 

Navigate to the browser and make sure you see some first components

### 3. Adapt

1. Start with `site-config.ts` and see how its affect the results
2. Add new pages, components, change whatever you like 

### Commands

All commands are run from the root of the project, from a terminal:
I'm in favor of `pnpm` but `npm` and yarn would work as well.

| Command                 | Action                                           |
| :---------------------- | :----------------------------------------------- |
| `pnpm install`          | Installs dependencies                            |
| `pnpm dev`              | Starts local dev server at `localhost:3000`      |
| `pnpm build`            | Build your production site to `./dist/`          |
| `pnpm preview`          | Preview your build locally, before deploying     |
| `pnpm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro --help` | Get help using the Astro CLI                     |

if  `pnpm preview`  is not working for you, you can workaround with:

```bash
pnpm build
pnpm dlx serve dist
```

## Dependencies

- Astro 5.14
- Astro Icon
- Astro SEO
- Astro MDX
- Tailwind CSS 4
- DaisyUI 5.1
- Netlify

## Configuration & Customization

Simple configuration can be found in `src/lib/config.ts`
There are just a few demonstration components, you can delete them, ignore them, adapt them whatever fist you.

### TypeSctipt
Everything in place. If you don't use VSCode Astro Plugin install @astrojs/ts-plugin to get full TS support. (Needed config already added)
```bash
pnpm add @astrojs/ts-plugin
```

### DaisyIU. 
You can also ignore DaisyUI or carve it out by removing @plugin "daisyui"; from global.css and (optionally remove package)

## Collaboration

Feel free to provide your feedback or feature requirements.

### TODO

* Add more DaisyUI components
* Add some more sitempap example/doc
* Add MDX demonstration