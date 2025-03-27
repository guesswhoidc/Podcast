const { defineConfig } = require("eslint/config");
const globals = require("globals");
const js = require("@eslint/js");
const pluginJest = require('eslint-plugin-jest');


const jestConfig = {
  files: ['**/*.spec.js', '**/*.test.js'],
  plugins: { jest: pluginJest },
  languageOptions: {
    globals: pluginJest.environments.globals.globals,
  },
  rules: {
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
  },
};

module.exports = defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  jestConfig,
]);
