import type { useColorMode } from "#imports";

declare module "#app" {
  interface NuxtApp {
    $colorMode: ReturnType<typeof useColorMode>;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $colorMode: ReturnType<typeof useColorMode>;
  }
}

declare module "vue" {
  export interface ComponentCustomProperties {
    $colorMode: ReturnType<typeof useColorMode>;
  }
}

export * from "./types/cmp.interface";
