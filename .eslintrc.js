module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-console': 'off',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'prefer-destructuring': ['error', { object: true, array: true }],
    'import/prefer-default-export': 'off',
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
