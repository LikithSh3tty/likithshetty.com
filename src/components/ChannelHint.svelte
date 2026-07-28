<script>
  import { currentChannel } from '../modules/tv.js'

  const STORAGE_KEY = 'channel-hint-seen'
  const APPEAR_AFTER = 2600
  const HIDE_AFTER = 25000

  let visible = $state(false)
  let done = $state(false)

  // ?hint forces it back regardless of what this origin has stored.
  // localStorage is per-origin, so localhost:4321, localhost:4322 and
  // [::1]:4321 each remember separately and are easy to get lost between.
  function forced() {
    try {
      return new URLSearchParams(location.search).has('hint')
    } catch {
      return false
    }
  }

  function seen() {
    if (forced()) return false
    try {
      return localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      return false
    }
  }

  // Only remember it as seen once the visitor has actually acted on it.
  // A silent timeout must not burn the single showing: the tab may have
  // been in the background the whole time.
  function acknowledge() {
    if (done) return
    done = true
    visible = false
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode; it simply shows again next visit */
    }
  }

  function hideQuietly() {
    visible = false
  }

  $effect(() => {
    if (seen()) return

    let appear
    let hide

    const start = () => {
      appear = setTimeout(() => {
        if (!done) visible = true
        hide = setTimeout(hideQuietly, HIDE_AFTER)
      }, APPEAR_AFTER)
    }

    // Don't start counting down against a tab nobody is looking at.
    if (document.visibilityState === 'visible') {
      start()
    } else {
      document.addEventListener('visibilitychange', function once() {
        if (document.visibilityState !== 'visible') return
        document.removeEventListener('visibilitychange', once)
        start()
      })
    }

    return () => {
      clearTimeout(appear)
      clearTimeout(hide)
    }
  })

  // Changing channel is the goal, so that counts as acting on it.
  $effect(() => {
    if ($currentChannel !== 0) acknowledge()
  })
</script>

{#if visible}
  <div class="nudge" aria-hidden="true">
    <span class="arrow">&#9650;</span>
    <span class="label">CHANGE CHANNEL</span>
  </div>
{/if}

<style>
  .nudge {
    position: absolute;
    top: calc(100% + 0.35em);
    right: 0;

    display: flex;
    align-items: center;
    gap: 0.6ch;

    color: var(--text-secondary);
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    white-space: nowrap;
    pointer-events: none;
    user-select: none;

    animation:
      nudge-in 0.4s ease both,
      nudge-bob 1.9s ease-in-out 0.4s infinite;
  }

  .arrow {
    font-size: 0.7em;
    line-height: 1;
  }

  .label {
    opacity: 0.85;
  }

  @keyframes nudge-in {
    from {
      opacity: 0;
      transform: translateY(-0.4em);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes nudge-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.3em);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .nudge {
      animation: nudge-in 0.4s ease both;
    }
  }
</style>
