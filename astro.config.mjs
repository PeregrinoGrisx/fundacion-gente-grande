import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fundaciongentegrandearica.org',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
