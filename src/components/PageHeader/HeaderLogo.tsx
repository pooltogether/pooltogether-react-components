import React from 'react'
import classNames from 'classnames'

import MobileLogoDark from '../../assets/PoolTogetherLogos/pooltogether-p-purple.svg'
import MobileLogo from '../../assets/PoolTogetherLogos/pooltogether-p.svg'
import DesktopLogoDark from '../../assets/PoolTogetherLogos/pooltogether-full-logo-purple.svg'
import DesktopLogo from '../../assets/PoolTogetherLogos/pooltogether-full-logo.svg'

export const HeaderLogo: React.FC<{
  centered?: boolean
  desktopSizeClassNames?: string
  mobileSizeClassNames?: string
}> = (props) => {
  const { desktopSizeClassNames, mobileSizeClassNames, centered } = props

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
        className={classNames(
          'hidden dark:block sm:dark:hidden',
          mobileSizeClassNames,
          extendedClassNames
        )}
        src={MobileLogo}
      />
      <ImageContainer
        className={classNames(
          'block sm:hidden dark:hidden',
          mobileSizeClassNames,
          extendedClassNames
        )}
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
  desktopSizeClassNames: 'w-28',
  mobileSizeClassNames: 'w-4'
}
