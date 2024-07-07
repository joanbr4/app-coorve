import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      // "no-console": "warn",
    },
  },
  ...tseslint.configs.recommended,
]
