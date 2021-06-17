import React from 'react'
import classnames from 'classnames'
import { LinkIcon } from '../Icons'
import { LinkTheme } from './ExternalLink'

export const InternalLink = (props) => {
  return (
    <props.Link href={props.href} as={props.as}>
      <a
        className={classnames('trans', props.className, props.colorClassName || props.theme, {
          'underline': props.underline,
          'no-underline': !props.underline
        })}
        title={props.title}
      >
        {props.children}
      </a>
    </props.Link>
  )
}

InternalLink.defaultProps = {
  underline: false,
  noIcon: false,
  iconClassName: 'w-4 h-4 ml-1',
  openInSameTab: false,
  theme: LinkTheme.default
}
