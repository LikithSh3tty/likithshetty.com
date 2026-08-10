// @ts-check
import { defineConfig } from 'astro/config'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import sitemap from '@astrojs/sitemap'

import svelte from '@astrojs/svelte'

const SITE = 'https://likithshetty.com'
const pagesDir = fileURLToPath(new URL('./src/pages/', import.meta.url))

/** The source file a built URL came from, or null if we cannot work it out. */
function sourceFor(url) {
  const route = new URL(url).pathname.replace(/^\/|\/$/g, '')
  const base = route === '' ? 'index' : route
  const candidates = [
    `${base}.astro`,
    `${base}.md`,
    `${base}/index.astro`,
    `${base}/index.md`,
  ]
  return candidates.map((c) => pagesDir + c).find(existsSync) ?? null
}

/**
 * Date of the last commit that touched a file, ISO 8601, or null.
 *
 * Emitting a real lastmod is worth the git call: google uses it to schedule
 * crawls, and a build-time `new Date()` on every URL is the pattern it learns
 * to ignore. Returns null rather than guessing when git cannot answer — CI
 * clones are shallow, so history for an older file may simply not be there.
 */
function lastCommitDate(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || null
  } catch {
    return null
  }
}

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // the floating dev-only toolbar; never shipped in a build, hidden here too
  devToolbar: { enabled: false },

  integrations: [
    sitemap({
      serialize(item) {
        const source = sourceFor(item.url)
        const lastmod = source ? lastCommitDate(source) : null
        if (lastmod) item.lastmod = lastmod
        return item
      },
    }),
    svelte(),
  ],
})
