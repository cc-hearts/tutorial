// https://vitepress.dev/guide/custom-theme
import EnhancementLayout from './enhancementLayout.vue'
import Theme from 'vitepress/theme'
import './style.css'

export default {
  extends: Theme,
  Layout: EnhancementLayout,
  enhanceApp({ app, router, siteData }) {
    // ...
  },
}
