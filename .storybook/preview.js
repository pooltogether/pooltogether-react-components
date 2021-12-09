import React from 'react'
import { HotKeys } from 'react-hotkeys'
import { QueryClient, QueryClientProvider } from 'react-query'

import { HOTKEYS_KEY_MAP } from 'src/constants'
import { ThemeContextProvider } from 'src/components/ThemeContextProvider'

import '../stories/assets/globals.css'

const queryClient = new QueryClient()

export const decorators = [
  (Story) => (
    <HotKeys
      keyMap={HOTKEYS_KEY_MAP}
      className='outline-none focus:outline-none active:outline-none'
    >
      <QueryClientProvider client={queryClient}>
        <ThemeContextProvider>
          <Story />
        </ThemeContextProvider>
      </QueryClientProvider>
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
