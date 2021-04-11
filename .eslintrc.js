module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'vue/no-mutating-props': 'off',
    'max-len': ["error", {
      "code": 120,
      "ignoreComments": true,
      "ignoreUrls": true
    }],
    'arrow-body-style': 'off',
    'linebreak-style': ["error", "windows"],
  },
};
