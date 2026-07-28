// @ts-check
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: 'https://likithshetty.com',

  // the floating dev-only toolbar; never shipped in a build, hidden here too
  devToolbar: { enabled: false },

  integrations: [sitemap(), svelte()],
})
