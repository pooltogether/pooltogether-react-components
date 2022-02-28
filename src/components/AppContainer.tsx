import { useScreenSize, ScreenSize } from '@pooltogether/hooks'
import React, { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { ThemeContextProvider } from './ThemeContextProvider'

export const AppContainer = (props: { children: ReactNode }) => {
  const screenSize = useScreenSize()

  return (
    <>
      <ToastContainer
        className='pool-toast'
        position={screenSize === ScreenSize.xs ? 'top-center' : 'top-right'}
        autoClose={5000}
      />
      <ThemeContextProvider>{props.children}</ThemeContextProvider>
    </>
  )
}
