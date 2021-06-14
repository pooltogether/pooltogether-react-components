import React from 'react'
import classnames from 'classnames'

export function CountBadge(props) {
  const { title, bgClassName, count, sizeClassName, textTopPos, textLeftPos, className } = props

  return (
    <span
      title={title}
      className={classnames(
        'text-white rounded-full flex flex-col items-center justify-center font-bold',
        sizeClassName,
        bgClassName,
        className
      )}
    >
      <span
        className='relative'
        style={{ top: textTopPos ? textTopPos : 0, left: textLeftPos ? textLeftPos : 0 }}
      >
        {count}
      </span>
    </span>
  )
}

CountBadge.defaultProps = {
  bgClassName: 'bg-blue',
  sizeClassName: 'w-4 h-4 text-xxxs'
}
