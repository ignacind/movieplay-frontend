module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ["nativewind/babel"]
  ],
};