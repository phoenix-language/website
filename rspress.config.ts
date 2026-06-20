import * as path from 'node:path';
import { defineConfig } from '@rspress/core';

// GitHub Pages serves at /website/; Vercel serves at the domain root.
const base = process.env.VERCEL ? '/' : '/website/';

export default defineConfig({
  base,
  llms: true,
  root: path.join(__dirname, 'docs'),
  lang: 'en',
  title: 'Phoenix',
  description:
    'Experimental alpha — a statically typed programming language that compiles to portable PHX0 bytecode and runs on a stack VM without a garbage collector.',
  icon: '/phoenix-logo.png',
  logo: {
    light: '/phoenix-logo.png',
    dark: '/phoenix-logo.png',
  },
  globalStyles: path.join(__dirname, 'styles/phoenix.css'),
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/phoenix-language/phoenix',
      },
    ],
  },
});
