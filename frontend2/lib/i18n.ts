import { cookies } from "next/headers";

export type Lang = "en" | "ar";

export const LANG_COOKIE = "lang";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "ar" ? "ar" : "en";
}
