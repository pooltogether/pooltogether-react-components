import { useScreenSize, ScreenSize } from '@pooltogether/hooks'
import React from 'react'

// import MobileLogo from './pooltogether-purple-mark.svg'
import MobileLogoDark from './pooltogether-white-mark.svg'
// import Desktop from 'pooltogether-logo'
import DesktopLogoDark from './pooltogether-logo.svg'

// TODO: rewrite the theme context prrovider into a hook and import
export const HeaderLogo = () => {
  const screenSize = useScreenSize()

  if (screenSize <= ScreenSize.sm) {
    return <img src={MobileLogoDark} className='w-8' />
  }

  return <img src={DesktopLogoDark} className='w-40' />
}
