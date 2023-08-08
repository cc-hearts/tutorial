import { defineConfig } from 'vitepress'

import { getItems } from './utils/getItems'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'cc tutorial',
  description: 'a tutorial',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'tutorial',
        items: [{ text: 'javaScript', link: '/javaScript/README.md' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cc-hearts/tutorial' },
    ],
  },
})
