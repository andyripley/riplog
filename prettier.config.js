// @ts-check

/** @type {import("prettier").Config} */
export default {
  semi: true,
  singleQuote: false,
  plugins: ["prettier-plugin-astro"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
