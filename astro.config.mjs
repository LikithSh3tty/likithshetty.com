// @ts-check
import { defineConfig, envField } from 'astro/config'

import sitemap from '@astrojs/sitemap'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: 'https://likithshetty.dev',

  // the floating dev-only toolbar; never shipped in a build, hidden here too
  devToolbar: { enabled: false },

  integrations: [sitemap(), svelte()],

  env: {
    schema: {
      NODE_ENV: envField.string({
        default: 'development',
        access: 'public',
        context: 'server',
      }),
    },
  },
})
