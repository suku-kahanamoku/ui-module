import {
  defineNuxtModule,
  addPlugin,
  addComponentsDir,
  addImportsDir,
  installModule,
  createResolver,
  hasNuxtModule,
} from "@nuxt/kit";
import { defu } from "defu";

/**
 * @typedef {Object} ModuleOptions
 * @description
 * Rozšiřuje možnosti konfigurace modulu `ui-module`.
 */
export interface ModuleOptions {}

/**
 * @module ui-module
 * @description
 * Tento modul poskytuje integraci UI komponent, Tailwind konfigurace a dalších závislostí
 * pro Nuxt aplikaci. Obsahuje také podporu jazykových modulů a dalších knihoven.
 *
 * @default
 * Výchozí konfigurace:
 * - `langModule`: Přidává lokalizační soubory pro angličtinu a češtinu.
 * - `tailwindcss`: Nastavuje obsah pro Tailwind CSS na runtime komponenty.
 *
 * @example
 * ```typescript
 * export default defineNuxtConfig({
 *   uiModule: {},
 * });
 * ```
 */
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "ui-module",
    configKey: "uiModule",
  },
  defaults: {},

  /**
   * @function setup
   * @description
   * Hlavní funkce modulu, která nastavuje konfiguraci a přidává potřebné součásti.
   *
   * @param {ModuleOptions} _options - Uživatelské možnosti konfigurace.
   * @param {Nuxt} _nuxt - Instance Nuxt aplikace.
   */
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const nuxtOpt = _nuxt.options as any;

    // Config pro lang-module
    nuxtOpt.langModule = defu(nuxtOpt.langModule || {}, {
      locales: [
        /* {
          code: "en",
          files: [{ path: resolve("./runtime/assets/locales/en.json") }],
        }, */
        {
          code: "cs",
          files: [{ path: resolve("./runtime/assets/locales/cs.json") }],
        },
      ],
    });

    // Vynucení Tailwind konfigurace pro runtime komponenty
    nuxtOpt.tailwindcss = defu(nuxtOpt.tailwindcss || {}, {
      config: {
        content: [
          resolve("./runtime/components/**/*.{vue,mjs,js,ts}"),
          resolve("./runtime/layouts/**/*.{vue,mjs,js,ts}"),
          resolve("./runtime/pages/**/*.{vue,mjs,js,ts}"),
          resolve("./runtime/*.{mjs,js,ts}"),
        ],
      },
    });

    // Přidání UI pluginu
    addPlugin({
      src: resolve("./runtime/plugins/ui-plugin"),
    });

    // Přidání komponent
    addComponentsDir({
      path: resolve("./runtime/components"),
      prefix: "Cmp",
      pathPrefix: false,
    });

    // Přidání composables
    addImportsDir(resolve("./runtime/composables"));

    // Install common module
    if (!hasNuxtModule("@suku-kahanamoku/common-module")) {
      await installModule("@suku-kahanamoku/common-module");
    }

    // Install lang module
    if (!hasNuxtModule("@suku-kahanamoku/lang-module")) {
      await installModule("@suku-kahanamoku/lang-module");
    }

    // Instalace nuxt-ui modulu
    if (!hasNuxtModule("@nuxt/ui")) {
      await installModule("@nuxt/ui");
    }
  },
});
