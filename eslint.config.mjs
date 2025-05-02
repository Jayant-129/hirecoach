import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { plugins: {} }, // Add this line to prevent serialization issues
});

// Use require-style extends to avoid function serialization issues
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    // Disable rules that might cause serialization issues
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];

export default eslintConfig;
