// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: {
        lang: 'ko-KR'
      }
    }
  },
  nitro: {
    preset: 'github-pages',
    prerender: {
      routes: ['/']
    }
  }
})
