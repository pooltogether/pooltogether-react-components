import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'
import css from 'rollup-plugin-css-porter'
import json from '@rollup/plugin-json'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'

export default {
  input: 'lib/index.js',
  preserveSymlinks: true,
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true
    }
  ],
  // external: [
  //   "next",
  //   "@pooltogether/hooks",
  //   "autoprefixer",
  //   "classnames",
  //   "feather-icons-react",
  //   "lodash",
  //   "postcss",
  //   "react",
  //   "react-dom",
  //   "tailwindcss",
  //   "react-device-detect",
  //   "react-hotkeys",
  //   "react-tooltip",
  // ],
  external: [
    '@pooltogether/utilities',
    '@pooltogether/hooks',
    'feather-icons-react',
    'jotai',
    'lodash',
    'react',
    'react-dom',
    'react-query',
    'tailwindcss',
    'eth-revert-reason'
  ],
  plugins: [
    json(),
    url({
      limit: 143360
    }),
    svgr(),
    postcss({
      extract: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    alias({
      entries: [{ find: 'lib', replacement: '../../lib' }]
    }),
    replace({
      'exclude': 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'preventAssignment': true
    }),
    css({ minified: false }),
    process.env.NODE_ENV === 'production' && filesize()
  ]
}
