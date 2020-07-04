module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        corejs: 3,
        useBuiltIns: 'entry',
        targets: {
          // defaults: > 0.5%, last 2 versions, Firefox ESR, not dead
          browsers: ['defaults', 'not IE 10'],
        },
      },
    ],
  ],
  plugins: ['lodash'],
};
