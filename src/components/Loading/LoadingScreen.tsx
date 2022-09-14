import React from 'react'
import { LoadingLogo } from './LoadingLogo'

export const LoadingScreen = () => (
  <div className='flex flex-col inset-0 absolute'>
    <LoadingLogo className='m-auto' />
  </div>
)
