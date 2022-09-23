import React from 'react'
import classNames from 'classnames'

import { HeaderLogo } from './HeaderLogo'

/**
 *
 * @returns
 */
export const PageHeaderContainer: React.FC<{
  href: string
  className?: string
  maxWidthClassName?: string
}> = (props) => {
  const { className, maxWidthClassName, href } = props

  return (
    <div className={className} style={{ zIndex: 3 }}>
      <div
        className={classNames(
          'flex justify-between items-center mx-auto px-4 sm:px-8 py-2',
          maxWidthClassName,
          className
        )}
        style={{ zIndex: 3 }}
      >
        {!!href ? (
          <a href={href}>
            <HeaderLogo />
          </a>
        ) : (
          <HeaderLogo />
        )}
        {props.children}
      </div>
    </div>
  )
}

PageHeaderContainer.defaultProps = {
  maxWidthClassName: 'max-w-screen-lg'
}
