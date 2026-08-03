<div align="center">

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="public/assets/images/icon-512.png"
  />
  <img
    src="public/assets/images/likith-logo.png"
    width="110"
    alt="LS monogram"
  />
</picture>

# likithshetty.com

**A personal site that behaves like an old television.**

[likithshetty.com](https://likithshetty.com)

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

## What's on it

Every page is a channel. You reach them with the arrow keys, by typing a
number, or by typing a name and letting it tune to the closest match.

| Channel | What it is |
| --- | --- |
| `/` | who I am and what I've been building |
| `/open-source/` | the repositories, with a line each on what they do |
| `/websites/` | the ones that are deployed and clickable |
| `/writing/` | essays, hosted here rather than only on Medium |
| `/playlists/` | what it gets built to |
| `/resume/` | the long version |

Several channels aren't pages at all — a few are video, and one is a live
webcam feed piped onto the screen, which is the joke working as intended.

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

### Being a television without hiding from crawlers

A site whose content sits behind an interaction metaphor can easily end up
invisible — to search engines and to screen readers alike. Every channel is a
real route with a real URL, prerendered to static HTML, so none of it depends
on the TV working.

The set has nowhere sensible to put a visible heading, so each page carries an
`h1` that's positioned off-screen with `clip-path` and still read by assistive
tech and crawlers. That's deliberately *not* the `.visually-hidden` class in
this codebase, which is `visibility: hidden` and correctly drops elements from
the accessibility tree — it's used to hold layout while video loads. Off-screen
headings use `.sr-only` instead.

The rest of the metadata lives in `Head.astro`: canonical URLs, Open Graph and
Twitter cards, and a `Person` schema whose `sameAs` ties this domain to my
GitHub, LinkedIn and Medium. That last part earns its keep — there's a Kannada
film actor with my name and a Wikipedia entry, so the name alone disambiguates
nothing.

The favicon set is generated from the logo above rather than hand-exported:
the mark is masked by luminance, inverted to white on black so it survives a
dark browser tab strip, cropped above the wordmark (unreadable below ~64px),
and written out at 16/32/48 in `favicon.ico` plus PNGs for Apple and Android.

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

Use npm. The lockfile is `package-lock.json`, and there's no `packageManager`
field precisely so nothing resolves dependencies fresh behind your back.

### Why some versions have no caret

```json
"@astrojs/sitemap": "3.5.1",
"@astrojs/svelte":  "7.1.0",
"astro":            "5.13.3",
"svelte":           "5.38.2",
```

These four are pinned exactly, and that is not a stylistic choice. Minor bumps
across the Astro/Svelte integration boundary have broken hydration here three
separate times, and the failure is quiet: the page still renders, the islands
just stop responding. Nothing errors, so you find out by clicking something and
noticing it's dead.

If you bump them, bump them on purpose and then actually operate the set — flip
a channel, drag the volume, toggle the starfield. A green build proves nothing
about whether the islands still hydrate.

## Deployment

Static output on Vercel, built from `main` on every push. `astro build` writes
`dist/`, which is what gets served — there's no server runtime.

The videos are the whole payload: about 49 MB of MP4 against roughly 1 MB of
everything else. It doesn't cost anything on load, because no `<video>` element
ships in the HTML — the Svelte island mounts one only when you land on a
channel that needs it.

## Things I'd add next

- Persist the channel and volume across visits, so the set remembers where you
  left it.
- Finish the reduced-motion path. Only `ChannelHint` and `HeaderControls`
  currently honour `prefers-reduced-motion`; the scanlines, glow and starfield
  ignore it entirely, which is the wrong way round.
- Encode WebM alongside the MP4s. The player asks for `.webm` first and takes a
  404 on every channel change before falling back — and it would roughly halve
  the video payload.
- Preload the adjacent channels so flipping never waits on a fetch.
- Make the remote usable on touch without falling back to a plain nav.
- A page per project. Right now each one gets a single line, which undersells
  the ones with actual mechanisms behind them.

## License

MIT — see [LICENSE](LICENSE).
