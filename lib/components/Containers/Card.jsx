import React from 'react'
import classnames from 'classnames'

export const Card = (props) => {
  const { children, className } = props

  return (
    <div
      className={classnames(
        'bg-default py-3 px-3 xs:py-6 xs:px-8 sm:py-6 sm:px-12 rounded-xl w-full fadeIn animated',
        className
      )}
    >
      {children}
    </div>
  )
}
