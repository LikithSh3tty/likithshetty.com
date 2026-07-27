# Portfolio

![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)
![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

My personal site, built as a vintage CRT television. The nav is a remote control,
the pages are channels, and the whole thing is wrapped in scanlines, static and
a VCR OSD font.

Channel 00 is the site itself. Channels 01 through 08 are video loops and channel
09 is the webcam.

## Credit

This is built on [kaisermann.me](https://github.com/kaisermann/kaisermann) by
Christian Kaisermann, used under the MIT license. The TV concept, the CRT effects
and the interaction model are his. The content, the projects and the copy are mine.

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

## Still to do

- Record channel loops for 01 through 08. Nothing plays on those until
  `public/assets/videos/channel-0N.{mp4,webm}` exist.
- Add `public/assets/images/me.jpg` for the photo that appears on name hover.
- Point a real domain at it and update `site` in `astro.config.mjs`.
