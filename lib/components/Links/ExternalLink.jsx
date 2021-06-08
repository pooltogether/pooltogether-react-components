import React from 'react'
import classnames from 'classnames'
import { LinkIcon } from '../Icons'

export const ExternalLink = (props) => {
  return (
    <a
      className={classnames(props.className, {
        underline: !props.noUnderline
      })}
      rel='noopener noreferrer'
      href={props.href}
    >
      {props.children}
      {!props.noIcon && <LinkIcon className={props.iconClassName} />}
    </a>
  )
}

ExternalLink.defaultProps = {
  noUnderline: false,
  noIcon: false,
  iconClassName: 'w-4 h-4 ml-1'
}
