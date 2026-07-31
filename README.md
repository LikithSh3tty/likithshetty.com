<div align="center">

# likithshetty.com

**A personal site that behaves like an old television.**

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=svelte&logoColor=white)](https://svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-8A8F98?style=flat-square)](LICENSE)

</div>

---

Most portfolios are a page you scroll. This one is a television you operate.

The site is a CRT set. Pages are channels, and you change them the way you'd
change a channel: arrow keys, a number, or by typing a name and letting it tune
to the nearest match. Between channels the screen breaks into static — real
static, synthesised rather than looped. There's a remote, a volume dial, and a
mode where the whole thing drifts off into a starfield.

The conceit only works if the illusion never breaks, and most of the engineering
here is in service of that: the chassis has to stay mounted while the screen
content changes, the static has to sound like static, and a channel change has
to feel instant even when it isn't.

## How it works

### The chassis never unmounts

This is the part that makes it feel like a television instead of a website.

Navigation uses Astro's view transitions, but with the swap overridden. Instead
of replacing `<body>`, it swaps only the element marked `[data-swap-container]`
and leaves everything around it alone:

```js
event.swap = () => {
  swapFunctions.deselectScripts(newDoc)
  swapFunctions.swapHeadElements(newDoc)      // page-specific styles still apply
  // the body itself is deliberately not replaced
  ...
}
```

So the TV frame, the remote, the audio context and every Svelte store survive
navigation. The screen changes; the set around it doesn't flicker, remount, or
lose its state. Head elements are still swapped, so per-page styles work
normally.

There's also a **minimum loading time** of 300 ms, enforced *before* the swap
rather than after. A page that loads in 40 ms would otherwise flash through its
loading state too fast to read, which reads as a glitch rather than a tune-in.
Holding the old content visible until the transition can actually be perceived
is what makes it feel deliberate.

### Channels

Channel state lives in Svelte stores, so any component can read or drive it:

```js
export const currentChannel  = writable(0)
export const contentVisible  = writable(true)
export const volume          = writable(0.25)
export const loadingChannel  = writable(LOADING_STATE.None)
```

A `channelMap` describes what each channel is — the site itself, video, or a
live webcam feed. `currentChannelInfo` is derived from it and pads the number to
two digits, so the on-screen badge reads `07` rather than `7`, the way a real
set would.

### The static is real

`noise.js` doesn't play an audio file. It builds a buffer of white noise through
the Web Audio API — a third of a second of `Math.random() * 2 - 1`, looped
through a gain node at very low volume:

```js
const bufferSize = audioCtx.sampleRate / 3
for (let i = 0; i < bufferSize; i++) {
  noiseBufferOutput[i] = Math.random() * 2 - 1
}
```

It tears down properly too — on `ended` the source, the gain node and the audio
context all disconnect, so flipping channels repeatedly doesn't leak contexts.
Browsers cap how many you can open, and a looped sample would have been audible
as a loop.

### Type to tune

Start typing and it matches what you type against every page's aliases using
Levenshtein distance, weighted so prefix matches win:

```js
const weight = alias.startsWith(text) || text.startsWith(alias) ? -4 : 1
const diff = Math.max(0, levenshtein(alias, text) + weight)
```

So a half-typed or slightly misspelled name still lands on the right channel,
and typing the first few characters of something beats a closer-but-unrelated
match elsewhere. It behaves like tuning rather than searching.

### The remote

`keyboard.js` binds channel up/down, jump-to-number, fullscreen, content
toggle and the starfield. It's careful about focus: hotkeys only fire when the
active element is the body, or a button or link that isn't handling the key
itself — so typing in a field never changes the channel underneath you.

## Project layout

```
src/
├── components/
│   ├── TV/
│   │   ├── TV.astro          # the set itself
│   │   ├── TVEffects.astro    # scanlines, glow, CRT treatment
│   │   ├── Starfield.astro    # the space mode
│   │   └── svelte/            # Screen, Remote, Video, Webcam, Volume
│   ├── Header.astro           # + HeaderControls.svelte
│   ├── ChannelHint.svelte     # the on-screen channel badge
│   └── SpaceTrigger.svelte
├── modules/
│   ├── tv.js                  # channel stores + channelMap
│   ├── navigation.js          # view transitions with the custom swap
│   ├── noise.js               # Web Audio white noise
│   ├── textNav.js             # type-to-tune, Levenshtein matching
│   ├── keyboard.js            # the remote
│   ├── pagesIndex.js          # pages and their aliases
│   └── utils.js
├── layouts/
├── pages/
└── styles/
```

## Running it locally

Node 18+.

```bash
npm install
npm run dev
```

Astro serves it on `http://localhost:4321`. Svelte components are islands, so
most of the page ships as static HTML and only the interactive parts hydrate.

```bash
npm run build      # static output
npm run preview    # serve the build
```

`@astrojs/sitemap` generates the sitemap at build time from the `site` value in
`astro.config.mjs`.

## Things I'd add next

- Persist the channel and volume across visits, so the set remembers where you
  left it.
- A reduced-motion path that keeps the metaphor but drops the scanlines, glow
  and starfield for anyone who'd rather not have them.
- Preload the adjacent channels so flipping never waits on a fetch.
- Make the remote usable on touch without falling back to a plain nav.

## License

MIT — see [LICENSE](LICENSE).
