import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp._appConfig.ui = nuxtApp._appConfig.ui || {};
  nuxtApp._appConfig.ui.primary = "custom";
});