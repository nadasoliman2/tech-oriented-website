import * as ar from "./data.ar";
import * as en from "./data";
import type { Lang } from "./i18n";

export function getData(lang: Lang) {
  return lang === "ar" ? ar : en;
}
