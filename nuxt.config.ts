// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  piniaPersistedstate: {
    storage: 'localStorage'
  },
  css: [
    // Agrega aquí tus archivos CSS globales o estilos compartidos.
    '~/assets/css/main.css',
    'mosha-vue-toastify/dist/style.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  runtimeConfig: {

    apiSecret: "",

    public: {
      apiKey: process.env.API_KEY || "AIzaSyBq6eqncgZCHByYVdy3lFVi_0Cwnrzlv58",
      authDomain: process.env.AUTH_DOMAIN || "is-architecture.firebaseapp.com",
      urlPermisos: process.env.URL_PERMISOS || "https://tokenfirebase-dpehhs64.ue.gateway.dev",
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/interseguro-icon.png' },
      ],
    }
  },
  ssr: false,
  routeRules: {
    //"/": {prerender: true},
    /*"/seguro/**": { ssr: false },
    "/about": { ssr: false }, //client side rendering
    "/index": { ssr: false },
    "/insurance": { ssr: false },
    "/login": { ssr: false },
    "/permisos": { ssr: false },*/
    //"/profile": {ssr: false},
    //"/register": { ssr: false },
    //"/url1": {ssr: false},
    //"/url2": {ssr: false},
    //"/welcome": {ssr: false},
  }
})