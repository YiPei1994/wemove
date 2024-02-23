export const DEFAULT_USERID = "225d0a46-8f15-4dd2-9356-28885c0b55f4";
export const NOW = new Date();

let LOCALE = "en-GB";

if (typeof navigator !== "undefined") {
  LOCALE = navigator.languages[0] || "en-GB";
}

export { LOCALE };
