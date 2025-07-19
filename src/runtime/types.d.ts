import { type DefineComponent } from "vue";

declare module "vue" {
  export interface GlobalComponents {}
}

export * from "./types/cmp.interface";
