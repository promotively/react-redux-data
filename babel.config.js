module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    'add-module-exports',
    [
      'module-resolver',
      {
        root: ['./src/**']
      }
    ]
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 10
        }
      }
    ],
    '@babel/preset-react'
  ]
};
