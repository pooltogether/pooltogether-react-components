import React from 'react'
import classnames from 'classnames'

export function LoadingSpinner(props) {
  const { sizeClassName, size, className } = props

  return (
    <div
      className={classnames('lds-dual-ring', className, size ? '' : sizeClassName)}
      style={
        size
          ? {
              width: size,
              height: size
            }
          : undefined
      }
    />
  )
}

LoadingSpinner.defaultProps = {
  sizeClassName: 'w-5 h-5'
}
