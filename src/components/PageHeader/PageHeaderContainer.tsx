import React from 'react'
import classNames from 'classnames'

import { HeaderLogo } from './HeaderLogo'

interface LinkProps {
  as: string
  href: string
}

interface PageHeaderContainerProps extends LinkProps {
  Link: React.FC<LinkProps>
  className?: string
  children: React.ReactNode
}

/**
 * TODO: Migrate remaining components
 * @returns
 */
export const PageHeaderContainer = (props: PageHeaderContainerProps) => {
  const { className, Link, as, href } = props

  return (
    <div
      className={classNames(
        'flex justify-between items-center mx-auto max-w-screen-lg px-4 sm:px-8 py-4 sm:pb-6 sm:pt-5 sticky top-0 bg-page-header',
        className
      )}
      style={{ zIndex: 3 }}
    >
      <Link as={as} href={href}>
        <a>
          <HeaderLogo />
        </a>
      </Link>
      {props.children}
    </div>
  )
}

PageHeaderContainer.defaultProps = {
  as: '/',
  href: '/'
}
