module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 0,
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/src/**/*.js'],
      env: {
        browser: true,
        node: false,
      },
    },
  ],
};
