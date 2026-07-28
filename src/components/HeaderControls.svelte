<script>
  import {
    currentChannelInfo,
    decrementChannel,
    incrementChannel,
  } from '../modules/tv.js'
  import ChannelHint from './ChannelHint.svelte'
</script>

<div class="channel-controller">
  <button
    class="previous"
    aria-label="previous channel"
    onclick={decrementChannel}
  >
    ◄
  </button>
  <div class="channel">
    CHANNEL <span>{$currentChannelInfo.displayName}</span>
  </div>
  <button class="next" aria-label="next channel" onclick={incrementChannel}>
    ►
  </button>
  <ChannelHint />
</div>

<style>
  .channel-controller {
    position: relative; /* anchors the ChannelHint nudge beneath it */
    display: flex;
    width: 15ch;
    align-items: center;
    justify-content: space-between;

    /* read as an operable control, not a readout: a boxed group that
       lifts when you approach it */
    gap: 0.35ch;
    padding: 0.15em 0.5ch;
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.04);
    transition:
      border-color 0.18s ease,
      background-color 0.18s ease;

    &:hover,
    &:focus-within {
      border-color: rgba(255, 255, 255, 0.55);
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .channel {
    white-space: nowrap;
  }

  button {
    position: relative;
    appearance: none;
    background: none;
    border: none;
    padding: 0;
    /* full brightness at rest so they never read as punctuation */
    color: var(--text-secondary);
    text-shadow: inherit;
    font-family: inherit;
    font-size: 0.9rem;
    cursor: var(--cursor-pointer);
    transition:
      color 0.15s ease,
      transform 0.15s ease;

    &:hover,
    &:focus-visible {
      color: var(--text-secondary);
      transform: scale(1.35);
    }

    &:active {
      transform: scale(1.1);
    }

    &::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: color 0.15s ease;
    }
    button:hover,
    button:focus-visible,
    button:active {
      transform: none;
    }
  }
</style>
