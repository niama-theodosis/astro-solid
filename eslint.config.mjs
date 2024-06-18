import astro from "eslint-plugin-astro"
// import solid from "eslint-plugin-solid"
import unicorn from "eslint-plugin-unicorn"

export default [
  unicorn.configs["flat/recommended"],
  // solid.configs["flat/typescript"],
  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-strict"],
  {
    rules: {
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
]
