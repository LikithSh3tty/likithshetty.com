# Channel videos

Drop channel loops here. The filename is what wires a video to a channel, so the
naming has to be exact.

```
channel-01.mp4    channel-01.webm
channel-02.mp4    channel-02.webm
...
channel-08.mp4    channel-08.webm
```

Two digits, zero-padded. `channel-1.mp4` will not be found.

## Rules

- **Channels 01 through 08 only.** Channel 00 is the site itself and channel 09
  is the webcam. Neither reads from this folder.
- **The `.webm` is optional.** `Video.svelte` lists webm first and falls through
  to mp4, so an mp4 on its own works everywhere. Shipping both just saves bytes
  on browsers that prefer webm.
- **Videos loop and carry a timestamp.** The channel remembers where it was and
  resumes there, so a loop that cuts cleanly at both ends looks best.
- **They play with sound**, at 25% volume by default. Silent clips are fine.

## Fewer than eight

Channels are declared in `src/modules/tv.js` in `channelMap`. If you only have
three loops, delete entries 4 through 8 so the remote stops on a dead channel:

```js
export const channelMap = {
  0: {},
  1: { type: 'video', duration: null, startTimestamp: null },
  2: { type: 'video', duration: null, startTimestamp: null },
  3: { type: 'video', duration: null, startTimestamp: null },
  9: { type: 'webcam', displayName: 'AV1' },
}
```

The home page also has a word wired to channel 08 (the `js-channel-trigger`
button in `src/pages/index.astro`). Point it at a channel that exists.

## Length and size

There is no required length. For reference, a working set of eight measured:

| channel | duration | size   | bitrate  |
| ------- | -------- | ------ | -------- |
| 07      | 35s      | 0.40MB | 12 KB/s  |
| 05      | 1m 19s   | 0.80MB | 10 KB/s  |
| 04      | 1m 37s   | 1.10MB | 12 KB/s  |
| 01      | 5m 24s   | 3.17MB | 10 KB/s  |
| 06      | 13m 27s  | 8.85MB | 11 KB/s  |

Duration is whatever the clip was. The constant is bitrate: every one sits at
roughly 85 kbps, which is very low, and it works because the footage is buried
under scanlines, static and a curved screen mask that destroy fine detail anyway.

**Aim for 30 to 90 seconds and under 1.5 MB.** The channel simulates a live
broadcast (`currentTime` is `(now - startTimestamp) % duration`), so a short loop
wraps often and you rejoin at a different point every visit. A long video means
first-time visitors always see second zero and nobody reaches the end.

Cap the bitrate explicitly rather than trusting CRF alone:

```bash
ffmpeg -i input.mp4 -t 60 -vf "scale=854:-2,fps=24" \
  -c:v libx264 -b:v 85k -maxrate 120k -bufsize 400k -an channel-01.mp4

ffmpeg -i input.mp4 -t 60 -vf "scale=854:-2,fps=24" \
  -c:v libvpx-vp9 -b:v 70k -an channel-01.webm
```

Drop `-an` if you want to keep the audio. Low-motion footage survives that
ceiling far better than fast cuts or handheld shake.
