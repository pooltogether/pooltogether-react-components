import React from 'react'

export const InputLabel = (props) => {
  const { primary, secondary, description, children, className } = props

  return (
    <div className={className}>
      {primary && (
        <div className='font-bold mb-2 sm:mb-6 text-lg sm:text-3xl text-accent'>{primary}</div>
      )}
      {secondary && (
        <div className='font-bold mb-2 sm:mb-4 text-base sm:text-xl text-accent'>{secondary}</div>
      )}
      {description && (
        <div className='mb-4 sm:mb-4 text-sm sm:text-base text-accent'>{description}</div>
      )}
      {children}
    </div>
  )
}
