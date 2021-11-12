const postcss = require('rollup-plugin-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const tailwindcss = require('tailwindcss')
const url = require('@rollup/plugin-url')
const postcssImport = require('postcss-import')
// const images = require('@rollup/plugin-image')

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url({
        limit: 143360
      }),
      postcss({
        plugins: [
          postcssImport(),
          tailwindcss('./tailwind.config.js'),
          autoprefixer(),
          cssnano({
            preset: 'default'
          })
        ],
        inject: true,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta
      }),
      ...config.plugins
    ]
    return config
  }
}
