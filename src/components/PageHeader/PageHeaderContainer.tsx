import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

import { HeaderLogo } from './HeaderLogo'
import useDebouncedCallback from 'beautiful-react-hooks/useDebouncedCallback'

interface LinkProps {
  as: string
  href: string
}

interface PageHeaderContainerProps extends LinkProps {
  Link: React.FC<LinkProps>
  children: React.ReactNode
  className?: string
  scrollBgClassName?: string
  noScrollBgClassName?: string
}

/**
 * TODO: Migrate remaining components
 * @returns
 */
export const PageHeaderContainer = (props: PageHeaderContainerProps) => {
  const { className, Link, as, href, scrollBgClassName, noScrollBgClassName } = props

  const [scrollClassName, _setScrollClassName] = useState(noScrollBgClassName)

  const handleScroll = useDebouncedCallback(
    () => _setScrollClassName(window.scrollY > 0 ? scrollBgClassName : noScrollBgClassName),
    [],
    200,
    { leading: true }
  )

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={classNames('w-full sticky top-0 transition-all', scrollClassName, className)}
      style={{ zIndex: 3 }}
    >
      <div
        className={classNames(
          'flex justify-between items-center mx-auto max-w-screen-lg px-4 sm:px-8 py-2 sm:py-4',
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
    </div>
  )
}

PageHeaderContainer.defaultProps = {
  as: '/',
  href: '/'
}
