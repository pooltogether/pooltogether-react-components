import { HotKeys } from 'react-hotkeys'

import { HOTKEYS_KEY_MAP } from 'lib/constants'
import { ThemeContextProvider } from 'lib/components/ThemeContextProvider'

import '../stories/assets/globals.css'

export const decorators = [
  (Story) => (
    <HotKeys
      keyMap={HOTKEYS_KEY_MAP}
      className='outline-none focus:outline-none active:outline-none'
    >
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    </HotKeys>
  )
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
