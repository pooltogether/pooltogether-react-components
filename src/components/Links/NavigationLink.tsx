import classNames from 'classnames'
import React from 'react'
import { i18nTranslate } from '../../types'

export const NavigationLink: React.FC<{
  Link: React.FC<{ href: string }>
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
