const postcss = require('rollup-plugin-postcss')
const url = require('@rollup/plugin-url')

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url({
        limit: 143360
      }),
      postcss(),
      ...config.plugins
    ]
    return config
  }
}
// postcss({
//   plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')]
// }),
