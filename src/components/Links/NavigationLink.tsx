import classNames from 'classnames'
import React from 'react'
import { i18nTranslate } from '../../types'
import { UrlObject } from 'url'

declare type Url = string | UrlObject
declare type InternalLinkProps = {
  href: Url
  as?: Url
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  prefetch?: boolean
  locale?: string | false
  legacyBehavior?: boolean
  /**
   * requires experimental.newNextLinkBehavior
   */
  onMouseEnter?: (e: any) => void
  /**
   * requires experimental.newNextLinkBehavior
   */
  onTouchStart?: (e: any) => void
  /**
   * requires experimental.newNextLinkBehavior
   */
  onClick?: (e: any) => void
}

export const NavigationLink: React.FC<{
  Link: React.ForwardRefExoticComponent<
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof InternalLinkProps> &
      InternalLinkProps & {
        children?: React.ReactNode
      } & React.RefAttributes<HTMLAnchorElement>
  >
  pathname: string
  t: i18nTranslate
  regex?: RegExp
  i18nKey: string
  href?: string
  externalHref?: string
  selectedClassName?: string
}> = (props) => {
  const { t, Link, externalHref, href, regex, pathname, i18nKey, selectedClassName } = props

  if (!!externalHref) {
    return (
      <a
        href={externalHref}
        className={classNames(
          'group transition mx-1 first:ml-0 last:mr-0 rounded-lg flex flex-col',
          'text-lg xs:text-xs font-bold text-inverse tracking-tight cursor-pointer'
        )}
      >
        <span className={'opacity-80 hover:opacity-100'}>{t(i18nKey)}</span>
        <div
          className={classNames(
            'h-0.5 rounded-full w-1/3 mx-auto dark:group-hover:bg-white dark:group-hover:bg-opacity-10 group-hover:bg-actually-black group-hover:bg-opacity-10 bg-transparent'
          )}
        />
      </a>
    )
  }

  const isSelected = regex?.test(pathname)

  return (
    <Link href={href}>
      <a
        className={classNames(
          'group transition mx-1 first:ml-0 last:mr-0 rounded-lg flex flex-col',
          'text-lg xs:text-xs font-bold text-inverse tracking-tight cursor-pointer'
        )}
      >
        <span className={classNames({ 'opacity-80 hover:opacity-100': !isSelected })}>
          {t(i18nKey)}
        </span>
        <div
          className={classNames(
            'h-0.5 rounded-full w-1/3 mx-auto dark:group-hover:bg-white dark:group-hover:bg-opacity-10 group-hover:bg-actually-black group-hover:bg-opacity-20',
            {
              [selectedClassName]: isSelected,
              'bg-transparent': !isSelected
            }
          )}
        />
      </a>
    </Link>
  )
}

NavigationLink.defaultProps = {
  selectedClassName: 'bg-gradient-magenta'
}
