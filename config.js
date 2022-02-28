const colors = require('tailwindcss/colors')
const deepMerge = require('deepmerge')

const pooltogetherReactTailwindUIConfig = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  corePlugins: {
    container: true
  },
  theme: {
    screens: {
      xs: '531px',
      sm: '941px',
      lg: '1481px'
    },
    colors: {
      // Defaults
      'inherit': colors.inherit,
      'current': colors.current,
      'transparent': colors.transparent,
      'black': colors.black,
      'white': colors.white,
      // Common PT Colors
      'pt-purple': '#4c249f',
      'pt-purple-light': '#a472f7',
      'pt-gray-purple': '#7665ac',
      'pt-teal': '#35f0d0',
      'pt-cyan': '#17e1fd',
      'pt-yellow': '#ffed47',
      'pt-magenta': '#ff77e1',
      'pt-red': '#ff6666',
      'pt-orange': '#ff9303',
      'pt-blue': '#3857ee',
      // Full colors
      'gray': {
        50: '#F9F8F9',
        100: '#EAE9ED',
        200: '#DBD8E1',
        300: '#CBC5D7',
        400: '#bbb2ce',
        500: '#A198B3',
        600: '#867E98',
        700: '#6C657C',
        800: '#534C60',
        900: '#393443'
      },
      'yellow': {
        50: '#FEFCE8',
        100: '#FEF7B2',
        200: '#FFF27D',
        300: '#FFED47',
        400: '#EBC73A',
        500: '#D7A32F',
        600: '#BE8627',
        700: '#A46C1F',
        800: '#8B5418',
        900: '#713E12'
      },
      'cyan': {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#17e1fd',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63'
      },
      'magenta': {
        50: '#FAF7F9',
        100: '#F3E5F0',
        200: '#F1CFE9',
        300: '#F2B5E4',
        400: '#F798E2',
        500: '#ff77e1',
        600: '#D359C0',
        700: '#A73E9C',
        800: '#7B2876',
        900: '#4F164E'
      },
      'purple': {
        50: '#F2EDFE',
        100: '#DACDF7',
        200: '#BCA8E6',
        300: '#A187D6',
        400: '#8969C5',
        500: '#6847A4',
        600: '#4C2C83',
        700: '#341762',
        800: '#260F4E',
        900: '#1A083A'
      },
      'red': {
        50: '#FEF2F2',
        100: '#FCCECE',
        200: '#FAAAAA',
        300: '#F98686',
        400: '#F76363',
        500: '#EF3E3E',
        600: '#E61B1B',
        700: '#C41E1E',
        800: '#A11F1F',
        900: '#7F1D1D'
      },
      'blue': {
        50: '#EFF6FF',
        100: '#CDE3FF',
        200: '#ABCFFF',
        300: '#8ABBFF',
        400: '#68A7FF',
        500: '#497CF6',
        600: '#3857EE',
        700: '#2F4ECD',
        800: '#2645AB',
        900: '#1E3A8A'
      },
      'teal': {
        50: '#ECFEFF',
        100: '#CEFFFB',
        200: '#ADFFF3',
        300: '#76FCE7',
        400: '#3EF3D4',
        500: '#2FDFC9',
        600: '#23CBBE',
        700: '#17B8B2',
        800: '#0EA3A4',
        900: '#078889'
      }
    },
    extend: {
      backgroundImage: {
        'pt-gradient': 'linear-gradient( 77.6deg, #17e1fd 0%, #ff77e1 48.47%, #ffed47 88.67%)'
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%'
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
        '5xl': '1.75rem',
        '6xl': '2rem',
        '7xl': '2.25rem',
        '8xl': '2.5rem'
      },
      height: {
        '28': '7rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
        '112': '28rem',
        '128': '32rem',
        '75vh': '75vh'
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%'
      },
      maxWidth: {
        'xxs': '10rem',
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%'
      },
      lineHeight: {
        relaxed: 1.75
      },
      fontSize: {
        // sm: ['14px', '20px'],
        // base: ['16px', '24px'],
        // lg: ['20px', '28px'], // line height!
        // xl: ['24px', '32px'],
        'xxxxxs': '0.5rem',
        'xxxxs': '0.625rem',
        'xxxs': '0.75rem',
        'xxs': '0.875rem',
        'xs': '1rem',
        'sm': '1.125rem',
        'base': '1.25rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '1.875rem',
        '3xl': '2.25rem',
        '4xl': '2.5rem',
        '5xl': '2.75rem',
        '6xl': '3rem',
        '7xl': '3.25rem',
        '8xl': '3.5rem',
        '9xl': '3.75rem',
        '10xl': '4rem',
        '11xl': '4.25rem',
        '12xl': '4.5rem',
        '13xl': '4.75rem',
        '14xl': '5rem'
      },
      fontFamily: {
        sans: [
          'Titillium Web',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        serif: [
          'Titillium Web',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        inter: [
          'Inter',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    }
  },
  plugins: []
}

function arrayMergeFn(destinationArray, sourceArray) {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc
    return [...acc, cur]
  }, [])
}

/**
 * Merge PT-ReactTailwindUI and Tailwind CSS configurations
 * @param {object} tailwindConfig - Tailwind config object
 * @return {object} new config object
 */
function wrapper(tailwindConfig = {}) {
  return deepMerge(tailwindConfig, pooltogetherReactTailwindUIConfig, {
    arrayMerge: arrayMergeFn
  })
}

module.exports = wrapper
