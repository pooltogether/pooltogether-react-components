import React from 'react'
import classNames from 'classnames'
import { useScreenSize, ScreenSize } from '@pooltogether/hooks'

import { HeaderLogo } from './HeaderLogo'

interface LinkProps {
  as: string
  href: string
}

interface PageHeaderContainerProps extends LinkProps {
  Link: React.FC<LinkProps>
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * TODO: Migrate remaining components
 * @returns
 */
export const PageHeaderContainer = (props: PageHeaderContainerProps) => {
  const { className, Link, as, href, style } = props

  const screenSize = useScreenSize()

  let anchorStyle = { height: '60px', width: '151px' }
  if (screenSize <= ScreenSize.sm) {
    anchorStyle = { height: '36px', width: '21px' }
  }

  return (
    <div
      className={classNames(
        'flex justify-between items-center mx-auto max-w-screen-lg px-4 sm:px-8 py-4 sm:pb-6 sm:pt-5',
        className
      )}
      style={style}
    >
      <Link as={as} href={href}>
        <a style={anchorStyle}>
          <HeaderLogo />
        </a>
      </Link>
      {props.children}
    </div>
  )
}
