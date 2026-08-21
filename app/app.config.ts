export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: ['cursor-pointer'],
      },
    },
  },
})
