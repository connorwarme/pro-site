import { defineConfig } from 'astro/config';

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), mdx()],
  site: 'https://amitywarme.com',
  base: '/'
});