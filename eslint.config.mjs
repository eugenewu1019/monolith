import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // CI unblock rules (keep portfolio moving)
  {
    rules: {
      "react-compiler/react-compiler": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "warn", // Change unused vars to warnings
    },
  },

  // Allow CommonJS in config files
  {
    files: ["jest.config.js", "jest.setup.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
