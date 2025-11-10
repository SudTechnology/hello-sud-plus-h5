module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    semi: ['error', 'never'],
    camelcase: 0,
    'no-useless-constructor': 0,
    'no-prototype-builtins': 0,
    // 'no-var': 0, // 禁用var，用let和const代替
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    quotes: 0,
    'array-callback-return': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off'
  }
}
