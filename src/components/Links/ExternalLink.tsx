import React from 'react'
import classnames from 'classnames'
import { LinkIcon } from '../Icons/LinkIcon'

export enum LinkTheme {
  default = 'text-inverse hover:text-highlight-1',
  accent = 'text-highlight-1 hover:text-inverse',
  light = 'text-accent-1 hover:text-highlight-1'
}

export const ExternalLink: React.FC<{
  href: string
  theme?: LinkTheme
  underline?: boolean
  openInSameTab?: boolean
  title?: string
  noIcon?: boolean
  className?: string
  displayClassName?: string
  colorClassName?: string
  iconClassName?: string
}> = (props) => {
  return (
    <a
      className={classnames(
        'trans',
        props.className,
        props.displayClassName,
        props.colorClassName || props.theme,
        {
          'underline': props.underline,
          'no-underline': !props.underline
        }
      )}
      rel='noopener noreferrer'
      target={props.openInSameTab ? undefined : '_blank'}
      href={props.href}
      title={props.title}
    >
      {props.children}
      {!props.openInSameTab && !props.noIcon && <LinkIcon className={props.iconClassName} />}
    </a>
  )
}

ExternalLink.defaultProps = {
  underline: false,
  noIcon: false,
  iconClassName: 'w-4 h-4 ml-1 mb-1',
  openInSameTab: false,
  theme: LinkTheme.default,
  displayClassName: 'inline-block h-fit-content items-center'
}
