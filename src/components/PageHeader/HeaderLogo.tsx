import React from 'react'
import classNames from 'classnames'

import MobileLogoDark from '../../assets/PoolTogetherLogos/pooltogether-p-purple.svg'
import MobileLogo from '../../assets/PoolTogetherLogos/pooltogether-p.svg'
import DesktopLogoDark from '../../assets/PoolTogetherLogos/pooltogether-full-logo-purple.svg'
import DesktopLogo from '../../assets/PoolTogetherLogos/pooltogether-full-logo.svg'

export const HeaderLogo = (props) => {
  const { desktopSizeClassNames, centered } = props

  const extendedClassNames = {
    'mx-auto': centered
  }

  return (
    <>
      <ImageContainer
        className={classNames('hidden sm:dark:block', desktopSizeClassNames, extendedClassNames)}
        src={DesktopLogo}
      />
      <ImageContainer
        className={classNames(
          'hidden dark:hidden sm:block',
          desktopSizeClassNames,
          extendedClassNames
        )}
        src={DesktopLogoDark}
      />
      <ImageContainer
        className={classNames('hidden dark:block sm:dark:hidden w-7 h-12', extendedClassNames)}
        src={MobileLogo}
      />
      <ImageContainer
        className={classNames('block sm:hidden dark:hidden w-7 h-12', extendedClassNames)}
        src={MobileLogoDark}
      />
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

HeaderLogo.defaultProps = {
  centered: false,
  desktopSizeClassNames: 'w-32 h-12'
}
