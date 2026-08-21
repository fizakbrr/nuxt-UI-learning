// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/eslint', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css'],

  fonts: {
    provider: 'google',
  },

  // icon names used inside content/*.json can't be found by static source scanning,
  // so bundle the whole collection instead of only the icons Nuxt Icon can see in .vue files
  icon: {
    serverBundle: { collections: ['lucide'] },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    serverAssets: [{ baseName: 'content', dir: '../content' }],
  },

  compatibilityDate: '2025-05-15',

  devtools: {
    enabled: true,
  },
})
