module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          useBuiltIns: 'entry',
          corejs: '3.0.0',
          targets: {
            esmodules: true,
            ie: '11',
          },
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }],
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
  overrides: [
    {
      include: [
        './node_modules',
        '../../node_modules', // only needed for fullcalendar"s weird monorepo setup. delete in your own project
      ],
      plugins: [
        [
          'babel-plugin-transform-require-ignore',
          {
            extensions: ['.css'],
          },
        ],
      ],
    },
  ],
};
