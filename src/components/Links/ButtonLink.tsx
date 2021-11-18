import React from 'react'
import {
  getLegacyButtonClassNames,
  LegacyButtonClassNameProps
} from '../../utils/getLegacyButtonClassNames'

interface ButtonLinkProps extends LegacyButtonClassNameProps {
  children: React.ReactNode
  href?: string
  rel?: string
  type?: string
  target?: string
}

export function ButtonLink(props: ButtonLinkProps) {
  const { rel, href, target, children } = props
  const classes = getLegacyButtonClassNames(props)
  return (
    <a
      children={children}
      rel={rel}
      href={href}
      className={classes}
      target={target}
      onClick={(e) => e.stopPropagation()}
    />
  )
}
