import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mukae1997.github.io',
  base: '/',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
