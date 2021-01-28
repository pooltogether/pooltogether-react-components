import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import filesize from "rollup-plugin-filesize"
import postcss from "rollup-plugin-postcss"
import replace from "@rollup/plugin-replace"
import resolve from "@rollup/plugin-node-resolve"
import alias from '@rollup/plugin-alias'
// import uglify from 'rollup-plugin-uglify'
// import { minify } from 'uglify-es'

import pkg from "./package.json"

export default {
  input: "lib/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    }
  ],
  external: [
    "@reach/menu-button",
    "@reach/popover",
    "autoprefixer",
    "classnames",
    "feather-icons-react",
    "lodash",
    "postcss",
    "react",
    "react-dom",
    "tailwindcss"
  ],
  plugins: [
    postcss({
      extract: true
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**"
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    alias({
      entries: [
        { find: 'lib', replacement: '../../lib' },
      ]
    }),
    replace({
      exclude: "node_modules/**",
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      )
    }),
    process.env.NODE_ENV === "production" && filesize()
    // process.env.NODE_ENV === 'production' && uglify({}, minify)
  ]
}
