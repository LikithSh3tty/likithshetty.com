# Portfolio

![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

My personal site, built as a vintage CRT television. The nav is a remote control,
the pages are channels, and the whole thing is wrapped in scanlines, static and
a VCR OSD font.

Channel 00 is the site itself. Channels 01 through 09 are video loops and channel
10 is the webcam.

## Running it locally

You'll need Node 18+.

```bash
npm install
npm run dev
```

Astro serves the site on `http://localhost:4321`.

```bash
npm run build
```

Builds to `dist/` as a static site.

## Project layout

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── TV/               # the television: screen, remote, effects, starfield
│   │   ├── Header.astro      # breadcrumb, date, channel readout, text nav
│   │   └── Footer.astro      # contact links + the space trigger
│   ├── content/nav/          # one JSON per navigable destination
│   ├── modules/
│   │   ├── tv.js             # channel/volume stores and the channel map
│   │   ├── projects.ts       # the project lists rendered on the inner pages
│   │   └── pagesIndex.js     # aliases for type-to-navigate
│   ├── pages/                # home, open-source, websites, 404
│   └── styles/
└── public/assets/            # fonts, textures, cursors
```

## Notes

Astro and Svelte are pinned to exact versions on purpose. Newer releases break
hydration on every island, which silently kills the TV while the page still
renders. Do not run `npm update` here.

All channel videos need `-movflags +faststart`, or the browser buffers the whole
file before playing. A fragmented mp4 reports a duration of zero and will never
loop. See `public/assets/videos/README.md`.

## Still to do

- Point a real domain at it and update `site` in `astro.config.mjs`.
- Tie the remaining channels to something. Channel 09 is Bengaluru, linked from
  the word in the bio; the rest are unthemed.
