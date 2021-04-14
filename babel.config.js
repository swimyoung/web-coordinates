module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: process.env.NODE_ENV === 'production',
        corejs: 3,
        useBuiltIns: 'usage',
        targets: {
          // defaults: > 0.5%, last 2 versions, Firefox ESR, not dead
          browsers: ['defaults', 'not IE 10'],
        },
      },
    ],
  ],
};
