const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['lib'] = path.resolve(__dirname, '../lib')
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: 'postcss-loader',
    //       options: {
    //         ident: 'postcss',
    //         plugins: [
    //           require('postcss-easy-import'),
    //           require('tailwindcss'),
    //           require('autoprefixer')
    //         ]
    //       }
    //     }
    //   ],
    //   include: path.resolve(__dirname, '../')
    // })
    // config.module.rules.push({
    //   test: /\,css&/,
    //   use: [
    //     {
    //       loader: 'postcss-loader',
    //       options: {
    //         ident: 'postcss',
    //         plugins: [
    //           require('postcss-easy-import'),
    //           require('tailwindcss'),
    //           require('autoprefixer')
    //         ]
    //       }
    //     }
    //   ],
    //   include: path.resolve(__dirname, '../')
    // })
    return config
  }
}
