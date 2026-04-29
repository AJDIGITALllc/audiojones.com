import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated dist files from workspace packages:
    "packages/**/dist/**",
    // Utility scripts and root-level CommonJS files:
    "scripts/**",
    "*.js",
    "tools/**",
    // Generated Firebase DataConnect files (CommonJS output):
    "src/dataconnect-generated/**",
  ]),
  // Downgrade pervasive pre-existing violations to warnings.
  // These were never enforced before ESLint was enabled in CI.
  // Fix progressively in follow-up PRs.
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/purity": "warn",
    },
  },
]);

export default eslintConfig;
