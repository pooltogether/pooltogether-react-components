import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { GlobalHotKeys } from 'react-hotkeys'

import { HOTKEYS_KEY_MAP } from '../constants'

const THEME_KEY = 'theme'

export enum ColorTheme {
  light = 'light',
  dark = 'dark'
}

export const ThemeContext = React.createContext<{
  theme: ColorTheme
  toggleTheme: () => void
}>({
  theme: Cookies.get(THEME_KEY) || ColorTheme.dark,
  toggleTheme: () => {}
})

export function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(ColorTheme.dark)

  useEffect(() => {
    let stored = Cookies.get(THEME_KEY)

    const documentElement = document.documentElement
    documentElement.classList.add(ColorTheme.dark)

    if (typeof window !== 'undefined' && window.matchMedia) {
      const setThemeAutomatically = (newValue) => {
        if (newValue === ColorTheme.dark) {
          documentElement.classList.add(ColorTheme.dark)
          documentElement.classList.remove(ColorTheme.light)

          setTheme(ColorTheme.dark)
        } else if (newValue === ColorTheme.light) {
          documentElement.classList.add(ColorTheme.light)
          documentElement.classList.remove(ColorTheme.dark)

          setTheme(ColorTheme.light)
        }
      }

      // onLoad
      setThemeAutomatically(stored)
    }
  }, [])

  const toggleTheme = () => {
    const documentElement = document.documentElement

    if (documentElement.classList.contains(ColorTheme.dark)) {
      documentElement.classList.remove(ColorTheme.dark)
      documentElement.classList.add(ColorTheme.light)

      Cookies.set(THEME_KEY, ColorTheme.light)

      setTheme(ColorTheme.light)
    } else {
      documentElement.classList.remove(ColorTheme.light)
      documentElement.classList.add(ColorTheme.dark)

      Cookies.set(THEME_KEY, ColorTheme.light)

      setTheme(ColorTheme.dark)
    }
  }

  const handlers = {
    TOGGLE_THEME: toggleTheme
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      <GlobalHotKeys keyMap={HOTKEYS_KEY_MAP} handlers={handlers} />

      {props.children}
    </ThemeContext.Provider>
  )
}
