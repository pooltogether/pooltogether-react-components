import React from 'react'
import classnames from 'classnames'

import { Tooltip } from '../Containers/Tooltip'

export const CheckboxInputGroup = (props) => {
  const { id, hint, label, className, handleClick, disabled, checked } = props

  let { marginClasses } = props

  return (
    <div
      className={classnames(
        className,
        marginClasses,
        'trans trans-faster cursor-pointer rounded-sm outline-none focus:outline-none hover:outline-none active:outline-none flex space-x-3',
        {
          'text-inverse inner-lg': checked,
          'text-inverse': !checked,
          'cursor-not-allowed': disabled
        }
      )}
    >
      <div
        id={id}
        onClick={handleClick}
        className={classnames('flex items-center justify-center my-auto leading-none', {
          'pointer-events-none': disabled
        })}
      >
        <div
          className={classnames('flex items-center rounded-sm w-4 h-4 border-2 trans', {
            'text-inverse border-inverse hover:border-green': checked,
            'text-darkened border-inverse hover:border-green': !checked
          })}
        >
          <svg
            className={classnames('relative check', {
              checked
            })}
            width='135'
            height='110'
            viewBox='0 0 135 110'
          >
            <path d='M96.8002 0L30.7002 66.1L0.200195 37.4' />
          </svg>
        </div>
      </div>

      {label && (
        <div
          onClick={handleClick}
          className='text-left flex flex-col items-start justify-start leading-snug'
        >
          {label}
        </div>
      )}

      {hint && <Tooltip tip={hint} id={id} />}
    </div>
  )
}
