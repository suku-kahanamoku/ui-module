export default defineNuxtConfig({
  modules: ["../src/module"],
  uiModule: {},
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
