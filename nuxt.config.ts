// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    viewer: false
  },
  css: ['~/assets/css/global.css'],
  app: {    
    pageTransition: { 
      name: 'page',
      mode: 'out-in' 
    }  
  },
})
