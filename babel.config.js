module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'entry',
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
  ],
};
