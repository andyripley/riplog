import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: [".data/", ".nuxt/", ".output/", ".wrangler/", "dist/"],
  // rules: {
  //   "vue/html-self-closing": [
  //     "error",
  //     {
  //       html: { void: "always", normal: "always", component: "always" },
  //       svg: "always",
  //       math: "always",
  //     },
  //   ],
  //   "vue/multi-word-component-names": "off",
  //   "vue/require-default-prop": "off",
  // },
});
