module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: { jest: true },
    },
    {
      files: ['**/src/**/*.js'],
      env: { browser: true, node: false },
    },
  ],
};
