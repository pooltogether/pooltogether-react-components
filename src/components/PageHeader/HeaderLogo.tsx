import React from 'react'
import classNames from 'classnames'

import MobileLogoDark from '../../assets/PoolTogetherLogos/pooltogether-p-purple.svg'
import MobileLogo from '../../assets/PoolTogetherLogos/pooltogether-p.svg'
import DesktopLogoDark from '../../assets/PoolTogetherLogos/pooltogether-full-logo-purple.svg'
import DesktopLogo from '../../assets/PoolTogetherLogos/pooltogether-full-logo.svg'

export const HeaderLogo: React.FC = () => {
  return (
    <>
      <ImageContainer className='hidden sm:dark:block w-40 h-14' src={DesktopLogo} />
      <ImageContainer className='hidden dark:hidden sm:block w-40 h-14' src={DesktopLogoDark} />
      <ImageContainer className='hidden dark:block sm:dark:hidden w-7 h-12' src={MobileLogo} />
      <ImageContainer className='block sm:hidden dark:hidden  w-7 h-12' src={MobileLogoDark} />
    </>
  )
}

const ImageContainer = (props) => {
  const { className, ...imageProps } = props
  return (
    <div className={classNames(className)}>
      <img {...imageProps} alt='PoolTogether Logo' />
    </div>
  )
}
