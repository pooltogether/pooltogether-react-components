import React from 'react'
import { LoadingLogo } from './LoadingLogo'

export const LoadingScreen = (props: { isInitialized: boolean; children: React.ReactNode }) => {
  const { isInitialized, children } = props

  if (!isInitialized) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center'>
        <LoadingLogo className='mx-auto' />
      </div>
    )
  }

  return children
}
