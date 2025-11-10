module.exports = {
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      plugins: ['dynamic-import-node']
    }
  },
  plugins: [
    '@babel/plugin-transform-modules-umd'
  ],
  presets: [
    [
      "@babel/preset-env", // 将ES6语法转成ES5
      {
        // 低版本浏览器中只补充项目中使用到的ES6语法
        useBuiltIns: "usage",
        corejs: "3" // 声明corejs版本
      }
    ]
  ]
}
