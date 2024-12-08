module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: [
        'react-native-paper/babel',
        ['@babel/plugin-proposal-decorators', { legacy: true }], // Enable decorators with legacy mode
        'react-native-reanimated/plugin',
      ],
    },
    development: {
      plugins: [
        'react-native-paper/babel',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'react-native-reanimated/plugin',
      ],
    },
  },
};
