import React from 'react'
import classNames from 'classnames'
import { HeaderLogo } from './HeaderLogo'

/**
 *
 * @returns
 */
export const PageHeaderContainer: React.FC<{
  logo?: React.ReactNode
  className?: string
  marginClassName?: string
  maxWidthClassName?: string
  positionClassName?: string
  styleClassName?: string
}> = (props) => {
  const {
    children,
    logo,
    className,
    marginClassName,
    positionClassName,
    styleClassName,
    maxWidthClassName
  } = props

  return (
    <div
      className={classNames(
        'w-full',
        className,
        marginClassName,
        positionClassName,
        styleClassName
      )}
      style={{ zIndex: 3 }}
    >
      <div
        className={classNames(
          'flex justify-between items-center mx-auto px-4 sm:px-8 py-2',
          maxWidthClassName
        )}
        style={{ zIndex: 3 }}
      >
        {logo}
        {children}
      </div>
    </div>
  )
}
PageHeaderContainer.defaultProps = {
  maxWidthClassName: 'max-w-screen-lg',
  positionClassName: 'sticky top-0',
  marginClassName: 'mb-4',
  styleClassName: 'backdrop-filter backdrop-blur-xl',
  logo: HeaderLogo
}
