// @ts-check
import { defineConfig, envField } from 'astro/config'

import sitemap from '@astrojs/sitemap'

import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  site: 'https://likithshetty.dev',

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
