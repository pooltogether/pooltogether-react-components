import React, { useState } from 'react'
import { PageHeaderContainer } from './PageHeaderContainer'
import { useOnScroll } from '@pooltogether/hooks'
import classNames from 'classnames'

export const HidingPageHeaderContainer: React.FC<{ href: string; className?: string }> = (
  props
) => {
  const { href, className, children } = props

  const [positionClassName, setPositionClassName] = useState('transform translate-y-0')
  useOnScroll({
    onScrollDown: () => setPositionClassName('transform translate-y-0'),
    onScrollUp: () => setPositionClassName('transform -translate-y-full xs:translate-y-0')
  })

  return (
    <PageHeaderContainer
      href={href}
      className={classNames(className, 'transition transform', positionClassName)}
      children={children}
    />
  )
}
