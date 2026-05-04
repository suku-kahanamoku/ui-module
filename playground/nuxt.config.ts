export default defineNuxtConfig({
  compatibilityDate: "2026-05-04",
  modules: ["../src/module"],
  uiModule: {},
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
});
