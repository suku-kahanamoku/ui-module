import { useNuxtApp, useToast } from "#imports";
import type { IMsg } from "@suku-kahanamoku/common-module/types";

/**
 * @interface IMsg
 * @description
 * Rozhraní pro zprávu toast notifikace.
 *
 * @property {string} type - Typ zprávy (např. "success", "error", "warning").
 * @property {string} message - Text zprávy.
 * @property {Record<string, any>} [options] - Další možnosti konfigurace toastu.
 */

/**
 * @interface IToastify
 * @description
 * Obsahuje funkce pro práci s toast notifikacemi.
 *
 * @property {Function} display - Zobrazí jednu nebo více toast notifikací.
 */

/**
 * @function useToastify
 * @description
 * Poskytuje funkce pro práci s toast notifikacemi.
 *
 * @returns {IToastify} Objekt obsahující funkce pro práci s toast notifikacemi.
 */
export function useToastify() {
  const toast = useToast();
  const t = useNuxtApp().$tt;

  /**
   * @function _callToast
   * @description
   * Zavolá toast notifikaci na základě typu zprávy.
   *
   * @param {IMsg} item - Zpráva pro toast.
   */
  function _callToast(item: IMsg): void {
    if (!item) return;

    const toastOptions = {
      title: t(item.message),
      color: "",
      icon: "",
      ...item.options,
    };

    switch (item.type) {
      case "success":
        toastOptions.color = "green";
        toastOptions.icon = "i-heroicons-check-circle";
        break;
      case "error":
        toastOptions.color = "red";
        toastOptions.icon = "i-heroicons-x-circle";
        break;
      case "warning":
        toastOptions.color = "red";
        toastOptions.icon = "i-heroicons-exclamation-triangle";
        break;
      default:
        toastOptions.color = "red";
        toastOptions.icon = "i-heroicons-information-circle";
        break;
    }

    toast.add(toastOptions);
  }

  /**
   * @function display
   * @description
   * Zobrazí jednu nebo více toast notifikací.
   *
   * @param {(IMsg | IMsg[])} [msgs] - Jedna nebo více zpráv.
   */
  function display(msgs?: IMsg | IMsg[]): void {
    if (Array.isArray(msgs)) {
      msgs.forEach(_callToast);
    } else if (msgs) {
      _callToast(msgs);
    }
  }

  return { display };
}
