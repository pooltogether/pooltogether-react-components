import React, { Suspense } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { HotKeys } from 'react-hotkeys'
import { QueryClient, QueryClientProvider } from 'react-query'

import { HOTKEYS_KEY_MAP } from '../src/constants'
import { ThemeSettingsItem } from '../src/components/PageHeader/Settings/ThemeSettingsItem'

import 'react-spring-bottom-sheet/dist/style.css'

import '../stories/i18n'
import '../public/globals.css'

const queryClient = new QueryClient()

// loading component for suspence fallback
const Loader = () => (
  <div className='App'>
    <div>loading...</div>
  </div>
)

export const decorators = [
  (Story) => (
    <HotKeys
      keyMap={HOTKEYS_KEY_MAP}
      className='outline-none focus:outline-none active:outline-none'
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <Suspense fallback={<Loader />}>
            <div className='flex justify-end'>
              <ThemeSettingsItem />
            </div>
            <div className='bg-body text-inverse'>
              <Story />
            </div>
          </Suspense>
        </ThemeProvider>
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
