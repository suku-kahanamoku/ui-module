import type { ButtonProps } from "#ui/types";

/**
 * @interface IBtn
 * @description
 * Rozhraní pro tlačítko (Button).
 */
export interface IBtn extends ButtonProps {
  /**
   * @property {string} [label]
   * Popisek tlačítka.
   */
  label?: string;

  /**
   * @property {string} [link]
   * Odkaz, na který tlačítko směřuje.
   */
  link?: string;

  /**
   * @property {string} [icon]
   * Ikona tlačítka.
   */
  icon?: string;
}
