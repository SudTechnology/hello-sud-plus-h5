module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/html-self-closing': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-case-declarations': 'off'
  }
}
