import React from 'react'
import classnames from 'classnames'

export const Card = (props) => {
  const { children, className, paddingClassName, sizeClassName, backgroundClassName } = props

  return (
    <div
      className={classnames(
        'rounded-xl fadeIn animated',
        sizeClassName,
        paddingClassName,
        backgroundClassName,
        className
      )}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  paddingClassName: 'p-4 xs:py-6 xs:px-8 sm:py-6 sm:px-12',
  sizeClassName: 'w-full',
  backgroundClassName: 'bg-default'
}
