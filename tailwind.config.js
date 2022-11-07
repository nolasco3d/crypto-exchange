// import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  theme: {
    extend: {
      colors: {
      }
    }
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
}