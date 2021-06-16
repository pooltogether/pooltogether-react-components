import React from 'react'
import classnames from 'classnames'
import { LinkIcon } from '../Icons'

export const ExternalLink = (props) => {
  return (
    <a
      className={classnames('trans', props.className, props.colorClassName, {
        'underline': props.underline,
        'no-underline': !props.underline
      })}
      rel='noopener noreferrer'
      target={props.openInNewTab ? '_blank' : undefined}
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
  iconClassName: 'w-4 h-4 ml-1',
  colorClassName: 'text-inverse hover:text-highlight-1',
  openInSameTab: false
}
