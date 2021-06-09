import React from 'react'
import classnames from 'classnames'
import { LinkIcon } from '../Icons'

export const ExternalLink = (props) => {
  return (
    <a
      className={classnames(props.className, {
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
  openInSameTab: false
}
