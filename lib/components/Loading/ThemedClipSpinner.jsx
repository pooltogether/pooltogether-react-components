import React from 'react'

export function ThemedClipSpinner(props) {
  const { size, className, style } = props

  return (
    <div
      className='lds-dual-ring'
      style={{
        width: size,
        height: size
      }}
    />
  )
}

ThemedClipSpinner.defaultProps = {
  size: '20px'
}
